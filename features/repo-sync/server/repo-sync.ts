import { getGithubApp } from "@/features/github/utils/github-app";
import { getPineconeIndex } from "@/features/pinecone/client";
import { prisma } from "@/lib/db";
import { inngest } from "@/features/inngest/client";
import { CodeChunk } from "@/features/reviews/types/review";
import { RepoFile } from "../types";


const MAX_FILE_SIZE_BYTES = 100_000;
const MAX_FILES = 200;
const MAX_CHUNK_LINES = 80;
/** Pinecone upsertRecords allows at most 96 records per request. */
const UPSERT_BATCH_SIZE = 90;

const CODE_EXTENSIONS = [
    // JavaScript / TypeScript
    ".js", ".jsx", ".mjs", ".cjs",
    ".ts", ".tsx",
  
    // Python
    ".py", ".pyi",
  
    // Java
    ".java", ".kt", ".kts",
  
    // C / C++
    ".c", ".cc", ".cpp", ".cxx",
    ".h", ".hh", ".hpp", ".hxx",
  
    // C#
    ".cs",
  
    // Go
    ".go",
  
    // Rust
    ".rs",
  
    // Swift
    ".swift",
  
    // Kotlin
    ".kt",
  
    // Dart / Flutter
    ".dart",
  
    // PHP
    ".php",
  
    // Ruby
    ".rb",
  
    // Scala
    ".scala",
  
    // R
    ".r",
  
    // Julia
    ".jl",
  
    // Lua
    ".lua",
  
    // Perl
    ".pl",
  
    // Shell
    ".sh", ".bash", ".zsh", ".fish",
  
    // PowerShell
    ".ps1",
  
    // HTML / CSS
    ".html", ".htm",
    ".css", ".scss", ".sass", ".less", ".styl",
  
    // Vue / Svelte
    ".vue",
    ".svelte",
  
    // Angular
    ".component.ts",
    ".service.ts",
    ".module.ts",
  
    // GraphQL
    ".graphql", ".gql",
  
    // SQL
    ".sql",
  
    // Config files
    ".json",
    ".json5",
    ".yaml",
    ".yml",
    ".toml",
    ".ini",
    ".env.example",
    ".properties",
  
    // XML
    ".xml",
  
    // Docker
    ".dockerfile",
  
    // Markdown
    ".md",
    ".mdx",
  
    // Documentation
    ".txt",
    ".rst",
  
    // Terraform
    ".tf",
  
    // Protocol Buffers
    ".proto",
  
    // GitHub Actions
    ".workflow",
  
    // Notebooks
    ".ipynb",
  
    // Office Documents
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".odt",
    ".ods",
    ".odp",
  ];


  const SPECIAL_FILES = [
    "Dockerfile",
    "docker-compose.yml",
    "docker-compose.yaml",
  
    "README",
    "README.md",
    "LICENSE",
    "CHANGELOG",
  
    ".env.example",
    ".gitignore",
    ".npmignore",
  
    "package.json",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
  
    "tsconfig.json",
    "jsconfig.json",
  
    "next.config.js",
    "next.config.ts",
  
    "tailwind.config.js",
    "tailwind.config.ts",
  
    "vite.config.ts",
    "vite.config.js",
  
    "eslint.config.js",
    ".eslintrc.json",
  
    "prettier.config.js",
    ".prettierrc",
  
    "turbo.json",
  
    "prisma.schema",
  
    "Makefile",
  
    "Procfile",
  
    ".github/workflows",
  ];


  const SKIPPED_FOLDERS = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage",
    ".turbo",
    ".cache",
    "out",
    "vendor",
    "__pycache__",
    ".venv",
    "venv",
    ".idea",
    ".vscode",
    ".expo",
    ".gradle",
    "target",
    "bin",
    "obj",
  ];

  const BINARY_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
    ".ico",
  
    ".mp3",
    ".wav",
    ".ogg",
    ".flac",
  
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
  
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
  
    ".exe",
    ".dll",
    ".so",
    ".dylib",
  
    ".ttf",
    ".otf",
    ".woff",
    ".woff2",
  
    ".db",
    ".sqlite",
  
    ".iso",
  ];

  type TreeEntry = {
    path?: string;
    type?: string;
    sha?: string;
    size?: number;
  }


 
export function buildRepoNamespace(repoFullName: string) {
  return `${repoFullName.replace("/", "--")}--codebase`;
}

function hasCodeExtension(path: string) {
  return CODE_EXTENSIONS.some((extension) => path.endsWith(extension));
}

function isSkippedPath(path: string) {
  return SKIPPED_FOLDERS.some((folder) => path.includes(folder));
}

function isIndexableFile(entry: TreeEntry) {
  if (entry.type !== "blob" || !entry.path || !entry.sha) {
    return false;
  }

  if (entry.size && entry.size > MAX_FILE_SIZE_BYTES) {
    return false;
  }

  if (isSkippedPath(entry.path)) {
    return false;
  }

  return hasCodeExtension(entry.path);
}

function buildChunkId(filePath: string, part: number) {
  return `repo--${filePath}--part-${part}`;
}

export function chunkRepoFiles(files: RepoFile[]): CodeChunk[] {
  const chunks: CodeChunk[] = [];

  for (const file of files) {
    const lines = file.content.split("\n");

    for (let start = 0; start < lines.length; start += MAX_CHUNK_LINES) {
      const part = start / MAX_CHUNK_LINES;
      const text = lines.slice(start, start + MAX_CHUNK_LINES).join("\n");

      if (!text.trim()) {
        continue;
      }

      chunks.push({
        id: buildChunkId(file.filePath, part),
        filePath: file.filePath,
        text,
      });
    }
  }

  return chunks;
}


export async function getRepoFiles(
  installationId: number,
  repoFullName: string,
  branch: string
): Promise<RepoFile[]> {
  const app = getGithubApp();
  const octokit = await app.getInstallationOctokit(installationId);
  const [owner, repo] = repoFullName.split("/");

  const { data: tree } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    { owner, repo, tree_sha: branch, recursive: "1" }
  );

  const entries = tree.tree.filter(isIndexableFile).slice(0, MAX_FILES);
  const files: RepoFile[] = [];

  for (const entry of entries) {
    const { data: blob } = await octokit.request(
      "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
      { owner, repo, file_sha: entry.sha! }
    );

    const content = Buffer.from(blob.content, "base64").toString("utf-8");
    files.push({ filePath: entry.path!, content });
  }

  return files;
}


export async function deleteRepoNamespace(namespace: string) {
  const index = getPineconeIndex();
  await index.deleteNamespace(namespace);
}

export async function saveRepoChunks(namespace: string, chunks: CodeChunk[]) {
  const index = getPineconeIndex();
  const searchable = chunks.filter((chunk) => chunk.text.trim());

  for (let start = 0; start < searchable.length; start += UPSERT_BATCH_SIZE) {
    const batch = searchable.slice(start, start + UPSERT_BATCH_SIZE);

    const records = batch.map((chunk) => ({
      id: chunk.id,
      text: chunk.text,
      filePath: chunk.filePath,
    }));

    await index.namespace(namespace).upsertRecords({ records });
  }
}


/** `pending` never left the queue (e.g. Inngest was down) — fail quickly. */
const STALE_PENDING_MS = 2 * 60 * 1000;
/** `syncing` means the job started — allow longer for large repos. */
const STALE_SYNCING_MS = 15 * 60 * 1000;

function isStaleSync(status: string, updatedAt: Date, now: number) {
  const age = now - updatedAt.getTime();

  if (status === "pending") {
    return age > STALE_PENDING_MS;
  }

  if (status === "syncing") {
    return age > STALE_SYNCING_MS;
  }

  return false;
}

export async function getRepoSyncStatuses(repoFullNames: string[]) {
  const syncs = await prisma.repoSync.findMany({
    where: { repoFullName: { in: repoFullNames } },
    select: { id: true, repoFullName: true, status: true, updatedAt: true },
  });

  const now = Date.now();
  const staleIds: string[] = [];
  const statusByRepo: Record<string, string> = {};

  for (const sync of syncs) {
    if (isStaleSync(sync.status, sync.updatedAt, now)) {
      staleIds.push(sync.id);
      statusByRepo[sync.repoFullName] = "failed";
      continue;
    }

    statusByRepo[sync.repoFullName] = sync.status;
  }

  if (staleIds.length > 0) {
    await prisma.repoSync.updateMany({
      where: { id: { in: staleIds } },
      data: { status: "failed" },
    });
  }

  return statusByRepo;
}

export async function triggerRepoSync(
  installationId: number,
  repoFullName: string,
  branch: string
) {
  const repoSync = await prisma.repoSync.upsert({
    where: { repoFullName },
    create: { installationId, repoFullName, branch, status: "pending" },
    update: { installationId, branch, status: "pending" },
  });

  await inngest.send({
    name: "repo/sync.requested",
    data: { repoSyncId: repoSync.id },
  });
}
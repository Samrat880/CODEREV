import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  landingBtnCore,
  landingBtnGhost,
} from "@/features/marketing/lib/styles";

type LandingHeroProps = {
  isSignedIn: boolean;
};

function ShatterShards() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden" aria-hidden="true">
      <span
        className="landing-shard landing-shard--lit absolute top-[18%] left-[6%] h-10 w-3 rotate-[28deg] opacity-70 sm:h-14 sm:w-4"
      />
      <span
        className="landing-shard absolute top-[32%] left-[12%] h-6 w-2 rotate-[-18deg] opacity-40"
      />
      <span
        className="landing-shard landing-shard--lit absolute top-[22%] right-[8%] h-12 w-3.5 rotate-[-32deg] opacity-65 sm:h-16"
      />
      <span
        className="landing-shard absolute top-[48%] right-[14%] h-5 w-2 rotate-[42deg] opacity-35"
      />
      <span
        className="landing-shard absolute bottom-[28%] left-[18%] h-8 w-2.5 rotate-[55deg] opacity-45"
      />
      <span
        className="landing-shard landing-shard--lit absolute right-[22%] bottom-[22%] h-7 w-2 rotate-[-48deg] opacity-55"
      />
      <span
        className="landing-shard absolute bottom-[38%] left-[4%] size-1.5 rounded-full bg-[var(--landing-navy)] opacity-50"
      />
      <span
        className="landing-shard absolute top-[40%] right-[5%] size-1 rounded-full bg-[var(--landing-core)] opacity-60"
      />
      <span
        className="landing-shard absolute top-[58%] left-[28%] size-1 rounded-full bg-[var(--landing-navy)] opacity-40"
      />
    </div>
  );
}

function ReviewPreview() {
  return (
    <div
      className="landing-preview animate-landing-rise relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-[var(--landing-panel-border)] bg-[var(--landing-panel-muted)] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[oklch(0.55_0.02_260)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.4_0.02_260)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.32_0.02_260)]" />
        <span className="ml-3 text-xs text-[oklch(0.72_0.02_90)]">
          pull-request · AI review
        </span>
      </div>
      <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
        <pre className="overflow-auto border-b border-[var(--landing-panel-border)] p-4 font-mono text-[11px] leading-5 text-[oklch(0.7_0.02_90)] md:border-b-0 md:border-r">
          <code>
            <span className="text-emerald-400">
              {"+ function validateWebhook(sig: string) {\n"}
            </span>
            <span className="text-emerald-400">
              {"+   return timingSafeEqual(sig, expected);\n"}
            </span>
            <span className="text-emerald-400">{"+ }\n"}</span>
            <span className="text-rose-400/80">{"- // TODO: verify later\n"}</span>
          </code>
        </pre>
        <div className="space-y-3 p-4 text-sm">
          <p className="font-medium text-[oklch(0.95_0.01_90)]">
            Solid change — one reliability note.
          </p>
          <p className="text-[oklch(0.72_0.02_90)]">
            Comparing buffers of unequal length can throw. Normalize lengths
            before{" "}
            <span className="font-mono text-xs text-[oklch(0.92_0.02_80)]">
              timingSafeEqual
            </span>
            .
          </p>
          <div className="landing-preview-chip rounded-md px-3 py-2 text-xs">
            Posted as a GitHub PR comment · ready for merge review
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingHero({ isSignedIn }: LandingHeroProps) {
  const primaryHref = isSignedIn ? "/dashboard" : "/sign-in";
  const primaryLabel = isSignedIn ? "Open dashboard" : "Start with GitHub";

  return (
    <section className="relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--landing-ground)_0%,var(--landing-ground-deep)_100%)]"
        aria-hidden="true"
      />
      <ShatterShards />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="animate-landing-fade font-heading text-4xl font-semibold tracking-tight text-[var(--landing-ink)] sm:text-5xl md:text-6xl">
          CODEREV
        </p>
        <h1 className="animate-landing-fade-delay mt-5 max-w-2xl font-heading text-2xl font-medium tracking-tight text-[var(--landing-ink)] sm:text-3xl">
          AI code reviews on every pull request
        </h1>
        <p className="animate-landing-fade-delay-2 mt-4 max-w-xl text-base leading-relaxed text-[var(--landing-muted)] sm:text-lg">
          Connect your GitHub App, sync a repo, and get structured review
          comments the moment a PR opens — with your codebase as context.
        </p>
        <div className="animate-landing-fade-delay-2 mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className={landingBtnCore}
            nativeButton={false}
            render={<Link href={primaryHref} />}
          >
            {primaryLabel}
          </Button>
          {!isSignedIn ? (
            <Button
              size="lg"
              variant="outline"
              className={landingBtnGhost}
              nativeButton={false}
              render={<Link href="/sign-in" />}
            >
              Sign in
            </Button>
          ) : null}
        </div>
      </div>

      <div className="relative mt-14 md:mt-20">
        <div
          className="landing-core-glow pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[min(420px,70vw)] w-[min(720px,95%)] -translate-y-1/2"
          aria-hidden="true"
        />
        <ReviewPreview />
      </div>
    </section>
  );
}

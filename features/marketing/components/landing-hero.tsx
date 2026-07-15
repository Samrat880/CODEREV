import Link from "next/link";
import { Button } from "@/components/ui/button";

type LandingHeroProps = {
  isSignedIn: boolean;
};

function ReviewPreview() {
  return (
    <div
      className="animate-landing-rise relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg border border-border/80 bg-card/90 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/20" />
        <span className="ml-3 text-xs text-muted-foreground">
          pull-request · AI review
        </span>
      </div>
      <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
        <pre className="overflow-auto border-b border-border/60 p-4 font-mono text-[11px] leading-5 text-muted-foreground md:border-b-0 md:border-r">
          <code>
            <span className="text-emerald-700 dark:text-emerald-400">
              {"+ function validateWebhook(sig: string) {\n"}
            </span>
            <span className="text-emerald-700 dark:text-emerald-400">
              {"+   return timingSafeEqual(sig, expected);\n"}
            </span>
            <span className="text-emerald-700 dark:text-emerald-400">
              {"+ }\n"}
            </span>
            <span className="text-rose-700/80 dark:text-rose-400/80">
              {"- // TODO: verify later\n"}
            </span>
          </code>
        </pre>
        <div className="space-y-3 p-4 text-sm">
          <p className="font-medium text-foreground">
            Solid change — one reliability note.
          </p>
          <p className="text-muted-foreground">
            Comparing buffers of unequal length can throw. Normalize lengths before{" "}
            <span className="font-mono text-xs text-foreground">timingSafeEqual</span>.
          </p>
          <div className="rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
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
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.92_0.02_95),transparent_55%),linear-gradient(180deg,oklch(0.97_0.01_95)_0%,var(--background)_48%,oklch(0.94_0.015_220)_100%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,oklch(0.35_0.04_220),transparent_55%),linear-gradient(180deg,oklch(0.2_0.02_250)_0%,var(--background)_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] bg-[linear-gradient(to_right,oklch(0.7_0.02_250/0.12)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.7_0.02_250/0.12)_1px,transparent_1px)] bg-size-[48px_48px] dark:opacity-20"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="animate-landing-fade font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          CODEREV
        </p>
        <h1 className="animate-landing-fade-delay mt-5 max-w-2xl font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          AI code reviews on every pull request
        </h1>
        <p className="animate-landing-fade-delay-2 mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Connect your GitHub App, sync a repo, and get structured review
          comments the moment a PR opens — with your codebase as context.
        </p>
        <div className="animate-landing-fade-delay-2 mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={primaryHref} />}
          >
            {primaryLabel}
          </Button>
          {!isSignedIn ? (
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/sign-in" />}
            >
              Sign in
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <ReviewPreview />
      </div>
    </section>
  );
}

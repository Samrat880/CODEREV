import Link from "next/link";
import { Button } from "@/components/ui/button";
import { landingBtnCore } from "@/features/marketing/lib/styles";

type LandingCtaProps = {
  isSignedIn: boolean;
};

export function LandingCta({ isSignedIn }: LandingCtaProps) {
  const href = isSignedIn ? "/dashboard" : "/sign-in";
  const label = isSignedIn ? "Go to dashboard" : "Sign in with GitHub";

  return (
    <section className="relative overflow-hidden border-t border-[oklch(0.18_0.02_260/0.12)] px-6 py-20 md:px-10 md:py-24">
      <div
        className="landing-core-glow pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-64 w-[min(480px,90%)] -translate-y-1/2 opacity-70"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-start gap-6 md:items-center md:text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-[var(--landing-ink)]">
          Ship safer pull requests
        </h2>
        <p className="max-w-xl text-[var(--landing-muted)]">
          Free tier includes monthly AI reviews. Upgrade when your team needs
          unlimited reviews on private repos.
        </p>
        <Button
          size="lg"
          className={landingBtnCore}
          nativeButton={false}
          render={<Link href={href} />}
        >
          {label}
        </Button>
      </div>
    </section>
  );
}

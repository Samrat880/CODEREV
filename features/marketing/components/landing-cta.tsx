import Link from "next/link";
import { Button } from "@/components/ui/button";

type LandingCtaProps = {
  isSignedIn: boolean;
};

export function LandingCta({ isSignedIn }: LandingCtaProps) {
  const href = isSignedIn ? "/dashboard" : "/sign-in";
  const label = isSignedIn ? "Go to dashboard" : "Sign in with GitHub";

  return (
    <section className="border-t border-border/60 px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 md:items-center md:text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Ship safer pull requests
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Free tier includes monthly AI reviews. Upgrade when your team needs
          unlimited reviews on private repos.
        </p>
        <Button size="lg" nativeButton={false} render={<Link href={href} />}>
          {label}
        </Button>
      </div>
    </section>
  );
}

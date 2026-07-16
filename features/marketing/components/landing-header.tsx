import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { landingBtnCore } from "@/features/marketing/lib/styles";

type LandingHeaderProps = {
  isSignedIn: boolean;
};

export function LandingHeader({ isSignedIn }: LandingHeaderProps) {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
      <Link
        href="/"
        className="font-heading text-lg font-semibold tracking-tight text-[var(--landing-ink)]"
      >
        CODEREV
      </Link>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {isSignedIn ? (
          <Button
            size="sm"
            className={landingBtnCore}
            nativeButton={false}
            render={<Link href="/dashboard" />}
          >
            Dashboard
          </Button>
        ) : (
          <Button
            size="sm"
            className={landingBtnCore}
            nativeButton={false}
            render={<Link href="/sign-in" />}
          >
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
}

import { getServerSession } from "@/features/Auth/actions";
import { LandingHeader } from "@/features/marketing/components/landing-header";
import { LandingHero } from "@/features/marketing/components/landing-hero";
import { LandingHowItWorks } from "@/features/marketing/components/landing-how-it-works";
import { LandingCta } from "@/features/marketing/components/landing-cta";
import "@/features/marketing/styles/landing.css";

export default async function Home() {
  const session = await getServerSession();
  const isSignedIn = Boolean(session);

  return (
    <div className="landing flex min-h-full flex-col">
      <LandingHeader isSignedIn={isSignedIn} />
      <main className="flex-1">
        <LandingHero isSignedIn={isSignedIn} />
        <LandingHowItWorks />
        <LandingCta isSignedIn={isSignedIn} />
      </main>
      <footer className="border-t border-[oklch(0.18_0.02_260/0.12)] px-6 py-6 text-sm text-[var(--landing-muted)] md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <span className="font-heading font-medium text-[var(--landing-ink)]">
            CODEREV
          </span>
          <span>AI code reviews for GitHub pull requests</span>
        </div>
      </footer>
    </div>
  );
}

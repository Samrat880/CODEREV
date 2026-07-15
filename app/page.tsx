import { getServerSession } from "@/features/Auth/actions";
import { LandingHeader } from "@/features/marketing/components/landing-header";
import { LandingHero } from "@/features/marketing/components/landing-hero";
import { LandingHowItWorks } from "@/features/marketing/components/landing-how-it-works";
import { LandingCta } from "@/features/marketing/components/landing-cta";

export default async function Home() {
  const session = await getServerSession();
  const isSignedIn = Boolean(session);

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <LandingHeader isSignedIn={isSignedIn} />
      <main className="flex-1">
        <LandingHero isSignedIn={isSignedIn} />
        <LandingHowItWorks />
        <LandingCta isSignedIn={isSignedIn} />
      </main>
      <footer className="border-t border-border/60 px-6 py-6 text-sm text-muted-foreground md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <span className="font-heading font-medium text-foreground">CODEREV</span>
          <span>AI code reviews for GitHub pull requests</span>
        </div>
      </footer>
    </div>
  );
}

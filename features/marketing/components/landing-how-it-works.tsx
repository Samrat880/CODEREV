const STEPS = [
  {
    step: "01",
    title: "Install the GitHub App",
    description:
      "Connect your account so CODEREV can listen for pull request events on the repos you choose.",
  },
  {
    step: "02",
    title: "Sync your codebase",
    description:
      "Index repo files into vector search so reviews are grounded in your existing patterns — not only the diff.",
  },
  {
    step: "03",
    title: "Get AI reviews on PRs",
    description:
      "When a PR opens or updates, a background job fetches the diff, generates feedback, and posts a comment on GitHub.",
  },
] as const;

export function LandingHowItWorks() {
  return (
    <section className="border-t border-[oklch(0.18_0.02_260/0.12)] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-[var(--landing-ink)]">
          How it works
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--landing-muted)]">
          Three steps from install to automated review comments on every pull
          request.
        </p>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((item) => (
            <li key={item.step} className="space-y-3">
              <p className="font-mono text-xs tracking-widest text-[var(--landing-core)]">
                {item.step}
              </p>
              <h3 className="font-heading text-xl font-medium text-[var(--landing-ink)]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--landing-muted)]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

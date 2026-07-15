"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { GithubLogo } from "@phosphor-icons/react";

import type { OverviewData } from "@/features/overview/types/overview";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { PLAN_DETAILS } from "@/features/settings/lib/plan-details";
import { statusBadge } from "@/features/dashboard/lib/status-style";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type OverviewContentProps = {
  data: OverviewData;
};

function ConnectGithubBanner() {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <GithubLogo className="size-5" />
          Connect GitHub
        </CardTitle>
        <CardDescription>
          Install the GitHub App to sync repositories and run AI reviews on
          pull requests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button nativeButton={false} render={<Link href={DASHBOARD_ROUTES.github} />}>
          Go to GitHub App
        </Button>
      </CardContent>
    </Card>
  );
}

function UsageCard({
  plan,
  reviewsUsed,
  reviewsLimit,
}: {
  plan: OverviewData["plan"];
  reviewsUsed: number;
  reviewsLimit: number | null;
}) {
  const planLabel = PLAN_DETAILS[plan].label;
  const isUnlimited = reviewsLimit === null;
  const progressValue = isUnlimited
    ? 0
    : Math.min(100, Math.round((reviewsUsed / reviewsLimit) * 100));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Plan &amp; usage</CardTitle>
        <CardDescription>
          Current plan and AI reviews this month.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className={statusBadge(plan === "pro" ? "success" : "neutral")}>
            {planLabel}
          </span>
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            render={<Link href={DASHBOARD_ROUTES.settings} />}
          >
            Manage
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Reviews this month</span>
            <span className="font-medium tabular-nums">
              {isUnlimited ? `${reviewsUsed} used` : `${reviewsUsed} / ${reviewsLimit}`}
            </span>
          </div>
          {!isUnlimited ? <Progress value={progressValue} /> : null}
          {isUnlimited ? (
            <p className="text-xs text-muted-foreground">
              Unlimited reviews on the Pro plan.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function RepoSummaryCard({
  repos,
}: {
  repos: NonNullable<OverviewData["repos"]>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Repositories</CardTitle>
        <CardDescription>
          Repos available to your GitHub App installation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-semibold tabular-nums">{repos.totalCount}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">{repos.publicCount}</p>
            <p className="text-xs text-muted-foreground">Public</p>
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">{repos.privateCount}</p>
            <p className="text-xs text-muted-foreground">Private</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          nativeButton={false}
          render={<Link href={DASHBOARD_ROUTES.repos} />}
        >
          View repositories
        </Button>
      </CardContent>
    </Card>
  );
}

function ActivityList({
  recentActivity,
}: {
  recentActivity: OverviewData["recentActivity"];
}) {
  if (recentActivity.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent activity</CardTitle>
          <CardDescription>
            Finished AI reviews will show up here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No reviewed pull requests yet. Open a PR on a connected repo to get
            started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base">Recent activity</CardTitle>
          <CardDescription>Latest AI reviews and rate limits.</CardDescription>
        </div>
        <Button
          size="sm"
          variant="outline"
          nativeButton={false}
          render={<Link href={DASHBOARD_ROUTES.pullRequest} />}
        >
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {recentActivity.map((item) => (
            <li key={item.id}>
              <Link
                href={`/dashboard/pull-requests/${item.id}`}
                className="flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {item.repoFullName} {item.prNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(item.reviewedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <span
                  className={statusBadge(
                    item.status === "rate_limited" ? "warning" : "success",
                  )}
                >
                  {item.status === "rate_limited" ? "Rate limited" : "Reviewed"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function OverviewContent({ data }: OverviewContentProps) {
  const { installation, plan, reviewsUsed, reviewsLimit, repos, recentActivity } =
    data;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {!installation.connected ? <ConnectGithubBanner /> : null}

      <div className="grid gap-6 md:grid-cols-2">
        <UsageCard
          plan={plan}
          reviewsUsed={reviewsUsed}
          reviewsLimit={reviewsLimit}
        />
        {repos ? <RepoSummaryCard repos={repos} /> : null}
      </div>

      <ActivityList recentActivity={recentActivity} />
    </div>
  );
}

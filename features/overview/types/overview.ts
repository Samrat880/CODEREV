import type {
  GithubInstallationStatus,
  SubscriptionPlan,
} from "@/features/dashboard/lib/types";

export type OverviewActivityItem = {
  id: string;
  repoFullName: string;
  prNumber: string;
  status: "approved" | "rate_limited";
  reviewedAt: string;
};

export type OverviewRepoSummary = {
  totalCount: number;
  publicCount: number;
  privateCount: number;
  hasMorePages: boolean;
};

export type OverviewData = {
  installation: GithubInstallationStatus;
  reviewsUsed: number;
  reviewsLimit: number | null;
  plan: SubscriptionPlan;
  recentActivity: OverviewActivityItem[];
  repos: OverviewRepoSummary | null;
};

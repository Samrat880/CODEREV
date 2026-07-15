import { requireAuth } from "@/features/Auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { OverviewContent } from "@/features/overview/components/overview-content";
import { getOverview } from "@/features/overview/server/get-overview";

export default async function DashboardOverviewPage() {
  const session = await requireAuth();
  const overview = await getOverview(session.user.id);

  return (
    <>
      <DashboardHeader
        title="Overview"
        description="Usage, repositories, and recent AI review activity."
      />
      <OverviewContent data={overview} />
    </>
  );
}

import { requireAuth } from '@/features/Auth/actions';
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header';
import { getInstallationStatus } from '@/features/github/server/installation';
import { GithubConnectCard } from '@/features/github/components/github-connect-card';
import React from 'react'

export const metadata = {
  title: "Github App . Dashboard",
};


const DashboardGithubPage = async () => {

  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);




  return (
    <>
    <DashboardHeader 
    title="Github App Dashboard"
    description="Install or disconnect the reviewer app on your github account"
    />

    <GithubConnectCard userId={session.user.id} installation={installation} />
    
    </>
  )
}


export default DashboardGithubPage
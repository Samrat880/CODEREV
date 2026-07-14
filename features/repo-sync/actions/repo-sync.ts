"use server";

import { DASHBOARD_ROUTES } from "../../dashboard/lib/routes";
import { getServerSession } from "../../Auth/actions";
import { redirect } from "next/navigation";
import { getUserInstallationId } from "../../github/server/installation";
import { triggerRepoSync } from "../server/repo-sync";

export async function syncRepoCodeBase(repoFullName: string, branch: string) {
    const session = await getServerSession();

    if(!session){
        redirect("/sign-in");
    }

    const installationId = await getUserInstallationId(session.user.id);

    if(!installationId){
        redirect(DASHBOARD_ROUTES.github)
    }

    await triggerRepoSync(installationId, repoFullName, branch);
}
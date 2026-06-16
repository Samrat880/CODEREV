import {App} from "octokit";

let githubApp: App | null = null;

export function getGithubApp(){
    if(!githubApp){
        githubApp = new App({
            appId:process.env.GITHUB_APP_ID!,
            privateKey: process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g,"\n"),

            webhooks:{
                secret: process.env.GITHUB_WEBHOOK_SECRET!
            }
        })
    }

    return githubApp;
}


export function getGithubInstallUrl(userId: string) {
    const publicLink = process.env.NEXT_PUBLIC_GITHUB_PUBLIC_LINK!;
    const url = new URL(`${publicLink}/installations/new`);

    url.searchParams.set("state", userId);
    return url.toString();

}


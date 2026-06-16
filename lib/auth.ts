import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import {prisma} from "./db"
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,

      mapProfileToUser: async (profile) => ({
        email:profile.email ?? `${profile.id}@users.noreply.github.com`,
        name:profile.name ?? profile.login,
      }),
    },
  },

  plugins: [nextCookies()],
  
});

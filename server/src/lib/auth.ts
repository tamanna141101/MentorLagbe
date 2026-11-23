import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { getAuthDB, mongoClient } from "../config/db.js";
import { env } from "../config/env.js";

const allowedOrigins = [
  "http://localhost:3000",
  "https://mentorlagbe-beige.vercel.app",
  env.clientOrigin.replace(/\/$/, ""),
];

export const auth = betterAuth({
  appName: "MentorLagbe",

  baseURL: env.betterAuthUrl,
  secret: env.betterAuthSecret,

  trustedOrigins: allowedOrigins,

  database: mongodbAdapter(getAuthDB(), {
    client: mongoClient,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  socialProviders: {
    google: {
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret,
    },

    github: {
      clientId: env.githubClientId,
      clientSecret: env.githubClientSecret,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "student",
        input: false,
      },
    },
  },
});
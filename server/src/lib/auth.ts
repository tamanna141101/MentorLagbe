
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { getAuthDB, mongoClient } from "../config/db.js";
import { env } from "../config/env.js";

const allowedOrigins = [
  "http://localhost:3000",
  "https://mentorlagbe-beige.vercel.app",
];

const configuredOrigin = env.clientOrigin.replace(/\/+$/, "");

if (!allowedOrigins.includes(configuredOrigin)) {
  allowedOrigins.push(configuredOrigin);
}

export const auth = betterAuth({
  appName: "MentorLagbe",

  secret: env.betterAuthSecret,

  // The public URL is resolved from the trusted reverse proxy.
  // Keep trustedProxyHeaders enabled only behind the configured proxy.
  advanced: {
    trustedProxyHeaders: true,
  },

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

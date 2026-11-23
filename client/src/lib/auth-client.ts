
import { createAuthClient } from "better-auth/react";

// Auth requests now use the same origin as the frontend.
// Next.js rewrites /api/auth/* requests to the Render backend.
export const authClient = createAuthClient();

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;

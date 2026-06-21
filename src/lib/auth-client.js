import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
export const authClient = createAuthClient();
export const { signIn, signUp, useSession } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

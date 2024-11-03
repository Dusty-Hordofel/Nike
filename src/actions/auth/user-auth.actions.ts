"use server";

import { signIn } from "@/auth";
import { LoginFormData, LogInSchema } from "../../schemas/user/auth.schema";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signInWithCredentials(
  loginFormData: LoginFormData,
  callbackUrl?: string | null
) {
  try {
    const user = LogInSchema.parse(loginFormData);
    await signIn("credentials", { user, redirectTo: callbackUrl || "/" });
    return { success: true, message: "Sign in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

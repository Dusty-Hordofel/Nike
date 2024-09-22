import { LoginFormData, LogInSchema } from "@/lib/validations/auth";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function logInWithCredentials(loginFormData: LoginFormData) {
  try {
    const user = LogInSchema.parse(loginFormData);
    await signIn("credentials", user);
    return { success: true, message: "Sign in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

import { LoginFormData, LogInSchema } from "../../../schemas/user/auth.schema";
import { isRedirectError } from "next/dist/client/components/redirect";
import { RegisterFormData } from "../../../schemas/user/auth.schema";
import { signIn } from "@/auth";
async function logInWithCredentials(loginFormData: LoginFormData) {
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

const lookupEmail = async (email: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/lookup`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
};

const registerUser = async (registerFormData: RegisterFormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({
          registerFormData,
        }),
      }
    );
    const user = await response.json();

    return user;
  } catch (error) {
    throw error;
  }
};

export { logInWithCredentials, lookupEmail, registerUser };

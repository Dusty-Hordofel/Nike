import { signIn } from "@/auth";
import {
  LoginFormData,
  LogInSchema,
  RegisterFormData,
} from "@/lib/validations/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const getProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  );
  const { products } = await response.json();
  return products;
};

export const getProduct = async (slug: string, style: number, size: number) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      style,
      size,
      slug,
    }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}?style=${style}&size=${size}`,
    requestOptions
  );
  const product = await response.json();
  return product;
};

export const lookupEmail = async (email: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/lookup`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
};

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

export const registerUser = async (registerFormData: RegisterFormData) => {
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

// async function signInWithCredentials(loginFormData: LoginFormData) {
//   try {
//     const user = LogInSchema.parse(loginFormData);
//     await signIn("credentials", user);
//     return { success: true, message: "Sign in successfully" };
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }
//     return { success: false, message: "Invalid email or password" };
//   }
// }

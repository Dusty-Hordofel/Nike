import { RegisterFormData } from "@/lib/validations/auth";

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

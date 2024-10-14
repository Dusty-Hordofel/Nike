"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  EmailFormData,
  PasswordFormData,
  EmailSchema,
  PasswordSchema,
} from "@/lib/validations/auth/auth-schema";
import { UserSelectCountry } from "@/components/common/auth/login";
import { UserAuthHeaderForm } from "@/components/common/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn, useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user";
import EditEmail from "./edit-email";
import LoginForm from "./login-form";

const LoginPage = () => {
  const router = useRouter();
  // const user = useCurrentUser();

  // if (user /*&& userRole !== "user"*/) {
  //   router.push(`${window.location.origin}` || "/");
  // }

  const [email, setEmail] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [error, setError] = useState("");
  const [formCurrentStep, setFormCurrentStep] = useState(1);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: {
      errors: errorsEmail,
      // isSubmitting: isSubmittingEmail,
      // isSubmitSuccessful: isSubmitSuccessfulEmail,
    },
    reset: resetEmail,
    getValues: getValuesEmail,
  } = useForm<EmailFormData>({ resolver: zodResolver(EmailSchema) });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: {
      errors: errorsPassword,
      // isSubmitting: isSubmittingPassword,
      // isSubmitSuccessful: isSubmitSuccessfulPassword,
    },
    reset: resetPassword,
    getValues: getValuesPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/lookup`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
        }
      );

      // console.log(response);

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Failed to login");
      // }

      return response.json();
    },
    // onSuccess: () => {
    //   // router.push("/");
    //   console.log("Successfully");
    // },
    // onError: (error: any) => {
    //   console.error("Error registering user:", error);
    //   console.log(error);
    // },
  });

  const onSubmitStep1 = async ({ email }: EmailFormData) => {
    setIsEmailLoading(true);
    const { sucess, message } = await mutation.mutateAsync(email);
    console.log("🚀 ~ onSubmitStep1 ~ sucess:", sucess, message);

    if (sucess) {
      setEmail(email);
      setFormCurrentStep(2);
    } else {
      setIsEmailLoading(false);
      router.push(`/auth/register?email=${encodeURIComponent(email)}`);
    }
    setIsEmailLoading(false);
  };

  const onSubmitStep2 = async ({ password }: PasswordFormData) => {
    const result = await signIn("credentials", {
      email: getValuesEmail("email"),
      password,
      redirect: false,
      // callbackUrl: `${window.location.origin}`,
    });
    if (result?.error) {
      setError("Your login information is invalid");
      console.log("EKOSIMBA");
    } else {
      router.push(`${window.location.origin}` || "/");
    }
  };

  return (
    <div className="flex justify-center p-5 min-h-screen">
      <div className="flex flex-col justify-center max-w-[532px] w-full px-9 max-h-[569px] h-full">
        <UserAuthHeaderForm
          ariaLabel={
            formCurrentStep === 1
              ? "Enter your email to join us or sign in."
              : "Enter your email to password us or sign in."
          }
          title={
            formCurrentStep === 1
              ? "Enter your email to join us or sign in."
              : "What's your password?"
          }
        />

        {/* Selectionner un pays */}
        {formCurrentStep === 1 ? (
          <UserSelectCountry />
        ) : (
          <EditEmail
            formCurrentStep={formCurrentStep}
            setFormCurrentStep={setFormCurrentStep}
            email={email}
          />
        )}
        <LoginForm
          formCurrentStep={formCurrentStep}
          emailProps={{
            registerEmail,
            errorsEmail,
            isEmailLoading,
            handleSubmitEmail,
            onSubmitStep1,
          }}
          passwordProps={{
            registerPassword,
            errorsPassword,
            isPasswordLoading,
            handleSubmitPassword,
            onSubmitStep2,
          }}
          error={error}
        />
      </div>
    </div>
  );
};

export default LoginPage;

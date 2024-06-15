"use client";

// import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import {
  EmailFormData,
  PasswordFormData,
  EmailSchema,
  PasswordSchema,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import {
  UserSelectCountry,
  UserLoginFooterForm,
  UserLoginForgotPasswordLink,
  UserLoginTerms,
} from "@/components/auth/login";
import { UserAuthHeaderForm, UserAuthInputFieldForm } from "@/components/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { CircleAlert } from "lucide-react";

import { signIn, useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

const LoginPage = () => {
  const router = useRouter();
  const user = useCurrentUser();

  if (user /*&& userRole !== "user"*/) {
    router.push(`${window.location.origin}` || "/");
  }

  const [email, setEmail] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [error, setError] = useState("");
  const [formStep, setFormStep] = useState(0);

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
      setFormStep(1);
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
            formStep === 0
              ? "Enter your email to join us or sign in."
              : "Enter your email to password us or sign in."
          }
          title={
            formStep === 0
              ? "Enter your email to join us or sign in."
              : "What's your password?"
          }
        />

        {/* Selectionner un pays */}
        {formStep === 0 ? (
          <UserSelectCountry />
        ) : (
          <div
            className={cn(
              "text-black-100 pb-6",
              {
                hidden: formStep === 0,
              },
              "min-h-[40px] pb-8"
            )}
          >
            <span className="pr-[5px]">{email}</span>
            <button
              className="text-gray-500 underline"
              onClick={() => setFormStep(0)}
            >
              Modifier
            </button>
          </div>
        )}

        <form
          onSubmit={
            formStep === 0
              ? handleSubmitEmail(onSubmitStep1)
              : handleSubmitPassword(onSubmitStep2)
          }
        >
          <div
            className={cn(
              ` h-11 bg-gray-100 py-3 px-4 mb-5 items-center gap-x-4 rounded-md ${formStep === 1 && error.length > 0 ? "flex" : "hidden"}`
            )}
          >
            <CircleAlert color="#ee0005" />
            <p>{error.length > 0 && error}</p>
          </div>

          {formStep === 0 ? (
            <UserAuthInputFieldForm
              id="email"
              label="email"
              placeholder="Email*"
              type="email"
              isLoading={isEmailLoading}
              register={registerEmail}
              errors={errorsEmail as FieldErrors<EmailFormData>}
              name="email"
            />
          ) : (
            <UserAuthInputFieldForm
              id="password"
              label="password"
              placeholder="Password*"
              type="password"
              isLoading={isPasswordLoading}
              register={registerPassword}
              errors={errorsPassword as FieldErrors<PasswordFormData>}
              name="password"
            />
          )}
          {formStep === 0 ? (
            <UserLoginTerms />
          ) : (
            <UserLoginForgotPasswordLink />
          )}

          <UserLoginFooterForm
            formStep={formStep}
            isEmailLoading={isEmailLoading}
            isPasswordLoading={isPasswordLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

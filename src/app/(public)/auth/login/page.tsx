"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import {
  EmailFormData,
  PasswordFormData,
  userLoginEmailSchema,
  userLoginPasswordSchema,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import {
  UserSelectCountry,
  UserLoginEmailForm,
  UserLoginFooterForm,
  UserLoginForgotPasswordLink,
  UserLoginHeaderForm,
  UserLoginPasswordForm,
  UserLoginTerms,
} from "@/components/auth/login";
import { UserAuthHeaderForm, UserAuthInputFieldForm } from "@/components/auth";

const LoginPage = () => {
  const [isEmailLoading, setIsEmailLoading] = React.useState<boolean>(false);
  const [isPasswordLoading, setIsPasswordLoading] =
    React.useState<boolean>(false);
  const [formStep, setFormStep] = React.useState(0);

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
  } = useForm<EmailFormData>({ resolver: zodResolver(userLoginEmailSchema) });

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
    resolver: zodResolver(userLoginPasswordSchema),
  });

  const onSubmitStep1 = async ({ email }: EmailFormData) => {
    // setIsEmailLoading(true);

    console.log("🚀 ~ onSubmitStep1 ~ value:", email);
    setFormStep(1);
    // const { status } = await mutateAsync(data.email);
    // if (status === 200) {
    //   setFormStep(1);
    // } else if (status === 400 || status === 500) {
    //   router.push(`/signup?email=${data.email}`);
    // }
  };
  const onSubmitStep2 = async ({ password }: PasswordFormData) => {
    console.log("🚀 ~ onSubmitStep1 ~ value:", password);
    setFormStep(0);
    // setIsPasswordLoading(true);
    // const { status } = await mutateAsync(data.email);
    // if (status === 200) {
    //   setFormStep(1);
    // } else if (status === 400 || status === 500) {
    //   router.push(`/signup?email=${data.email}`);
    // }
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
            <span className="pr-[5px]">hordofel@gmail.com</span>
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

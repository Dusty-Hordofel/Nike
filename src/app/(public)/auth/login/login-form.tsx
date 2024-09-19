import React from "react";
import {
  UserLoginFooterForm,
  UserLoginForgotPasswordLink,
  UserLoginTerms,
} from "@/components/auth/login";
import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { CircleAlert } from "lucide-react";
import LoginFormStep from "./login-step";
import { EmailFormData, PasswordFormData } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

type Props = {
  formCurrentStep: number;
  emailProps: {
    register: UseFormRegister<{ email: string }>;
    errors: FieldErrors<{ email: string }>;
    isLoading: boolean;
    handleSubmit: UseFormHandleSubmit<{ email: string }, undefined>;
    onSubmit: ({ email }: EmailFormData) => Promise<void>;
  };
  passwordProps: {
    register: UseFormRegister<{ password: string }>;
    errors: FieldErrors<{ password: string }>;
    isLoading: boolean;
    handleSubmit: UseFormHandleSubmit<{ password: string }, undefined>;
    onSubmit: ({ password }: PasswordFormData) => Promise<void>;
  };
  //   registerEmail: UseFormRegister<{
  //     email: string;
  //   }>;
  //   errorsEmail: FieldErrors<{
  //     email: string;
  //   }>;
  //   isEmailLoading: boolean;
  //   registerPassword: UseFormRegister<{
  //     password: string;
  //   }>;
  //   errorsPassword: FieldErrors<{
  //     password: string;
  //   }>;
  //   isPasswordLoading: boolean;
  //   handleSubmitEmail: UseFormHandleSubmit<
  //     {
  //       email: string;
  //     },
  //     undefined
  //   >;
  //   handleSubmitPassword: UseFormHandleSubmit<
  //     {
  //       password: string;
  //     },
  //     undefined
  //   >;
  //   onSubmitStep1: ({ email }: EmailFormData) => Promise<void>;
  //   onSubmitStep2: ({ password }: PasswordFormData) => Promise<void>;
  error: string;
};

const LoginForm = ({
  formCurrentStep,
  emailProps,
  passwordProps,
  //   registerEmail,
  //   errorsEmail,
  //   isEmailLoading,
  //   registerPassword,
  //   errorsPassword,
  //   isPasswordLoading,
  //   handleSubmitEmail,
  //   handleSubmitPassword,
  //   onSubmitStep1,
  //   onSubmitStep2,
  error,
}: Props) => {
  return (
    <form
      onSubmit={
        formCurrentStep === 1
          ? emailProps.handleSubmit(emailProps.onSubmit)
          : passwordProps.handleSubmit(passwordProps.onSubmit)
        //   ? handleSubmitEmail(onSubmitStep1)
        //   : handleSubmitPassword(onSubmitStep2)
      }
    >
      <div
        className={cn(
          ` h-11 bg-gray-100 py-3 px-4 mb-5 items-center gap-x-4 rounded-md ${formCurrentStep === 2 && error.length > 1 ? "flex" : "hidden"}`
        )}
      >
        <CircleAlert color="#ee0005" />
        <p>{error.length > 1 && error}</p>
      </div>

      <LoginFormStep
        formCurrentStep={formCurrentStep}
        registerEmail={emailProps.register}
        errorsEmail={emailProps.errors}
        isEmailLoading={emailProps.isLoading}
        registerPassword={passwordProps.register}
        errorsPassword={passwordProps.errors}
        isPasswordLoading={passwordProps.isLoading}
        // formCurrentStep={formCurrentStep}
        // registerEmail={registerEmail}
        // errorsEmail={errorsEmail}
        // isEmailLoading={isEmailLoading}
        // registerPassword={registerPassword}
        // errorsPassword={errorsPassword}
        // isPasswordLoading={isPasswordLoading}
      />

      <UserLoginFooterForm
        formCurrentStep={formCurrentStep}
        isEmailLoading={emailProps.isLoading}
        isPasswordLoading={passwordProps.isLoading}
        // formCurrentStep={formCurrentStep}
        // isEmailLoading={isEmailLoading}
        // isPasswordLoading={isPasswordLoading}
      />
    </form>
  );
};

export default LoginForm;

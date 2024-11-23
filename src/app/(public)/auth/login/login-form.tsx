import React from "react";
import { UserLoginFooterForm } from "@/components/common/auth/login";

import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { CircleAlert } from "lucide-react";
import LoginFormStep from "./login-step";
import {
  EmailFormData,
  PasswordFormData,
} from "../../../../schemas/user/auth.schema";
import { cn } from "@/lib/common/utils";
import { EmailProps, PasswordProps } from "./formProps";

type LoginFormProps = {
  formCurrentStep: number;
  emailProps: EmailProps;
  passwordProps: PasswordProps;
  error: string;
};

const LoginForm = ({
  formCurrentStep,
  emailProps,
  passwordProps,
  error,
}: LoginFormProps) => {
  const { handleSubmitEmail, onSubmitStep1, ...restEmailProps } = emailProps;
  const { handleSubmitPassword, onSubmitStep2, ...restPasswordProps } =
    passwordProps;

  return (
    <form
      onSubmit={
        formCurrentStep === 1
          ? emailProps.handleSubmitEmail(onSubmitStep1)
          : passwordProps.handleSubmitPassword(onSubmitStep2)
      }
    >
      <div
        className={cn(
          ` h-11 bg-gray-100 py-3 px-4 mb-5 items-center gap-x-4 rounded-md ${
            formCurrentStep === 2 && error.length > 1 ? "flex" : "hidden"
          }`
        )}
      >
        <CircleAlert color="#ee0005" />
        <p>{error.length > 1 && error}</p>
      </div>

      <LoginFormStep
        formCurrentStep={formCurrentStep}
        simplifiedEmailProps={{ ...restEmailProps }}
        simplifiedPasswordProps={{ ...restPasswordProps }}
      />

      <UserLoginFooterForm
        formCurrentStep={formCurrentStep}
        isEmailLoading={restEmailProps.isEmailLoading}
        isPasswordLoading={restPasswordProps.isPasswordLoading}
      />
    </form>
  );
};

export default LoginForm;

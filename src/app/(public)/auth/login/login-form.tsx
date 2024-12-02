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
import ErrorMessage from "@/components/ui/error-message";

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
      <ErrorMessage
        context="api-message"
        error={error}
        formCurrentStep={formCurrentStep}
      />

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

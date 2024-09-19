import {
  UserLoginForgotPasswordLink,
  UserLoginTerms,
} from "@/components/auth/login";
import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
import React from "react";
import { EmailProps, PasswordProps } from "./formProps";

type LoginFormStepProps = {
  formCurrentStep: number;
  simplifiedEmailProps: Omit<EmailProps, "handleSubmitEmail" | "onSubmitStep1">;
  simplifiedPasswordProps: Omit<
    PasswordProps,
    "handleSubmitPassword" | "onSubmitStep2"
  >;
};

const LoginFormStep = ({
  formCurrentStep,
  simplifiedEmailProps,
  simplifiedPasswordProps,
}: LoginFormStepProps) => {
  switch (formCurrentStep) {
    case 1:
      return (
        <>
          <DynamicFormField
            inputType="input"
            label="Email"
            name="email"
            register={simplifiedEmailProps.registerEmail}
            errors={simplifiedEmailProps.errorsEmail}
            inputProps={{
              type: "text",
              placeholder: "Email*",
              disabled: simplifiedEmailProps.isEmailLoading,
            }}
          />
          <UserLoginTerms />
        </>
      );
    case 2:
      return (
        <>
          <DynamicFormField
            inputType="input"
            label="Password"
            name="password"
            register={simplifiedPasswordProps.registerPassword}
            errors={simplifiedPasswordProps.errorsPassword}
            inputProps={{
              type: "password",
              placeholder: "Password*",
              disabled: simplifiedPasswordProps.isPasswordLoading,
            }}
          />
          <UserLoginForgotPasswordLink />
        </>
      );
  }
};

export default LoginFormStep;

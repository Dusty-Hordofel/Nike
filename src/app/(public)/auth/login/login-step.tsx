import {
  UserLoginForgotPasswordLink,
  UserLoginTerms,
} from "@/components/auth/login";
import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type LoginFormStepProps = {
  formCurrentStep: number;
  registerEmail: UseFormRegister<{
    email: string;
  }>;
  errorsEmail: FieldErrors<{
    email: string;
  }>;
  isEmailLoading: boolean;
  registerPassword: UseFormRegister<{
    password: string;
  }>;
  errorsPassword: FieldErrors<{
    password: string;
  }>;
  isPasswordLoading: boolean;
};

const LoginFormStep = ({
  formCurrentStep,
  registerEmail,
  errorsEmail,
  isEmailLoading,
  registerPassword,
  errorsPassword,
  isPasswordLoading,
}: LoginFormStepProps) => {
  switch (formCurrentStep) {
    case 1:
      return (
        <>
          <DynamicFormField
            inputType="input"
            label="Email"
            name="email"
            register={registerEmail}
            errors={errorsEmail}
            inputProps={{
              type: "text",
              placeholder: "Email*",
              disabled: isEmailLoading,
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
            register={registerPassword}
            errors={errorsPassword}
            inputProps={{
              type: "password",
              placeholder: "Password*",
              disabled: isPasswordLoading,
            }}
          />
          <UserLoginForgotPasswordLink />
        </>
      );
  }
};

export default LoginFormStep;

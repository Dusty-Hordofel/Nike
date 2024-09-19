import { EmailFormData, PasswordFormData } from "@/lib/validations/auth";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

export type EmailProps = {
  registerEmail: UseFormRegister<{ email: string }>;
  errorsEmail: FieldErrors<{ email: string }>;
  isEmailLoading: boolean;
  handleSubmitEmail: UseFormHandleSubmit<{ email: string }, undefined>;
  onSubmitStep1: ({ email }: EmailFormData) => Promise<void>;
};

export type PasswordProps = {
  registerPassword: UseFormRegister<{ password: string }>;
  errorsPassword: FieldErrors<{ password: string }>;
  isPasswordLoading: boolean;
  handleSubmitPassword: UseFormHandleSubmit<{ password: string }, undefined>;
  onSubmitStep2: ({ password }: PasswordFormData) => Promise<void>;
};

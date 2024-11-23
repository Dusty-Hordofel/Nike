import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/common/utils";

export interface FormInputFieldProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  isLoading: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  className?: string;
}

const UserAuthInputFieldForm = <T extends FieldValues>({
  id,
  label,
  placeholder,
  type,
  isLoading,
  register,
  errors,
  name,
  className,
  ...props
}: FormInputFieldProps<T>) => {
  const error = errors[name];
  const errorMessage = error ? (error.message as string) : "";

  return (
    <div className=" w-full">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        autoCapitalize="none"
        autoComplete={type}
        autoCorrect="off"
        disabled={isLoading}
        {...register(name)}
        {...props}
        className={cn("p-4 rounded-lg h-14 focus:outline-none", className)}
      />

      <div className="h-6">
        {error && type !== "checkbox" && (
          <p className="px-4 pt-[6px] text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default UserAuthInputFieldForm;

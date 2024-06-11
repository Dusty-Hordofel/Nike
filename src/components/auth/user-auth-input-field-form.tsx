import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";

interface FormInputFieldProps<T extends FieldValues> {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  isLoading: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
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
}: FormInputFieldProps<T>) => {
  const error = errors[name];
  const errorMessage = error ? (error.message as string) : "";

  return (
    <div>
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
        className="p-4 rounded-lg h-14 focus:outline-none"
      />
      {error && (
        <p className="px-4 pt-[6px] text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default UserAuthInputFieldForm;

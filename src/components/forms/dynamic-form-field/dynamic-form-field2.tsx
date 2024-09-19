import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
// import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

// export interface FormInputFieldProps<T extends FieldValues>
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   inputType: "select" | "input" | "textarea" | "file";
//   type?: "text" | "email" | "password" | "number" | "checkbox";
//   //   inputType:string,
//   label: string;
//   placeholder?: string;
//   //   type?: string;
//   isLoading: boolean;
//   //   register: UseFormRegister<T>;
//   //   errors: FieldErrors<T>;
//   register: UseFormRegister<any>;
//   errors: FieldErrors<FieldValues>;
//   name: Path<T>;
//   className?: string;
// }

interface Option {
  value: string;
  label: string;
  id: string;
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options?: Option[];
};
type FileProps = React.InputHTMLAttributes<HTMLInputElement> & {
  fileInputRef?: React.RefObject<HTMLInputElement>;
  previewUrl?: string;
};

// / Définir le type pour les propriétés de champ dynamique
interface DynamicFormFieldProps<T extends FieldValues> {
  inputType: "select" | "input" | "textarea" | "file";
  type?: "text" | "email" | "password" | "number" | "checkbox";
  placeholder?: string;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  options?: Option[];
  //   lines?: number;
  fileInputRef?: any;
  previewUrl?: any;
  isLoading: boolean;
  className?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  inputProps?: InputProps;
  textareaProps?: TextareaProps;
  selectProps?: SelectProps;
  fileProps?: FileProps;
}

const DynamicFormField = <T extends FieldValues>({
  inputType,
  label,
  //   placeholder,
  type,
  isLoading,
  register,
  errors,
  name,
  className,
  options,
  inputProps,
  textareaProps,
  selectProps,
  fileProps,
  //   lines,
  //   ...props
}: DynamicFormFieldProps<T>) => {
  const error = errors[name];
  const errorMessage = error ? (error.message as string) : "";

  switch (inputType) {
    case "textarea":
      return (
        <div className=" w-full">
          <label className="sr-only" htmlFor={`input-${label}`}>
            {label}
          </label>
          <Textarea
            id={`input-${label}`}
            // placeholder={placeholder}
            // autoCapitalize="none"
            // autoComplete={type}
            // autoCorrect="off"
            // rows={lines}
            // disabled={isLoading}
            {...register(name)}
            {...textareaProps}
            className={cn("p-4 rounded-lg h-14 focus:outline-none", className)}
          />

          <ErrorMessage type={type} error={error} errorMessage={errorMessage} />
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col">
          <div className="w-full py-4 pr-4 pl-3 rounded-lg border-default border focus:outline-none transition-all flex justify-between relative ">
            <label className="sr-only" htmlFor={`select-${label}`}>
              {label}
            </label>
            <select
              {...register(name)}
              id={`select-${label}`}
              name={name}
              //   autoComplete="off"
              style={{ appearance: "none" }}
              className="w-full bg-clear z-10 focus:outline-none "
              //   aria-invalid="true"
              //   aria-required="false"
              //   aria-describedby="shopping-preference-select-aria-description"
              {...selectProps}
            >
              <option value="preference" style={{ display: "none" }}>
                {label}
              </option>

              {options?.length &&
                options.map((option) => (
                  <option value={option.value} key={option.id}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>

          <ErrorMessage type={type} error={error} errorMessage={errorMessage} />
        </div>
      );

    case "input":
    default:
      return (
        <div className=" w-full">
          <label className="sr-only" htmlFor={`input-${label}`}>
            {label}
          </label>
          <Input
            id={`input-${label}`}
            // placeholder={placeholder}
            // type={type}
            // autoCapitalize="none"
            // autoComplete={type}
            // autoCorrect="off"
            // disabled={isLoading}
            {...register(name)}
            {...inputProps}
            className={cn("p-4 rounded-lg h-14 focus:outline-none", className)}
          />
          <ErrorMessage type={type} error={error} errorMessage={errorMessage} />
        </div>
      );
  }
};

export default DynamicFormField;

interface ErrorMessageProps<T extends FieldValues> {
  error: FieldErrors<T>[Path<T>];
  type?: "text" | "email" | "password" | "number" | "checkbox";
  errorMessage: string;
}

const ErrorMessage = <T extends FieldValues>({
  type,
  error,
  errorMessage,
}: ErrorMessageProps<T>) => {
  return (
    <div className="h-6">
      {error && type !== "checkbox" && (
        <p className="px-4 pt-[6px] text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/common/utils";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "./file-upload";
import { Item } from "@/@types/admin/admin.item.interface";

// interface Option {
//   // createdAt: string;
//   image: string;
//   name: string;
//   slug: string;
//   parent?: {
//     _id: string;
//     name: string;
//   };
//   // parent?:any
//   // updatedAt: string;
//   // __v: number;
//   _id: string;
// }

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
//  & {
//   options?: [] | Item[] | undefined;
// };
type FileProps = React.InputHTMLAttributes<HTMLInputElement> & {
  fileInputRef?: React.RefObject<HTMLInputElement>;
  previewUrl: string | null;
};

// / Définir le type pour les propriétés de champ dynamique
// fileProps={{
//   previewUrl,
//   fileInputRef: fileInputRef,
//   disabled: false,
// }}
interface DynamicFormFieldProps {
  inputType: "select" | "input" | "textarea" | "file";
  name: string;
  label?: string;
  disabled?: boolean;
  options?: Item[] | [];
  previewUrl?: string;
  className?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  inputProps?: InputProps;
  textareaProps?: TextareaProps;
  selectProps?: SelectProps;
  fileProps?: FileProps;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
}

const DynamicFormField = ({
  inputType,
  label,
  register,
  errors,
  name,
  className,
  options,
  inputProps,
  textareaProps,
  selectProps,
  fileProps,
  onFileChange,
  onButtonClick,
}: DynamicFormFieldProps) => {
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
            {...register(name)}
            {...textareaProps}
            className={cn(
              "p-4 rounded-lg focus:outline-none",
              error ? "text-red-600" : "text-black-200",
              className
            )}
          />
          <ErrorMessage type="text" error={error} errorMessage={errorMessage} />
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col">
          <div
            className={cn(
              "w-full py-4 pr-4 pl-3 rounded-lg border-default border focus:outline-none transition-all flex justify-between relative ",
              error ? "text-red-600" : "text-black-200"
            )}
          >
            <label className="sr-only" htmlFor={`select-${label}`}>
              {label}
            </label>
            <select
              {...register(name)}
              id={`select-${label}`}
              name={name}
              style={{ appearance: "none" }}
              className="w-full bg-clear z-10 focus:outline-none "
              {...selectProps}
            >
              {/* value="preference" */}
              <option style={{ display: "none" }}>{label}</option>

              {/* {options?.length &&
                options.map((option) => (
                  <option value={option.id} key={option._id}>
                    {option.name}
                  </option>
                ))} */}
              {options?.length &&
                options.map((option) => {
                  if ("_id" in option) {
                    // Option est de type Item1
                    return (
                      <option value={option._id} key={option._id}>
                        {option.name}
                      </option>
                    );
                  } else if ("id" in option) {
                    // Option est de type Item2
                    return (
                      <option value={option.value} key={option.id}>
                        {option.label}
                      </option>
                    );
                  }
                  return null; // Si aucune correspondance
                })}
            </select>
          </div>

          <ErrorMessage type="text" error={error} errorMessage={errorMessage} />
        </div>
      );

    case "file":
      return (
        <div className="flex flex-col">
          <div
            className={cn(
              "w-full py-4 pr-4 pl-3 rounded-lg border-default border focus:outline-none transition-all flex justify-between relative gap-x-2 cursor-pointer",
              error ? "text-red-600" : "text-black-200"
            )}
            onClick={onButtonClick}
          >
            <label className="sr-only" htmlFor={`file-${label}`}>
              {label}
            </label>
            <input
              id={`file-${label}`}
              type="file"
              {...register(name)}
              ref={fileProps?.fileInputRef}
              {...fileProps}
              className={cn(
                "p-4 rounded-lg focus:outline-none",
                error ? "text-red-600" : "text-black-200",
                className
              )}
              onChange={onFileChange}
              style={{ display: "none" }}
            />
            <FileUpload previewUrl={fileProps?.previewUrl} />
          </div>

          <ErrorMessage type="text" error={error} errorMessage={errorMessage} />
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
            {...register(name)}
            {...inputProps}
            className={cn(
              "p-4 rounded-lg h-14 focus:outline-none",
              error ? "text-red-600" : "text-black-200",
              className
            )}
          />
          <ErrorMessage type="text" error={error} errorMessage={errorMessage} />
        </div>
      );
  }
};

export default DynamicFormField;

interface ErrorMessageProps<T extends FieldValues> {
  error: FieldErrors<T>[Path<T>];
  type?: "text" | "email" | "password" | "number" | "checkbox" | "file";
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

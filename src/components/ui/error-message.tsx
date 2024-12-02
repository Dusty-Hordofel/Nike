import { cn } from "@/lib/common/utils";
import { CircleAlert } from "lucide-react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

interface ErrorMessageProps<T extends FieldValues> {
  error: FieldErrors<T>[Path<T>] | string;
  type?: "text" | "email" | "password" | "number" | "checkbox" | "file";
  errorMessage?: string;
  context: "react-hook-form" | "api-message";
  formCurrentStep?: number;
}

const ErrorMessage = <T extends FieldValues>({
  type,
  error,
  errorMessage,
  context,
  formCurrentStep,
}: ErrorMessageProps<T>) => {
  if (context === "react-hook-form") {
    return (
      <div className="h-6">
        {error && type !== "checkbox" && (
          <p className="px-4 pt-[6px] text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  } else if (context === "api-message") {
    return (
      <div
        className={cn(
          ` h-11 bg-gray-100 py-3 px-4 mb-5 items-center gap-x-4 rounded-md ${
            (formCurrentStep === 2 &&
              typeof error === "string" &&
              error.length > 1) ||
            (typeof error === "string" && error.length > 1)
              ? "flex"
              : "hidden"
          }`
        )}
      >
        <CircleAlert color="#ee0005" />
        <p>{typeof error === "string" && error.length > 1 && error}</p>
      </div>
    );
  }
};

export default ErrorMessage;

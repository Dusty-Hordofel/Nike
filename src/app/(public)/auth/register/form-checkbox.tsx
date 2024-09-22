import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserAuthInputFieldForm } from "@/components/client/auth";
import { RegisterFormData } from "@/lib/validations/auth";
import { FormInputFieldProps } from "@/components/client/auth/user-auth-input-field-form";

const FormCheckbox = <T extends FieldValues>({
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
    <div className="flex mt-6 mb-2">
      <div>
        <UserAuthInputFieldForm
          id={id}
          label={label}
          type="checkbox"
          isLoading={isLoading}
          register={register}
          errors={errors as FieldErrors<RegisterFormData>}
          name={name}
          className={cn(
            "accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 ",
            className
          )}
          {...props}
        />
      </div>

      {type === "mailing" ? (
        <label
          htmlFor="marketing-option"
          className={cn(
            "inline-block leading-6 pl-3"
            // errors[name] ? "text-red-600" : "text-black-200"
          )}
        >
          Inscrivez-vous pour recevoir par e-mail les dernières infos sur les
          produits et offres de Nike, ainsi que sur les avantages Membres.
        </label>
      ) : (
        <label
          htmlFor="privacy-terms"
          className={cn(
            "inline-block leading-6 pl-3",
            errors[name] ? "text-red-600" : "text-black-200"
          )}
        >
          J&apos;accepte les{" "}
          <Link
            target="_blank"
            href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&amp;country=FR&amp;language=fr&amp;requestType=redirect&amp;uxId=4fd2d5e7db76e0f85a6bb56721bd51df"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            Conditions d&apos;utilisation
          </Link>{" "}
          et je confirme avoir lu la{" "}
          <Link
            target="_blank"
            href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&amp;country=FR&amp;language=fr&amp;requestType=redirect&amp;uxId=4fd2d5e7db76e0f85a6bb56721bd51df"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            Politique de confidentialité
          </Link>{" "}
          de Nike.
        </label>
      )}
    </div>
  );
};

export default FormCheckbox;

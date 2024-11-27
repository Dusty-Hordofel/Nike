"use client";

import React, { use, useState } from "react";
import {
  FieldValues,
  useForm,
  SubmitHandler,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import {
  UserAuthHeaderForm,
  UserAuthInputFieldForm,
} from "@/components/common/auth";
import {
  RegisterFormData,
  RegisterSchema,
  UserFormData,
} from "../../../../schemas/user/auth.schema";
import { cn } from "@/lib/common/utils";
import { CrossedEye } from "@/assets/icons";
import { Eye } from "lucide-react";
import ShoppingPreference from "./shopping-preference";
import { Button } from "@/components/ui/buttons/button/button";
import FormCheckbox from "./form-checkbox";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/auth";
import { signInWithCredentials } from "@/actions/auth/user-auth.actions";
import { ZodError } from "zod";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";
import DynamicFormField from "@/components/ui/forms/dynamic-form-field/dynamic-form-field";

const options = [
  { id: "1", label: "Homme", value: "homme" },
  { id: "2", label: "Femme", value: "femme" },
];

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  // console.log("🚀 ~ SignUp ~ email:", email);

  // const user = useCurrentUser();
  // if (user /*&& userRole !== "user"*/) {
  //   router.push(`${window.location.origin}` || "/");
  // }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, touchedFields },
    reset,
    getValues,
  } = useForm<UserFormData>({ resolver: zodResolver(RegisterSchema) });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (userFormData: UserFormData) => {
      const om = JSON.stringify(userFormData);
      console.log("🚀 ~ mutationFn: ~ om:", om);
      const response = await fetch(
        // "http://localhost:3000/api/auth/register",
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          body: JSON.stringify({
            // ...userFormData,
            code: 12345678,
            lastName: "lionellebassola@gmail.com",
            firstName: "lionellebassola@gmail.com",
            email: "lionellebassola@gmail.com",
            // password: ,
            shoppingPreference: "homme",
            marketingOption: true,
            terms: true,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("INSTANCE,", errorData.message instanceof ZodError);
        if (errorData.message instanceof ZodError) {
          console.log("Zod Error olive", errorData.message);
        }
        console.log("🚀 ~ mutationFn: ~ errorData:", errorData);
        throw new Error(errorData.message || "Failed to register");
      }

      console.log("🚀 ~ mutationFn: ~ response:", response);

      return response.json();
    },
  });

  const onSubmit = async (values: UserFormData) => {
    console.log("🚀 ~ SignUp ~ values:", values);
    await mutateAsync({ ...values, email });
  };

  const togglePasswordVisibility = () => {
    // setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col w-full max-w-[532px] px-9">
        <UserAuthHeaderForm
          title="Faisons de vous un Membre Nike."
          ariaLabel="Enter your email to join us or sign in."
        />
        <div className={cn("text-black-100 pb-6")}>
          We sent a code to
          <div>
            <span className="pr-[5px]">{email}</span>
            <button
              className="text-gray-500 underline"
              onClick={() => router.push(`/login?email=${email}`)}
            >
              Edit
            </button>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="">
              <div className="flex flex-col ">
                <div className="relative">
                  <DynamicFormField
                    inputType="input"
                    label="Code"
                    name="code"
                    register={register}
                    errors={errors}
                    inputProps={{
                      type: "number",
                      placeholder: "Code*",
                      disabled: isPending,
                    }}
                  />

                  <span className="nds-input-trailing-icon css-yshjmt e1723x6b0 nds-trailing-icon-container ">
                    <button
                      type="button"
                      aria-label="renvoyer le code"
                      className="css-1qmkbv8 absolute right-3 top-4"
                      // onClick={handleResendCode}
                      disabled={/*timer > 0 ||*/ isPending}
                    >
                      <svg
                        aria-hidden="false"
                        focusable="false"
                        viewBox="0 0 24 24"
                        role="img"
                        width="24px"
                        height="24px"
                        fill="none"
                        id="Repeat-m-icon"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M23.395 11.841l-1.061-1.061-1.338 1.338c0-.039.005-.078.005-.118 0-4.962-4.038-9-9-9C8.734 3 5.877 4.756 4.3 7.367L5.392 8.46A7.506 7.506 0 0112 4.5c4.136 0 7.5 3.364 7.5 7.5 0 .06-.011.117-.013.177l-1.396-1.397-1.061 1.061 2.185 2.184-.001.001.998.997.373-.373 2.809-2.809zM12 19.5c-4.136 0-7.5-3.364-7.5-7.5 0-.06.011-.117.013-.177L5.91 13.22l1.061-1.06-2.185-2.184.001-.001-.998-.998-.373.373v.001L.606 12.16l1.061 1.061 1.338-1.338c0 .04-.005.078-.005.118 0 4.963 4.038 9 9 9 3.267 0 6.124-1.756 7.701-4.367L18.61 15.54A7.506 7.506 0 0112 19.5z"
                          clip-rule="evenodd"
                        ></path>
                        <title>Repeat-Medium (Default Size)-icon</title>
                      </svg>
                    </button>
                  </span>
                </div>

                <div className="flex gap-4 justify-between">
                  <DynamicFormField
                    inputType="input"
                    label="FirstName"
                    name="firstName"
                    register={register}
                    errors={errors}
                    inputProps={{
                      type: "text",
                      placeholder: "FirstName*",
                      disabled: isPending,
                    }}
                  />

                  <DynamicFormField
                    inputType="input"
                    label="LastName"
                    name="lastName"
                    register={register}
                    errors={errors}
                    inputProps={{
                      type: "text",
                      placeholder: "LastName*",
                      disabled: isPending,
                    }}
                  />
                </div>

                <div className="relative ">
                  <DynamicFormField
                    inputType="input"
                    label="Password"
                    name="password"
                    register={register}
                    errors={errors}
                    inputProps={{
                      type: "password",
                      placeholder: "Password*",
                      disabled: isPending,
                    }}
                    className="pr-10"
                  />

                  <button
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-4"
                  >
                    {/* {showPassword ? <CrossedEye /> : <Eye />} */}
                  </button>
                </div>

                {/* <DynamicFormField
                  inputType="select"
                  label="Préférence d'achat"
                  register={register}
                  errors={errors}
                  name="shoppingPreference"
                  selectProps={{
                    disabled: false,
                  }}
                  options={options}
                /> */}

                <FormCheckbox
                  id="marketing-option"
                  label="marketing-option"
                  isLoading={isPending}
                  type="mailing"
                  register={register}
                  errors={errors as FieldErrors<UserFormData>}
                  name="marketingOption"
                />

                <FormCheckbox
                  id="terms"
                  label="terms"
                  isLoading={isPending}
                  register={register}
                  errors={errors as FieldErrors<UserFormData>}
                  name="terms"
                />

                <div className={cn("mt-10 flex justify-end")}>
                  <Button isLoading={isPending}>Créer un compte</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

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

import { UserAuthHeaderForm, UserAuthInputFieldForm } from "@/components/auth";
import {
  RegisterFormData,
  RegisterSchema,
  UserFormData,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import { CrossedEye } from "@/assets/icons";
import { Eye } from "lucide-react";
import ShoppingPreference from "./ShoppingPreference";
import { Button } from "@/components/ui/buttons/button/button";
import FormCheckbox from "./form-checkbox";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/auth";
import { signInWithCredentials } from "@/actions/user.actions";
import { ZodError } from "zod";
import { useCurrentUser } from "@/hooks/use-current-user";

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  console.log("🚀 ~ SignUp ~ email:", email);

  const user = useCurrentUser();
  if (user /*&& userRole !== "user"*/) {
    router.push(`${window.location.origin}` || "/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, touchedFields },
    reset,
    getValues,
  } = useForm<UserFormData>({ resolver: zodResolver(RegisterSchema) });

  console.log("password", getValues("password"));

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

      // const user = await response.json();
      // console.log("🚀 ~ mutationFn: ~ user:", user);
      return response.json();
    },
    // onSuccess: async () => {
    //   // const credentials = {
    //   //   email,
    //   //   password: getValues("password"),
    //   // };
    //   // await signInWithCredentials(credentials, `${window.location.origin}`);
    //   // router.push("/");
    //   // console.log("Successfully"); //redirectTo:
    //   // await signIn("credentials", {
    //   //   email,
    //   //   password: getValues("password"),
    //   //   callbackUrl: `${window.location.origin}` || "/",
    //   // });
    // },
    // onError: (error: any) => {
    //   console.error("Error registering user:", error);
    //   console.log(error);
    // },
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
          Nous avons envoyé un code à
          <div>
            <span className="pr-[5px]">{email}</span>
            <button
              className="text-gray-500 underline"
              onClick={() => router.push(`/login?email=${email}`)}
            >
              Modifier
            </button>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="">
              <div className="flex flex-col ">
                <div className="">
                  <div className="relative">
                    <label className="sr-only" htmlFor="email">
                      Code
                    </label>
                    <Input
                      id="email"
                      placeholder="Code*"
                      type="number"
                      autoCapitalize="none"
                      autoComplete="number"
                      autoCorrect="off"
                      {...register("code")}
                      className="p-4 rounded-lg h-14 focus:outline-none pr-10"
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
                  <div className="h-6 px-4 pt-[6px] text-xs flex items-center justify-between">
                    <p>
                      {" "}
                      {errors?.code && (
                        <p className=" text-red-600">{errors.code.message}</p>
                      )}
                    </p>
                    {/* {timer > 0 && (
                      <p className=" text-gray-500">
                        Renvoyer le code dans {timer} s
                      </p>
                    )} */}
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="FirstName*"
                    type="text"
                    isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<UserFormData>}
                    name="firstName"
                  />

                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="LastName*"
                    type="text"
                    isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<UserFormData>}
                    name="lastName"
                  />
                </div>

                <div className="relative ">
                  <UserAuthInputFieldForm
                    id="password"
                    label="password"
                    placeholder="Password*"
                    type="password"
                    isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<UserFormData>}
                    name="password"
                    className="pr-10"
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-4"
                  >
                    {/* {showPassword ? <CrossedEye /> : <Eye />} */}
                  </button>
                </div>

                <ShoppingPreference
                  register={register}
                  name="shoppingPreference"
                  errors={errors}
                />

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

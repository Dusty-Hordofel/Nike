"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ResetPasswordFormData,
  userResetPasswordSchema,
} from "@/schemas/user/auth.schema";
import Form, { FormInputField } from "./form-input-field";
import { Input } from "@/components/ui/input";
import { UserAuthHeaderForm } from "@/components/common/auth";
import PasswordRule from "./password-rule";
import { Button } from "@/components/ui/buttons/button/button";
import { RefreshCcw, X } from "lucide-react";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(userResetPasswordSchema),
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    console.log("🚀 ~ onSubmitStep1 ~ value:", values);
  };

  const [timer, setTimer] = React.useState<number>(59); // Initial timer set to
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const [isResendEnabled, setIsResendEnabled] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      // setIsResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = () => {
    setTimer(30); // Reset timer
  };

  // const handleResendCode = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Replace with your API endpoint or logic to resend the code
  //     await axios.post("/api/resend-code", { /* user data */ });
  //     setIsResendEnabled(false);
  //     setTimer(30); // Reset timer
  //   } catch (error) {
  //     console.error("Failed to resend code:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex justify-center p-5 min-h-screen">
      <div className="flex flex-col justify-center max-w-[532px] w-full px-9 max-h-[569px] h-full">
        <UserAuthHeaderForm
          ariaLabel="Enter your email to password us or sign in."
          title="Enter your email to join us or sign in."
        />

        <form onSubmit={handleSubmit(onSubmit)}>
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
                // disabled={timer > 0 || isLoading}
                {...register("code")}
                className="p-4 rounded-lg h-14 focus:outline-none pr-10"
              />
              <span className="nds-input-trailing-icon css-yshjmt e1723x6b0 nds-trailing-icon-container ">
                <button
                  type="button"
                  aria-label="renvoyer le code"
                  className="css-1qmkbv8 absolute right-3 top-4"
                  onClick={handleResendCode}
                  disabled={timer > 0 || isLoading}
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
              {timer > 0 && (
                <p className=" text-gray-500">
                  Renvoyer le code dans {timer} s
                </p>
              )}
            </div>
          </div>

          <div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                placeholder="Nouveau mot de passe*"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                {...register("password")}
                className="p-4 rounded-lg h-14 focus:outline-none"
              />
              {errors?.password && (
                <p className="px-4 pt-[6px] text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div
              id="password-rules"
              aria-live="polite"
              aria-atomic="true"
              data-testid="password-error-text"
              className="ml-4 my-3"
            >
              <PasswordRule
                rule="8 caractères minimum"
                fieldError={errors.password}
              />
              <PasswordRule
                rule="Majuscules, minuscules et un chiffre"
                fieldError={errors.password}
              />
            </div>
          </div>

          <div className="flex space-x-2 mt-6  justify-end">
            <Button variant="outline" size="medium">
              Annuler
            </Button>
            <Button>Enregistrer</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

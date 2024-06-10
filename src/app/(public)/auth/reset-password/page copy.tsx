import { Input } from "@/components/ui/input";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ResetPasswordFormData,
  userResetPasswordSchema,
} from "@/lib/validations/auth";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(userResetPasswordSchema),
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
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
          // disabled={isEmailLoading}
          {...register("code")}
          className="p-4 rounded-lg h-14 focus:outline-none"
        />
        {errors?.code && (
          <p className="px-4 pt-[6px] text-xs text-red-600">
            {errors.code.message}
          </p>
        )}
      </div>
      {/* <div>
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          placeholder="Mot de passe*"
          type="password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect="off"
          //   disabled={isPasswordLoading}
          {...register("password")}
          className="p-4 rounded-lg h-14 focus:outline-none"
        />
        {errors?.password && (
          <p className="px-4 pt-[6px] text-xs text-red-600">
            {errors.password.message}
          </p>
        )}
      </div> */}
    </form>
  );
};

export default ResetPasswordPage;

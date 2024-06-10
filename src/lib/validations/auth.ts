import * as z from "zod";

export const userLoginEmailSchema = z.object({
  email: z.string().email({
    message: "Obligatoire",
  }),
});
export const userLoginPasswordSchema = z.object({
  password: z.string().min(3, "Obligatoire"),
});
export const userResetPasswordSchema = z.object({
  code: z.number().min(4, "Obligatoire"),
  password: z.string().min(3, "Obligatoire"),
});

export type EmailFormData = z.infer<typeof userLoginEmailSchema>;
export type PasswordFormData = z.infer<typeof userLoginPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof userResetPasswordSchema>;

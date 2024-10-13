import * as z from "zod";

export const LogInSchema = z.object({
  email: z.string().email({
    message: "Obligatoire",
  }),
  password: z.string().min(3, "Obligatoire"),
});

export const RegisterSchema = z.object({
  code: z.string().min(5, "Required"),
  lastName: z.string().min(2, "Required"),
  firstName: z.string().min(2, "Required"),
  password: z.string().min(6, "Required"),
  shoppingPreference: z
    .string()
    .refine((value) => ["homme", "femme"].includes(value), {
      message: "Required",
    }),

  terms: z.boolean().refine((val) => val === true, {
    message: "Required",
  }),
  marketingOption: z.boolean().optional(),
});

export const addressSchema = z.object({
  country: z.string({ message: "Le pays est requis." }),
  city: z.string({ message: "La ville est requise." }),
  province: z.string({ message: "La province est requise." }),
  postalCode: z.string({ message: "Le code postal est requis." }),
});

export const UserSchema = z.object({
  code: z.string().min(5, "Required"),
  lastName: z.string({ message: "Le nom est requis." }),
  firstName: z.string({ message: "Le prénom est requis." }),
  email: z.string().email({ message: "L'adresse email est invalide." }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  shoppingPreference: z
    .string()
    .refine((value) => ["homme", "femme"].includes(value), {
      message: "Required",
    }),

  phoneNumber: z.string().optional(),
  role: z.string().default("user"),
  marketingOption: z.boolean().default(false),
  terms: z.boolean().refine((val) => val === true, {
    message: "Required",
  }),
});

export const userResetPasswordSchema = z.object({
  code: z.string().min(5, "Obligatoire"),
  password: z.string().min(8, "Obligatoire"),
});

// Création d'un schéma partiel pour l'email
export const EmailSchema = LogInSchema.pick({ email: true });
export const PasswordSchema = LogInSchema.pick({ password: true });
export const OptionSchema = UserSchema.pick({ shoppingPreference: true });

export type EmailFormData = z.infer<typeof EmailSchema>;
export type PasswordFormData = z.infer<typeof PasswordSchema>;
export type LoginFormData = z.infer<typeof LogInSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type UserFormData = z.infer<typeof UserSchema>;
export type ResetPasswordFormData = z.infer<typeof userResetPasswordSchema>;
export type OptionFormData = z.infer<typeof OptionSchema>;

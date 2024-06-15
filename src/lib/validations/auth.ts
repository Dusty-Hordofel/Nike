import * as z from "zod";

export const LogInSchema = z.object({
  email: z.string().email({
    message: "Obligatoire",
  }),
  password: z.string().min(3, "Obligatoire"),
});
// export const logInSchema = z.object({
//   email: z
//     .string({ required_error: "Email is required" })
//     .min(1, "Email is required")
//     .email("Invalid email"),
//   password: z
//     .string({ required_error: "Password is required" })
//     .min(1, "Password is required")
//     .min(8, "Password must be more than 8 characters")
//     .max(32, "Password must be less than 32 characters"),
// });

export const RegisterSchema = z.object({
  code: z.string().min(5, "Required"),
  // email: z.string().email("Obligatoire"),
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
  // terms: z.boolean().refine((value) => value === true, {
  //   message: "Required",
  // }),
  // terms: z.boolean().refine((value) => value === true, {
  //   message: "Required",
  // }),
  marketingOption: z.boolean().optional(),
});

export const addressSchema = z.object({
  country: z.string({ message: "Le pays est requis." }),
  province: z.string({ message: "La province est requise." }),
  city: z.string({ message: "La ville est requise." }),
  postalCode: z.string({ message: "Le code postal est requis." }),
});

export const UserSchema = z.object({
  code: z.string().min(5, "Required"),
  lastName: z.string({ message: "Le nom est requis." }),
  firstName: z.string({ message: "Le prénom est requis." }),
  email: z.string().email({ message: "L'adresse email est invalide." }),
  // image: z.string().url({ message: "L'URL de l'image est invalide." }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  shoppingPreference: z
    .string()
    .refine((value) => ["homme", "femme"].includes(value), {
      message: "Required",
    }),

  // emailVerified: z.boolean().default(false),
  // phone: z.string().optional(),
  // role: z.string().default("user"),
  // address: addressSchema,
  marketingOption: z.boolean().default(false),
  terms: z.boolean().refine((val) => val === true, {
    message: "Required",
  }),
});

// const addressSchema = z.object({
//   country: z.string().min(1, "Country is required"),
//   province: z.string().min(1, "Province is required"),
//   city: z.string().min(1, "City is required"),
//   postalCode: z.string().min(1, "Postal Code is required"),
// });

// export const UserSchema = z.object({
//   name: z.string().optional(),
//   // email: z.string().email("Invalid email format"),
//   email: z.string().email({ message: "L'adresse email est invalide." }),
//   image: z
//     .string()
//     .url()
//     .default(
//       "https://res.cloudinary.com/dgsc66scx/image/upload/v1712483523/Asset_5_icflwx.png"
//     ),
//   password: z.string().min(6, "Password must be at least 6 characters long"),
//   genderPreference: z.enum(["homme", "femme"]).optional(),
//   emailVerified: z.boolean().default(false),
//   phone: z.string().optional(),
//   role: z.string().default("user"),
//   address: addressSchema.optional(),
//   wantsNewsletter: z.boolean().optional(),
//   createdAt: z.date().optional(),
//   updatedAt: z.date().optional(),
// });

// Création d'un schéma partiel pour l'email
export const EmailSchema = LogInSchema.pick({ email: true });
export const PasswordSchema = LogInSchema.pick({ password: true });

// Extraction du type TypeScript pour l'email & password
export type EmailFormData = z.infer<typeof EmailSchema>;
export type PasswordFormData = z.infer<typeof PasswordSchema>;
export type LoginFormData = z.infer<typeof LogInSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type UserFormData = z.infer<typeof UserSchema>;

export const userResetPasswordSchema = z.object({
  code: z.string().min(5, "Obligatoire"),
  password: z.string().min(8, "Obligatoire"),
});
export type ResetPasswordFormData = z.infer<typeof userResetPasswordSchema>;

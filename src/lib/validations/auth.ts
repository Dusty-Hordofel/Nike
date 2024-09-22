import * as z from "zod";

export const LogInSchema = z.object({
  email: z.string().email({
    message: "Obligatoire",
  }),
  password: z.string().min(3, "Obligatoire"),
});

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
  // addresses: addressSchema.optional(),
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

export const CategorySchema = z.object({
  category: z
    .string({ message: "Category name is required." })
    .min(1, "Category name is required."),

  file: z
    .any()
    .optional() // Rendre le champ optionnel
    .refine(
      (files) =>
        !files || (files.length > 0 && files[0]?.size < 5 * 1024 * 1024),
      {
        message: "File must be less than 5MB or required.",
      }
    )
    .refine(
      (files) =>
        !files || ["image/jpeg", "image/png"].includes(files?.[0]?.type),
      {
        message: "Only JPEG and PNG files are allowed",
      }
    ),

  // file: z
  //   .any()
  //   .refine((files) => files && files.length > 0, {
  //     message: "File is required",
  //   })
  //   .refine((files) => files?.[0]?.size < 5 * 1024 * 1024, {
  //     message: "File size must be less than 5MB",
  //   })
  //   .refine((files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type), {
  //     message: "Only JPEG and PNG files are allowed",
  //   }),
});

export const SubCategorySchema = (
  validCategories: {
    createdAt: string;
    image: string;
    name: string;
    slug: string;
    updatedAt: string;
    __v: number;
    _id: string;
  }[]
) =>
  z.object({
    subcategory: z.string().min(1, { message: "Le nom est requis" }), // Champ obligatoire
    file: z
      .any()
      .optional() // Rendre le champ optionnel
      .refine(
        (files) =>
          !files || (files.length > 0 && files[0]?.size < 5 * 1024 * 1024),
        {
          message: "File must be less than 5MB or required.",
        }
      )
      .refine(
        (files) =>
          !files || ["image/jpeg", "image/png"].includes(files?.[0]?.type),
        {
          message: "Only JPEG and PNG files are allowed",
        }
      ),

    parent: z
      .string()
      .min(1, { message: "Le parent est requis" }) // Champ parent obligatoire
      .refine((val) => validCategories.some((cat) => cat._id === val), {
        message: "Le parent sélectionné est invalide.",
      }), // Validation basée sur les catégories récupérées dynamiquement
  });

export default SubCategorySchema;

// Extraction du type TypeScript pour l'email & password
export type EmailFormData = z.infer<typeof EmailSchema>;
export type PasswordFormData = z.infer<typeof PasswordSchema>;
export type LoginFormData = z.infer<typeof LogInSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type UserFormData = z.infer<typeof UserSchema>;
export type ResetPasswordFormData = z.infer<typeof userResetPasswordSchema>;
export type OptionFormData = z.infer<typeof OptionSchema>;
export type CategoryFormData = z.infer<typeof CategorySchema>;
export type SubCategoryFormData = z.infer<ReturnType<typeof SubCategorySchema>>;

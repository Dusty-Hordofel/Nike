import { z } from "zod";

// Schéma pour la validation des sous-produits
const subProductSchema = z.object({
  images: z.any().refine((files) => files && Array.from(files).length > 0, {
    message: "Please select at least one image.",
  }),
  color: z
    .string()
    .min(1, "La couleur est obligatoire")
    .regex(/^#[0-9A-F]{6}$/, "La couleur doit être un code hexadécimal"),
  sizes: z
    .array(
      z.object({
        size: z
          .string()
          .min(1, "La taille est obligatoire")
          .max(50, "La taille ne peut pas dépasser 50 caractères"),
        qty: z.number().min(1, "La quantité doit être supérieure ou égale à 1"),
        price: z.number().min(0, "Le prix doit être supérieur ou égal à 0"),
      })
    )
    .min(1, "Au moins une taille est requise"),
  discount: z
    .number()
    .min(0, "La réduction ne peut pas être inférieure à 0")
    .max(100, "La réduction ne peut pas dépasser 100")
    .default(0),
  sold: z
    .number()
    .min(0, "Le nombre de produits vendus ne peut pas être inférieur à 0")
    .default(0),
});
// const subProductSchema = z.object({
//   images: z
//     .any()
//     .optional() // Rendre le champ optionnel
//     .refine(
//       (files) =>
//         !files || (files.length > 0 && files[0]?.size < 5 * 1024 * 1024),
//       {
//         message: "File must be less than 5MB or required.",
//       }
//     )
//     .refine(
//       (files) =>
//         !files || ["image/jpeg", "image/png"].includes(files?.[0]?.type),
//       {
//         message: "Only JPEG and PNG files are allowed",
//       }
//     ),

//   sizes: z
//     .array(
//       z.object({
//         size: z.string().min(1, "La taille est obligatoire"),
//         qty: z.string().min(1, "La quantité est obligatoire"),
//         price: z.string().min(1, "Le prix est obligatoire"),
//       })
//     )
//     .min(1, "Au moins une taille est requise"),
// });

// Schéma principal pour Product
export const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),
  // subProducts: z.array(subProductSchema),
  // name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string().min(1, "La description est requise."),
  category: z.string().min(1, "La catégorie est requise."),
  subCategories: z.string().min(1, "La sous catégorie est requise."),
  subProducts: z.array(subProductSchema),
  productType: z.enum(["clothing", "shoes"], {
    required_error: "Le type de produit est requis.",
  }),
});

// Type de données pour le formulaire
export type ProductFormData = z.infer<typeof productSchema>;

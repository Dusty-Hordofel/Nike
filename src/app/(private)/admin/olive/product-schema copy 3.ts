import { z } from "zod";

// Schéma pour SubProduct
// const subProductSchema = z.object({
//   images: z.array(
//     z.object({
//       file: z.instanceof(File).optional(), // Fichier sélectionné
//     })
//   ),
//   // // description_images: z.array(z.string()),
//   color: z.object({
//     color: z.string(),
//     image: z.string(),
//   }),
//   sizes: z.array(
//     z.object({
//       size: z.string(),
//       qty: z.string(),
//       price: z.string(),
//     })
//   ),
//   discount: z.number().min(0).optional(),
//   sold: z.number().min(0).optional(),
// });

const subProductSchema = z.object({
  images: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
      })
    )
    .min(1, "Au moins une image est requise"), // Validation pour les images
  // color: z.object({
  color: z
    .string()
    .min(1, "La couleur est obligatoire")
    .regex(/^#[0-9A-F]{6}$/i, "La couleur doit être un code hexadécimal"), // Validation de la couleur en hexadécimal
  // image: z.string().min(1, "L'image de couleur est obligatoire"),
  // }),
  // color: z.object({
  //   color: z
  //     .string()
  //     .min(1, "La couleur est obligatoire")
  //     .regex(/^#[0-9A-F]{6}$/i, "La couleur doit être un code hexadécimal"), // Validation de la couleur en hexadécimal
  //   image: z.string().min(1, "L'image de couleur est obligatoire"),
  // }),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "La taille est obligatoire"),
        qty: z.string().min(1, "La quantité est obligatoire"), // ou `.number()` selon vos besoins
        price: z.string().min(1, "Le prix est obligatoire"), // ou `.number()` selon vos besoins
      })
    )
    .min(1, "Au moins une taille est requise"), // Validation des tailles
  discount: z
    .number()
    .min(0, "La réduction ne peut pas être inférieure à 0")
    .max(100, "La réduction ne peut pas dépasser 100")
    .default(0), // Valeur par défaut pour discount
  sold: z
    .number()
    .min(0, "Le nombre de produits vendus ne peut pas être inférieur à 0")
    .default(0), // Valeur par défaut pour sold
});

// Schéma principal pour Product
export const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),

  subProducts: z.array(subProductSchema),
});

export type ProductFormData = z.infer<typeof productSchema>;

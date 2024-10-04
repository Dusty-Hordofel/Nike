import { z } from "zod";

// Schéma Zod pour les sous-produits
export const subProductSchema = z.object({
  images: z
    .any()
    .refine((files) => files && Array.from(files).length > 0, {
      message: "Please select at least one image.",
    })
    .refine(
      (files) =>
        Array.from(files as File[]).every(
          (file) => file.size <= 5 * 1024 * 1024
        ),
      { message: "Each image must be smaller than 5MB." }
    )
    .refine(
      (files) =>
        Array.from(files as File[]).every((file) =>
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            file.type
          )
        ),
      { message: "Only .jpg, .png, .webp and .gif formats are allowed." }
    ),
  color: z
    .string()
    .min(1, "La couleur est obligatoire")
    .regex(/^#[0-9A-F]{6}$/i, "La couleur doit être un code hexadécimal"),
  price: z
    .number()
    .min(0, "Le prix ne peut pas être inférieure à 0")
    .max(100, "La prix ne peut pas dépasser 500")
    .default(0),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "La taille est obligatoire"),
        qty: z.string().min(1, "La quantité est obligatoire"),
        // price: z.string().min(1, "Le prix est obligatoire"),
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

// Schéma principal pour les produits
export const productSchema = z.object({
  // name: z.string().min(1, "Le nom du produit est requis."),
  // subProducts: z.array(subProductSchema),
  name: z.string().min(1, "Le nom du produit est requis."),
  // subProducts: z.array(subProductSchema),
  // name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string().min(1, "La description est requise."),
  // category: z.string().min(1, "La catégorie est requise."),
  category: z.string().min(1, { message: "La catégorie est requise." }),
  // subCategories: z.array(z.string().min(1, "La sous catégorie est requise.")),
  shipping: z
    .number()
    .min(0, "Les frais de livraison ne peuvent pas être inférieur à 0")
    .max(100, "Les frais de livraison ne peuvent pas excéder 50")
    .default(0),
  subCategories: z
    .array(z.string())
    .min(1, { message: "Please select at least one subcategory." }),
  subProducts: z.array(subProductSchema),
  productType: z.enum(["clothing", "shoes", "accessories"], {
    message: "Le type de produit est requis.",
  }),
});

export type ProductFormData = z.infer<typeof productSchema>;

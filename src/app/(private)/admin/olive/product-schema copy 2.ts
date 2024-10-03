import { z } from "zod";

// Schéma pour SubProduct
const subProductSchema = z.object({
  images: z.array(
    z.object({
      file: z.instanceof(File).optional(), // Fichier sélectionné
    })
  ),
  // description_images: z.array(z.string()),
  color: z.object({
    color: z.string(),
    image: z.string(),
  }),
  sizes: z.array(
    z.object({
      size: z.string(),
      qty: z.string(),
      price: z.string(),
    })
  ),
  discount: z.number().min(0).optional(),
  sold: z.number().min(0).optional(),
});

// Schéma principal pour Product
export const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string().min(1, "La description est requise."),
  category: z.string().min(1, "La catégorie est requise."),
  subCategories: z.string().min(1, "La sous catégorie est requise."),
  subProducts: z.array(subProductSchema),
  productType: z.enum(["clothing", "shoes"], {
    required_error: "Le type de produit est requis.",
  }),
});

export type ProductFormData = z.infer<typeof productSchema>;

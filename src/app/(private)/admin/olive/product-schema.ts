import { z } from "zod";

// Schéma pour Review
const reviewSchema = z.object({
  reviewBy: z.string().min(1, "L'identifiant de l'utilisateur est requis."),
  rating: z.number().min(0).max(5, "La note doit être entre 0 et 5."),
  review: z.string().min(1, "Le commentaire est requis."),
  size: z.string().optional(),
  style: z
    .object({
      color: z.string(),
      image: z.string(),
    })
    .optional(),
  fit: z.string().optional(),
  images: z.array(z.string()).optional(),
  likes: z.array(z.string()).optional(),
});

// Schéma pour SubProduct
const subProductSchema = z.object({
  sku: z.string(),
  images: z.array(z.object({ public_url: z.string(), url: z.string() })),
  description_images: z.array(z.string()),
  color: z.object({
    color: z.string(),
    image: z.string(),
  }),
  sizes: z.array(
    z.object({
      size: z.string(),
      qty: z.number(),
      price: z.number(),
    })
  ),
  discount: z.number().min(0).optional(),
  sold: z.number().min(0).optional(),
});

// Schéma principal pour Product
export const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string().min(1, "La description est requise."),
  brand: z.string().optional(),
  slug: z.string().min(1, "Le slug est requis."),
  category: z.string().min(1, "La catégorie est requise."),
  subCategories: z.array(z.string()).optional(),
  details: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  questions: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional(),
  reviews: z.array(reviewSchema).optional(),
  refundPolicy: z.string().optional().default("30 days"),
  rating: z.number().min(0).max(5).optional().default(0),
  numReviews: z.number().optional().default(0),
  shipping: z.number().min(0, "Les frais de livraison sont requis."),
  subProducts: z.array(subProductSchema),
  // Ajout du productType pour les vêtements ou chaussures
  productType: z.enum(["clothing", "shoes"], {
    required_error: "Le type de produit est requis.",
  }),
});

export type ProductFormData = z.infer<typeof productSchema>;

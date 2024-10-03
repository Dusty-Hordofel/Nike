import { z } from "zod";

// Schéma pour la validation des sous-produits
const subProductSchema = z.object({
  images: z
    .any()
    .refine(
      (files) => files && Array.from(files).length > 0, // Vérifier qu'au moins un fichier est sélectionné
      { message: "Please select at least one image." }
    )
    .refine(
      (files) =>
        Array.from(files as File[]).every(
          (file) => file.size <= 5 * 1024 * 1024
        ), // Taille maximale de 5MB par image
      { message: "Each image must be smaller than 5MB." }
    )
    .refine(
      (files) =>
        Array.from(files as File[]).every((file) =>
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            file.type
          )
        ), // Vérifie que l'extension est soit jpeg, png ou gif
      { message: "Only .jpg, .png,.webp and .gif formats are allowed." }
    ),
  // color: z
  //   .string()
  //   .min(1, "La couleur est obligatoire")
  //   .regex(/^#[0-9A-F]{6}$/i, "La couleur doit être un code hexadécimal"),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "La taille est obligatoire"),
        qty: z.string().min(1, "La quantité est obligatoire"),
        price: z.string().min(1, "Le prix est obligatoire"),
      })
    )
    .min(1, "Au moins une taille est requise"),
  // discount: z
  //   .number()
  //   .min(0, "La réduction ne peut pas être inférieure à 0")
  //   .max(100, "La réduction ne peut pas dépasser 100")
  //   .default(0),
  // sold: z
  //   .number()
  //   .min(0, "Le nombre de produits vendus ne peut pas être inférieur à 0")
  //   .default(0),
});

// Schéma principal pour Product
export const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),
  subProducts: z.array(subProductSchema),
});

// Type de données pour le formulaire
export type ProductFormData = z.infer<typeof productSchema>;

import { z } from "zod";
import { SubProductSchema } from "./subproduct.schema";

export const ProductSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string().min(1, "La description est requise."),
  category: z.string().min(1, { message: "La catégorie est requise." }),
  shipping: z
    .number()
    .min(0, "Les frais de livraison ne peuvent pas être inférieur à 0")
    .max(100, "Les frais de livraison ne peuvent pas excéder 50")
    .default(0),
  subCategories: z
    .array(z.string())
    .min(1, { message: "Please select at least one subcategory." }),
  // subProducts: z.array(subProductSchema),
  subProducts: z
    .array(SubProductSchema)
    .min(1, { message: "Veuillez ajouter au moins un sous-produit." }), // S
  productType: z.enum(["clothing", "shoes", "accessories"], {
    message: "Le type de produit est requis.",
  }),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

import { Item } from "@/@types/admin/admin.item.interface";
import * as z from "zod";

export const SubCategorySchema = (validCategories: Item[] | [] | undefined) =>
  z.object({
    subcategory: z.string().min(1, { message: "Le nom est requis" }),
    file: z
      .any()
      .optional()
      .refine(
        (files) =>
          !files || (files.length > 0 && files[0]?.size < 5 * 1024 * 1024),
        {
          message: "File must be less than 5MB or required.",
        }
      )
      .refine(
        (files) =>
          !files ||
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            files?.[0]?.type
          ),
        {
          message: "Only JPEG and PNG files are allowed",
        }
      ),
    parent: z
      .string()
      .min(1, { message: "Le parent est requis" })
      .refine((val) => validCategories?.some((cat) => cat._id === val), {
        message: "Le parent sélectionné est invalide.",
      }),
  });

export type SubCategoryFormData = z.infer<ReturnType<typeof SubCategorySchema>>;

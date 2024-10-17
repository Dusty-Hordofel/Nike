import * as z from "zod";

export const CategorySchema = z.object({
  category: z
    .string({ message: "Category name is required." })
    .min(1, "Category name is required."),
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
});

export type CategoryFormData = z.infer<typeof CategorySchema>;

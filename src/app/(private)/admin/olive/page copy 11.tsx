"use client";
import React, { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/buttons/button/button";
import { Input } from "@/components/ui/input";

// Taille française pour les vêtements et les chaussures
const sizeOptions: Record<string, string[]> = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  shoes: Array.from({ length: 12 }, (_, i) => (38 + i).toString()), // Génère des tailles de 38 à 49
};

// Fonction pour obtenir les tailles en fonction du type de produit
const getSizeOptions = (productType: string) => {
  return sizeOptions[productType] || [];
};

const sizeOptionsForProduct = getSizeOptions("shoes");
// console.log("🚀 ~ sizeOptionsForProduct:", sizeOptionsForProduct);

// Schéma Zod pour les sous-produits
const subProductSchema = z.object({
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
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "La taille est obligatoire"),
        qty: z.string().min(1, "La quantité est obligatoire"),
        price: z.string().min(1, "Le prix est obligatoire"),
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
  name: z.string().min(1, "Le nom du produit est requis."),
  subProducts: z.array(subProductSchema),
});

export type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subProducts",
  });

  const onSubmit = (data: ProductFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nom du produit</label>
        <input {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      {fields.map((field, index) => (
        <div key={field.id}>
          {/* <div>
            <label>Images</label>
            <input
              multiple
              type="file"
              {...register(`subProducts.${index}.images`)}
            />
            {errors.subProducts?.[index]?.images && (
              <span>{String(errors.subProducts[index]?.images?.message)}</span>
            )}
          </div> */}

          {/* Aperçu des images */}
          <ImageUpload register={register} subProductIndex={index} />

          <div>
            <label>Couleur</label>
            <input {...register(`subProducts.${index}.color`)} />
            {errors.subProducts?.[index]?.color && (
              <span>{errors.subProducts[index]?.color?.message}</span>
            )}
          </div>

          {/* <div>
            <label>Tailles</label>
            {field.sizes.map((sizeField, sizeIndex) => (
              <div key={sizeIndex}>
                <input
                  placeholder="Taille"
                  {...register(`subProducts.${index}.sizes.${sizeIndex}.size`)}
                />
                {errors.subProducts?.[index]?.sizes?.[sizeIndex]?.size && (
                  <span>
                    {
                      errors.subProducts[index]?.sizes?.[sizeIndex]?.size
                        ?.message
                    }
                  </span>
                )}
                <input
                  placeholder="Quantité"
                  {...register(`subProducts.${index}.sizes.${sizeIndex}.qty`)}
                />
                {errors.subProducts?.[index]?.sizes?.[sizeIndex]?.qty && (
                  <span>
                    {
                      errors.subProducts[index]?.sizes?.[sizeIndex]?.qty
                        ?.message
                    }
                  </span>
                )}
                <input
                  placeholder="Prix"
                  {...register(`subProducts.${index}.sizes.${sizeIndex}.price`)}
                />
                {errors.subProducts?.[index]?.sizes?.[sizeIndex]?.price && (
                  <span>
                    {
                      errors.subProducts[index]?.sizes?.[sizeIndex]?.price
                        ?.message
                    }
                  </span>
                )}
              </div>
            ))}
          </div> */}

          <div>
            <label className="text-xl font-medium">Tailles</label>
            <div>
              {/* Gestion dynamique des tailles pour chaque SubProduct */}
              <SizeFields
                control={control}
                register={register}
                subProductIndex={index}
                // subProductIndex={subProductIndex}
                errors={errors}
                productType="clothing" // On passe le productType ici
                // productType={productType} // On passe le productType ici
              />
            </div>
          </div>

          <button type="button" onClick={() => remove(index)}>
            Supprimer le sous-produit
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            images: [], // Tu peux initialiser cela à vide si nécessaire
            color: "", // Valeur par défaut pour la couleur
            sizes: [{ size: "", qty: "", price: "" }], // Initialisation d'une taille vide
            discount: 0, // Valeur par défaut pour la réduction
            sold: 0, // Valeur par défaut pour le nombre d'articles vendus
          })
        }
      >
        Ajouter un sous-produit
      </button>

      <button type="submit">Soumettre</button>
    </form>
  );
};

export default ProductForm;

const ImageUpload = ({
  register,
  subProductIndex,
}: {
  register: any;
  subProductIndex: number;
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("🚀 ~ handleImageChange ~ files:", files);
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(fileArray);
    }
  };

  return (
    <div>
      <label>Images</label>
      <input
        type="file"
        accept="image/*"
        {...register(`subProducts.${subProductIndex}.images` as const)}
        multiple
        onChange={handleImageChange}
      />

      {/* Afficher les aperçus des images */}
      <div className="image-preview-container">
        {imagePreviews.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index}`}
            className="image-preview"
          />
        ))}
      </div>
    </div>
  );
};

const SizeFields = ({
  control,
  register,
  subProductIndex,
  errors,
  productType,
}: any) => {
  const {
    fields: sizesFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `subProducts.${subProductIndex}.sizes`,
  });

  const sizeOptionsForProduct = getSizeOptions(productType);
  console.log("🚀 ~ sizeOptionsForProduct:22", sizeOptionsForProduct);

  return (
    <div className="space-y-4">
      {sizesFields.map((sizeField, sizeIndex) => (
        <div key={sizeField.id} className="flex flex-col gap-y-4">
          {/* Sélection des tailles */}

          <div className="">
            <label className="sr-only">Taille</label>
            <select
              {...register(
                `subProducts.${subProductIndex}.sizes.${sizeIndex}.size`
              )}
              className="px-3 py-2  h-10  rounded-md border w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Choisir une taille
              </option>
              {sizeOptionsForProduct.map((sizeOption) => (
                <option key={sizeOption} value={sizeOption}>
                  {sizeOption}
                </option>
              ))}
            </select>

            {/* Affichage des erreurs pour la taille */}
            {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]
              ?.size && (
              <span>
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.size
                    .message
                }
              </span>
            )}
          </div>

          {/* Champ pour la quantité */}
          <div className="">
            <label className="sr-only">Quantité</label>
            <Input
              {...register(
                `subProducts.${subProductIndex}.sizes.${sizeIndex}.qty`
              )}
              placeholder="Quantité"
              type="number"
            />
            {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]
              ?.qty && (
              <span>
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.qty
                    .message
                }
              </span>
            )}
          </div>
          {/* Champ pour le prix */}
          <div className="">
            <label className="sr-only">Prix</label>
            <Input
              {...register(
                `subProducts.${subProductIndex}.sizes.${sizeIndex}.price`
              )}
              placeholder="Prix"
              type="number"
            />
            {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]
              ?.price && (
              <span>
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.price
                    .message
                }
              </span>
            )}
          </div>
          {/* Bouton pour supprimer la taille */}

          <Button type="button" onClick={() => removeSize(sizeIndex)} fullWidth>
            Supprimer
          </Button>
        </div>
      ))}

      {/* Bouton pour ajouter une nouvelle taille */}
      <Button
        type="button"
        onClick={() => appendSize({ size: "", qty: 0, price: 0 })}
      >
        Ajouter une taille
      </Button>
    </div>
  );
};

const UseSizes = ({
  control,
  subProductIndex,
  register,
}: {
  control: any;
  subProductIndex: number;
  register: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `subProducts.${subProductIndex}.sizes` as const,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>Taille</label>
          <input
            {...register(
              `subProducts.${subProductIndex}.sizes.${index}.size` as const
            )}
            placeholder="Taille"
          />
          <label>Quantité</label>
          <input
            {...register(
              `subProducts.${subProductIndex}.sizes.${index}.qty` as const
            )}
            placeholder="Quantité"
          />
          <label>Prix</label>
          <input
            {...register(
              `subProducts.${subProductIndex}.sizes.${index}.price` as const
            )}
            placeholder="Prix"
          />

          <button type="button" onClick={() => remove(index)}>
            Supprimer la taille
          </button>
        </div>
      ))}

      {/* Bouton pour ajouter une nouvelle taille */}
      <button
        type="button"
        onClick={
          () => append({ size: "", qty: "", price: "" }) // Ajoute une taille vide
        }
      >
        Ajouter une taille
      </button>
    </div>
  );
};

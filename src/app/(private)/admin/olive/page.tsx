"use client";
import React, { useRef, useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/buttons/button/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";
import { useGetSubCategoriesByParent } from "@/hooks/admin/use-admin-subcategories.hook";
import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modals/modal";
import { useModal } from "@/context/modal/modal-context";

// Taille française pour les vêtements et les chaussures
const sizeOptions: Record<string, string[]> = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  shoes: Array.from({ length: 12 }, (_, i) => (38 + i).toString()), // Génère des tailles de 38 à 49
};

// Fonction pour obtenir les tailles en fonction du type de produit
const getSizeOptions = (productType: string) => {
  return sizeOptions[productType] || [];
};

// const sizeOptionsForProduct = getSizeOptions("shoes");
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
  // name: z.string().min(1, "Le nom du produit est requis."),
  // subProducts: z.array(subProductSchema),
  name: z.string().min(1, "Le nom du produit est requis."),
  // subProducts: z.array(subProductSchema),
  // name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string().min(1, "La description est requise."),
  // category: z.string().min(1, "La catégorie est requise."),
  category: z.string().min(1, { message: "La catégorie est requise." }),
  // subCategories: z.array(z.string().min(1, "La sous catégorie est requise.")),
  subCategories: z
    .array(z.string())
    .min(1, { message: "Please select at least one subcategory." }),
  subProducts: z.array(subProductSchema),
  // productType: z.enum(["clothing", "shoes"], {
  //   required_error: "Le type de produit est requis.",
  // }),
});

export type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = useAdminGetCategories();
  const allSubCategories = useGetSubCategoriesByParent(selectedCategory, true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subProducts",
  });

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUD_SECRET as string
    );

    try {
      console.log("CLOUDINARY", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("🚀 ~ uploadImageToCloudinary ~ data:DATA", data);
      return {
        url: data.secure_url,
        public_url: data.url,
      };
      // return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    console.log("DATASSS", data);

    // const updatedSubProducts = await Promise.all(
    //   data.subProducts.map(async (subProduct) => {
    //     if (subProduct.images && subProduct.images.length > 0) {
    //       const uploadedImageUrls = await Promise.all(
    //         [...subProduct.images].map(
    //           async (file: File) => await uploadImageToCloudinary(file)
    //         )
    //       );
    //       console.log(
    //         "🚀 ~ data.subProducts.map ~ uploadedImageUrls:IMAGES UPLOADED",
    //         uploadedImageUrls
    //       );
    //       return {
    //         ...subProduct,
    //         color: {
    //           color: subProduct.color,
    //           image: uploadedImageUrls[0].url,
    //         },
    //         images: uploadedImageUrls,
    //       };
    //     }

    //     return subProduct;
    //   })
    // );

    // // Envoyer les données finales au backend
    // const productData = {
    //   ...data,
    //   subProducts: updatedSubProducts, // Utiliser les sous-produits avec les URLs d'images
    // };

    // console.log("🚀 ~ onSubmit ~ productData:PRODUCT DATA", productData);

    // // return updatedSubProducts;

    // console.log("IMAGES", updatedSubProducts);
  };

  if (categories.isLoading)
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );

  if (categories.isError) {
    // console.log("Error", subCategories.error);
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {categories.error?.message}</h1>
        </div>
      </div>
    );
  }

  const {
    entityToEdit,
    isCreateModalOpen,
    isResultModalOpen,
    isUpdateModalOpen,
    showCreateModal,
    showResultModal,
    showUpdateModal,
    closeCreateModal,
    closeResultModal,
    setUpdateModalOpen,
    setResultModalContent,
    resultModalContent,
  } = useModal();

  const handleModalClose = (isUpdate = false) => {
    // reset();
    // setPreviewUrl(null);
    // setPicture(null);
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
    isUpdate ? setUpdateModalOpen(false) : closeCreateModal();
  };

  return (
    <Modal title="Create your Product" onCloseModal={() => handleModalClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-h-[500px] overflow-y-auto scrollbar-hidden space-y-4">
          <div
            className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
            <label>Nom du produit</label>
            <Input {...register("name")} placeholder="Nom du Produit" />

            {errors.name?.message && (
              <p className="px-4 pt-[6px] text-xs ">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* Description */}
          <div
            className={`${errors.description ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
            <div className="space-y-1">
              <label>Description</label>
              <Textarea
                id={`input-textarea`}
                {...register("description")}
                rows={5}
                className={cn("p-4 rounded-lg focus:outline-none")}
              />
            </div>
            {errors.description && (
              <p className="px-4 pt-[6px] text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Categories */}
          <div className="flex flex-col">
            <div
              className={cn(
                "w-full  rounded-lg border-default border focus:outline-none transition-all flex justify-between relative gap-x-2 bg-green-400 cursor-pointer",
                errors.category ? "text-red-600" : "text-black-200"
              )}
            >
              <label className="sr-only" htmlFor="select-category">
                Category
              </label>
              <select
                id="select-category"
                {...register("category")}
                className=" bg-clear z-10 focus:outline-none  bg-info py-4 pr-4 pl-3 w-full"
                onChange={async (e) => {
                  const value = e.target.value;
                  setSelectedCategory(value);
                  setValue("category", value);
                  setValue("subCategories", []);
                  clearErrors("subCategories");

                  await trigger(["category", "subCategories"]);
                }}
              >
                <option value="">Select a category</option>
                {categories.data?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6">
              {errors.category && (
                <p className="px-4 pt-[6px] text-xs text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* SubCategories */}
          <div className="flex flex-col">
            <div
              className={cn(
                "w-full py-4 pr-4 pl-3 rounded-lg border-default border focus:outline-none transition-all flex justify-between relative gap-x-2 bg-green-400 cursor-pointer",
                errors.subCategories ? "text-red-600" : "text-black-200"
              )}
            >
              {/* <label htmlFor="checkbox-subcategories">Subcategory</label> */}
              <div className="flex gap-5">
                {allSubCategories.data && allSubCategories.data.length > 0 ? (
                  allSubCategories.data.map((subCategory) => (
                    <div key={subCategory._id}>
                      <label className="flex items-center gap-x-2">
                        <input
                          id="checkbox-subCategories"
                          type="checkbox"
                          value={subCategory._id}
                          {...register("subCategories")}
                          className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 "
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const currentSubcategories =
                              getValues("subCategories") || [];

                            if (isChecked) {
                              setValue(
                                "subCategories",
                                [...currentSubcategories, subCategory._id],
                                {
                                  shouldValidate: true,
                                }
                              );

                              clearErrors("subCategories");
                            } else {
                              setValue(
                                "subCategories",
                                currentSubcategories.filter(
                                  (id) => id !== subCategory._id
                                ),
                                { shouldValidate: true }
                              );
                            }

                            trigger("subCategories");
                          }}
                        />
                        <span>{subCategory.name}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No subCategories found, create once</p>
                )}
              </div>
            </div>
            <div className="h-6">
              {errors.subCategories &&
                allSubCategories.data &&
                allSubCategories.data.length > 0 && (
                  <p className="px-4 pt-[6px] text-xs text-red-600">
                    {errors.subCategories.message}
                  </p>
                )}
            </div>
          </div>

          <div className="space-y-4 border rounded-md p-4">
            <label className="text-3xl font-medium py-4">Sous-produits</label>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 border rounded-md p-4">
                <h3 className="text-2xl font-bold">Sous-produit {index + 1}</h3>
                <ImageUpload
                  register={register}
                  errors={errors}
                  subProductIndex={index}
                />

                <div
                  className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
                >
                  <label className="text-lg">Couleur</label>
                  <Input {...register(`subProducts.${index}.color`)} />
                  {errors.subProducts?.[index]?.color && (
                    <p className="px-4 pt-[6px] text-xs ">
                      {errors.subProducts[index]?.color?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-lg">Tailles</label>
                  <div>
                    <SizeFields
                      control={control}
                      register={register}
                      subProductIndex={index}
                      errors={errors}
                      watch={watch}
                      productType="clothing"
                    />
                  </div>
                </div>

                {/* Discount */}
                <div
                  className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
                >
                  <label className="text-lg">Discount</label>
                  <Input
                    // {...register("discount")}
                    {...register(`subProducts.${index}.discount`)}
                    placeholder="Discount"
                    type="number"
                  />
                  {errors.category && (
                    <p className="px-4 pt-[6px] text-xs ">
                      {String(errors.category.message)}
                    </p>
                  )}
                </div>

                <Button
                  className="bg-red-600"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Supprimer le sous-produit
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                append({
                  // valeurs par defaut
                  images: [],
                  color: "",
                  sizes: [{ size: "", qty: "", price: "" }],
                  discount: 0,
                  sold: 0,
                })
              }
            >
              Ajouter un sous-produit
            </Button>
          </div>
        </div>

        {/* <Button fullWidth type="submit">
          Créer le produit
        </Button> */}

        <div className="flex gap-x-3 justify-end mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              handleModalClose();
            }}
          >
            Cancel
          </Button>
          <Button aria-label="OK" type="submit">
            Créer le produit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;

const ImageUpload = ({
  register,
  subProductIndex,
  errors,
}: {
  register: any;
  subProductIndex: number;
  errors: any;
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
    <div
      className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
    >
      <label className="text-lg">Images</label>
      <Input
        type="file"
        accept="image/*"
        {...register(`subProducts.${subProductIndex}.images` as const)}
        multiple
        onChange={handleImageChange}
      />
      {errors.subProducts?.[subProductIndex]?.images && (
        <p className="px-4 pt-[6px] text-xs ">
          {errors.subProducts[subProductIndex]?.images?.message}
        </p>
      )}

      {/* Afficher les aperçus des images */}
      <div className="image-preview-container">
        {imagePreviews.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index}`}
            className="w-20 h-20"
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
  watch,
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

  // Utiliser watch pour surveiller les valeurs des tailles
  const sizesValues = watch(`subProducts.${subProductIndex}.sizes`);

  const selectedSizes = sizesValues
    .map((field: any) => field.size)
    .filter((size: any) => size);

  return (
    <div className="space-y-4">
      {sizesFields.map((sizeField, sizeIndex) => (
        <div key={sizeField.id} className="flex flex-col gap-y-4">
          {/* Sélection des tailles */}

          <div
            className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
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
                <option
                  key={sizeOption}
                  value={sizeOption}
                  disabled={selectedSizes.includes(sizeOption)}
                >
                  {sizeOption}
                </option>
              ))}
              {/* {availableSizeOptions.map((sizeOption, index) => (
                <option key={index} value={sizeOption}>
                  {sizeOption}
                </option>
              ))} */}
            </select>

            {/* Affichage des erreurs pour la taille */}
            {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]
              ?.size && (
              <p className="px-4 pt-[6px] text-xs ">
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.size
                    .message
                }
              </p>
            )}
          </div>

          {/* Champ pour la quantité */}
          <div
            className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
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
              <p className="px-4 pt-[6px] text-xs ">
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.qty
                    .message
                }
              </p>
            )}
          </div>
          {/* Champ pour le prix */}
          <div
            className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
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
              <p className="px-4 pt-[6px] text-xs ">
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.price
                    .message
                }
              </p>
            )}
          </div>

          {/* Afficher l'erreur de taille si elle existe */}
          {/* {sizeError && <span className="text-red-500">{sizeError}</span>} */}

          {/* Bouton pour supprimer la taille */}

          <Button
            type="button"
            variant="destructive"
            onClick={() => removeSize(sizeIndex)}
            fullWidth
          >
            <span className="text-white">Supprimer</span>
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

"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "./product-schema";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/buttons/button/button";
import Modal from "@/components/ui/modals/modal";
import { useModal } from "@/context/modal/modal-context";
import { useRef, useState } from "react";
// import { productSchema } from "./validation-schemas"; // Importez le schéma

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
console.log("🚀 ~ sizeOptionsForProduct:", sizeOptionsForProduct);

const CreateProductForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[] | null>(null); //

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    trigger,
    clearErrors,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(productSchema), // Utilisez le schéma Zod
  });

  // Gestion dynamique des details et questions
  const {
    fields: detailsFields,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    name: "details",
  });

  const {
    fields: questionsFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  // Gestion dynamique des subProducts
  const {
    fields: subProductsFields,
    append: appendSubProduct,
    remove: removeSubProduct,
  } = useFieldArray({
    control,
    name: "subProducts",
  });

  // Gestion du submit du formulaire
  const onSubmit = (data: any) => {
    console.log("DATA", data);
  };

  const productType = watch("productType") as string;
  console.log("🚀 ~ CreateProductForm ~ productType:PTV", productType);

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

  const handleImageChange = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      const filesArray = Array.from(files);
      const imagesUrl = filesArray.map((file) => URL.createObjectURL(file));
      setValue("images", filesArray);
      clearErrors("images");
      setPreviewUrls(imagesUrl);
    } else {
      setPreviewUrls([]);
      setValue("images", []);
      clearErrors("images");
    }
  };

  return (
    <Modal
      title="Create your subcategory"
      onCloseModal={() => handleModalClose()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-h-[500px] overflow-y-auto scrollbar-hidden space-y-4 mb-5">
          {/* Sélection du type de produit */}
          <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
            <h1 className="text-2xl font-bold">
              Informations de base du produit
            </h1>

            <div
              // className="flex flex-col"
              className={`${errors.productType ? "text-red-600" : "text-black-200"}  flex flex-col`}
            >
              <label>Type de produit</label>
              <select
                {...register("productType", {
                  required: "Type de produit requis",
                })}
                className="px-3 py-2  h-10  rounded-md border w-full"
              >
                <option value="">Sélectionner un type de produit</option>
                <option value="clothing">Vêtements</option>
                <option value="shoes">Chaussures</option>
              </select>

              {/* Affichage des erreurs de type de produit */}
              {errors.productType && (
                <p className="px-4 pt-[6px] text-xs ">
                  {String(errors.productType.message)}
                </p>
              )}
            </div>

            {/* Nom */}
            <div
              className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
            >
              <label>Nom du produit</label>
              <Input {...register("name")} placeholder="Nom" />

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
                  {String(errors.description.message)}
                </p>
              )}
            </div>

            {/* Catégorie */}
            <div
              className={`${errors.category ? "text-red-600" : "text-black-200"}  flex flex-col`}
            >
              <label>Catégorie</label>
              <Input {...register("category")} placeholder="Catégorie" />
              {errors.category && (
                <p className="px-4 pt-[6px] text-xs ">
                  {String(errors.category.message)}
                </p>
              )}
            </div>

            {/* Sous-catégories */}
            <div className="flex flex-col">
              <label>Sous-catégories</label>
              <Input
                {...register("subCategories")}
                placeholder="Sous-catégories"
              />
              {errors.subCategories && (
                <p className="px-4 pt-[6px] text-xs text-red-600">
                  {String(errors.subCategories.message)}
                </p>
              )}
            </div>
          </div>

          {/* Gestion dynamique des SubProducts */}
          <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
            <label className="text-2xl font-bold">SubProducts</label>
            {subProductsFields.map((subProduct, subProductIndex) => (
              <div
                key={subProduct.id}
                style={{ marginBottom: "20px" }}
                className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5"
              >
                {/* Couleur */}
                <div className="flex flex-col">
                  <label className="text-xl font-medium">Couleur</label>
                  <div className="flex gap-x-4">
                    <Input
                      {...register(
                        `subProducts.${subProductIndex}.color.color`
                      )}
                      placeholder="Couleur"
                    />
                    <Input
                      {...register(
                        `subProducts.${subProductIndex}.color.image`
                      )}
                      placeholder="URL de l'image de couleur"
                    />
                  </div>
                </div>

                {/* Gestion dynamique des Sizes */}
                <div>
                  <label className="text-xl font-medium">Tailles</label>
                  <div>
                    {/* Gestion dynamique des tailles pour chaque SubProduct */}
                    <SizeFields
                      control={control}
                      register={register}
                      subProductIndex={subProductIndex}
                      errors={errors}
                      productType={productType} // On passe le productType ici
                    />
                  </div>
                </div>

                {/* Discount */}
                <div className="flex flex-col">
                  <label className="text-xl font-medium">Discount</label>
                  <Input
                    {...register("discount")}
                    placeholder="Discount"
                    type="number"
                  />
                  {errors.category && (
                    <p className="px-4 pt-[6px] text-xs text-red-600">
                      {String(errors.category.message)}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={() => removeSubProduct(subProductIndex)}
                >
                  Supprimer ce subProduct
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                appendSubProduct({
                  sku: "",
                  images: [{ url: "", public_url: "" }],
                  color: { color: "", image: "" },
                  sizes: [],
                })
              }
            >
              Ajouter un SubProduct
            </Button>
          </div>
        </div>

        <Button type="submit">Créer le produit</Button>
      </form>
    </Modal>
  );
};

export default CreateProductForm;

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

// export default SizeFields;

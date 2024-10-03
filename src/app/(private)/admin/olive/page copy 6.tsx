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
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
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
  // Conversion explicite vers unknown, puis vers string
  // const productType = watch("productType") as unknown as string;
  const productType = watch("productType") as string;
  console.log("🚀 ~ CreateProductForm ~ productType:PTV", productType);

  // Options de tailles dynamiques en fonction du type de produit
  // const sizeOptionsForProduct = productType ? getSizeOptions(productType) : [];
  // console.log(
  //   "🚀 ~ CreateProductForm ~ sizeOptionsForProduct:SIZE",
  //   sizeOptionsForProduct
  // );

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

          {/* Détails */}
          {/* <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
            <label className="text-2xl font-bold">Détails du produit</label>
            <div className="space-y-5">
              {detailsFields.map((item, index) => (
                <div key={item.id} className="flex gap-x-4">
                  <Input
                    {...register(`details.${index}.name`)}
                    placeholder="Nom du détail"
                  />
                  <Input
                    {...register(`details.${index}.value`)}
                    placeholder="Valeur"
                  />
                  <Button type="button" onClick={() => removeDetail(index)}>
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={() => appendDetail({ name: "", value: "" })}
            >
              Ajouter un détail
            </Button>
          </div> */}

          {/* Questions fréquentes */}
          {/* <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
            <label className="text-2xl font-bold">Questions fréquentes</label>
            <div className="space-y-5"></div>
            {questionsFields.map((item, index) => (
              <div key={item.id} className="flex gap-x-4">
                <Input
                  {...register(`questions.${index}.question`)}
                  placeholder="Question"
                />
                <Input
                  {...register(`questions.${index}.answer`)}
                  placeholder="Réponse"
                />
                <Button type="button" onClick={() => removeQuestion(index)}>
                  Supprimer
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendQuestion({ question: "", answer: "" })}
            >
              Ajouter une question
            </Button>
          </div> */}

          {/* Gestion dynamique des SubProducts */}
          <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
            <label className="text-2xl font-bold">SubProducts</label>
            {subProductsFields.map((subProduct, subProductIndex) => (
              <div
                key={subProduct.id}
                style={{ marginBottom: "20px" }}
                className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5"
              >
                {/* SKU */}
                {/* <div>
                  <label className="text-xl font-medium">SKU</label>
                  <Input
                    {...register(`subProducts.${subProductIndex}.sku`)}
                    placeholder="SKU"
                  />

                  {Array.isArray(errors.subProducts) &&
                    errors.subProducts[subProductIndex]?.sku && (
                      <span>
                        {errors.subProducts[subProductIndex]?.sku?.message}
                      </span>
                    )}
                </div> */}

                {/* Images */}
                {/* <div className="flex flex-col">
                  <label className="text-xl font-medium">Images</label>
                  <div className="flex gap-x-4">
                    <Input
                      {...register(
                        `subProducts.${subProductIndex}.images[0].url`
                      )}
                      placeholder="URL de l'image"
                    />
                    <Input
                      {...register(
                        `subProducts.${subProductIndex}.images[0].public_url`
                      )}
                      placeholder="URL publique de l'image"
                    />
                  </div>
                </div> */}

                {watch("subProducts").map(
                  (subProduct: any, subProductIndex: any) => (
                    <div key={subProductIndex} className="mb-6">
                      <h3 className="text-2xl">
                        SubProduct {subProductIndex + 1}
                      </h3>

                      {/* Utilisation de ImageUploader */}
                      <Controller
                        control={control}
                        name={`subProducts.${subProductIndex}.images`}
                        render={({ field }) => (
                          <ImageUploader
                            subProductIndex={subProductIndex} // Passage de l'index
                            register={register}
                            setValue={setValue} // Utilisé pour mettre à jour les fichiers sélectionnés
                          />
                        )}
                      />

                      {/* Ajoutez d'autres champs de formulaire ici, comme les tailles, les couleurs, etc. */}
                    </div>
                  )
                )}

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

import { useState } from "react";

const ImageUploader = ({ subProductIndex, register, setValue }: any) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return; // Vérification pour s'assurer qu'il y a des fichiers

    // Parcourir les fichiers sélectionnés pour générer des URL de prévisualisation
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string; // Cast en string, car FileReader.result retourne string | ArrayBuffer
        setValue(`subProducts.${subProductIndex}.images.${index}.file`, file); // Fichier associé
        setValue(
          `subProducts.${subProductIndex}.images.${index}.preview_url`,
          result
        ); // URL de prévisualisation

        // Mettre à jour le tableau de prévisualisations
        setPreviewUrls((prev) => [...prev, result]);
      };

      reader.readAsDataURL(file); // Convertit le fichier en Data URL
    });
  };

  return (
    <div className="flex flex-col">
      <label className="text-xl font-medium">Images</label>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        placeholder="Sélectionner des images"
      />

      {/* Prévisualisation des images */}
      <div className="flex gap-x-4 mt-4">
        {previewUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Preview ${index}`}
            className="w-20 h-20 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

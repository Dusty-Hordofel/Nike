"use client";
import React, { useRef, useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/buttons/button/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";
import { useGetSubCategoriesByParent } from "@/hooks/admin/use-admin-subcategories.hook";
import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modals/modal";
import { useModal } from "@/context/modal/modal-context";
import ImageUpload from "./components/Image-upload";
import SizeFields from "./components/size-fields";
import { ProductFormData, productSchema } from "./product-schema";

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

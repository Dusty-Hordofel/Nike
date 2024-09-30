"use client";
import { Item } from "@/@types/admin/admin.item.interface";
import DynamicFormField from "@/components/ui/forms/dynamic-form-field/dynamic-form-field";
import Loader from "@/components/ui/loader";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";
import { useGetSubCategoriesByParent } from "@/hooks/admin/use-admin-subcategories.hook";
import {
  SubCategorySchema,
  SubCategoryFormData,
  ProductFormData,
  ProductSchema,
} from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useForm, setResolver } from "react-hook-form";

type Props = {};

const PageProducts = (props: Props) => {
  const [validSubCategories, setValidSubCategories] = useState<Item[] | []>([]);
  console.log("🚀 ~ PageProducts ~ validSubCategories:", validSubCategories);

  const categories = useAdminGetCategories();
  console.log("🚀 ~ PageProducts ~ categories:CAT", categories.data);

  // Utiliser 'watch' pour surveiller les changements de la catégorie

  // Récupérer la catégorie sélectionnée

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema(categories.data, validSubCategories)), // Utiliser l'état des sous-catégories
  });

  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subcategory");
  console.log("🚀 ~ PageProducts ~ selectedCategory:SECAT", selectedCategory);
  // Hook pour récupérer les sous-catégories basées sur la catégorie sélectionnée
  const subCategories = useGetSubCategoriesByParent(selectedCategory, true);
  console.log("🚀 ~ PageProducts ~ subCategories:SUB", subCategories.data);

  useEffect(() => {
    if (subCategories.data && subCategories.data.length > 0) {
      setValidSubCategories(subCategories.data); // Mettre à jour les sous-catégories si elles sont chargées
      setValue("subcategory", ""); // Réinitialiser la sous-catégorie
      trigger("subcategory"); // Valider le champ sous-catégorie
    } else {
      setValidSubCategories([]); // Réinitialiser si aucune sous-catégorie
      setValue("subcategory", ""); // Vider la sous-catégorie
    }
  }, [subCategories.data, setValue, trigger]);

  // Ne déclenche la validation que lorsque la catégorie change
  useEffect(() => {
    if (selectedCategory) {
      trigger("subcategory"); // Forcer la validation de la sous-catégorie quand une catégorie est sélectionnée
    }
  }, [selectedCategory, trigger]);

  // const handleProductSubmit = (data) => {
  //   console.log("Produit soumis :", data);
  // };

  // useEffect(() => {
  //   if (subCategories.data && subCategories.data.length > 0) {
  //     setValidSubCategories(subCategories.data); // Mettre à jour l'état si des sous-catégories sont chargées
  //     setValue("subcategory", ""); // Réinitialiser la sous-catégorie
  //     trigger(["subcategory"]); // Déclencher la validation
  //   } else {
  //     setValidSubCategories([]); // Réinitialiser si aucune sous-catégorie
  //   }
  // }, [subCategories.data, setValue, trigger]);

  // // Revalider le champ lorsque la sous-catégorie change
  // useEffect(() => {
  //   if (selectedSubCategory) {
  //     trigger("subcategory"); // Déclencher la validation après la sélection d'une sous-catégorie
  //   }
  // }, [selectedSubCategory, trigger]);

  // const handleProductSubmit = (data) => {
  //   console.log("Produit soumis :", data);
  // };

  if (categories.isLoading)
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );
  // || subCategories.isError
  if (categories.isError) {
    console.log("Error", subCategories.error);
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {categories.error?.message}</h1>
        </div>
      </div>
    );
  }
  const handleProductSubmit = (data: ProductFormData) => {
    console.log("🚀 ~ handleProductSubmit ~ data:SUBMIT", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleProductSubmit)}>
        <DynamicFormField
          inputType="select"
          label="Category"
          register={register}
          errors={errors}
          name="category"
          selectProps={{
            disabled: false,
          }}
          options={categories.data}
        />
        <DynamicFormField
          inputType="select"
          label="Subcategory"
          register={register}
          errors={errors}
          name="subcategory"
          selectProps={{
            disabled: !subCategories.data?.length, // Désactiver si pas de sous-catégorie
          }}
          options={subCategories.data}
        />
        <button>Create a Product</button>
      </form>
      {errors.subcategory && (
        <span className="text-red-600">{errors.subcategory.message}</span>
      )}
    </>
  );
};

export default PageProducts;

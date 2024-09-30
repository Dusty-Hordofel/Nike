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
import { useState } from "react";
// import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {};

const PageProducts = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const categories = useAdminGetCategories();
  console.log("🚀 ~ PageProducts ~ categories:CAT", categories.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema), // Utiliser l'état des sous-catégories
  });

  // const selectedCategory = watch("category");
  // console.log("🚀 ~ PageProducts ~ selectedCategory:SELCAT", selectedCategory);
  // const subCategoriesData = useGetSubCategoriesByParent(selectedCategory, true);
  // console.log("🚀 ~ PageProducts ~ subCategories:SUBCAT", subCategories.data);
  // console.log("🚀 ~ PageProducts ~ subCategories:VALUE", getValues("category"));

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

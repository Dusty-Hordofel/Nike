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
import { useEffect, useRef, useState } from "react";
// import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};

const PageProducts = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    Item[] | [] | undefined
  >([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  console.log("🚀 ~ PageProducts ~ selectedCategory:CAT", selectedCategory);
  // console.log("🚀 ~ PageProducts ~ subCategories:SUB", subCategories);
  // getSubCategories
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // État pour stocker les aperçus des images
  console.log("🚀 ~ PageProducts ~ imagePreviews:", imagePreviews);

  // Observer la catégorie sélectionnée pour mettre à jour les sous-catégories
  // useEffect(() => {
  //   if (selectedCategory) {
  //     const subCategoriesData = useGetSubCategoriesByParent(selectedCategory);
  //     setSubCategories(subCategoriesData.data);
  //   }
  // }, [selectedCategory]);

  const categories = useAdminGetCategories();
  const subCategories = useGetSubCategoriesByParent(selectedCategory, true);
  console.log("🚀 ~ PageProducts ~ subCategories:SUBS", subCategories.data);

  // Utilisez useEffect pour gérer la sélection des catégories
  // useEffect(() => {
  //   if (selectedCategory) {
  //     // Déclenche la validation de la sous-catégorie lorsque la catégorie change
  //     trigger("subcategory");
  //   }
  // }, [selectedCategory, trigger]);

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

  const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
    try {
      const urls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUD_SECRET as string
        );

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
        urls.push(data.secure_url);
      }

      return urls;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<ProductFormData>= ~ data:",
      data
    );
    try {
      const imageUrls = await uploadImagesToCloudinary(data.images);
      console.log("Uploaded Image URLs:CLOUDINARY IMAGES", imageUrls);

      // Envoyer imageUrls au backend
      // await yourBackendService.uploadImages(imageUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // const onSubmit: SubmitHandler<ProductFormData> = (data) => {
  //   console.log("DATA MOMO", data);
  // };

  const handleImageChange = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      const filesArray = Array.from(files); // Convertir FileList en tableau
      setValue("images", filesArray); // Mettre à jour les images dans le formulaire

      // Créer des prévisualisations
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews); // Mettre à jour l'état des aperçus
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* <label htmlFor="category">Category</label> */}
        <select
          id="category"
          {...register("category")}
          onChange={async (e) => {
            const value = e.target.value;
            setSelectedCategory(value);
            setValue("category", value);
            setValue("subcategory", ""); // Réinitialiser la sous-catégorie

            // await trigger("category");
            // await trigger("subcategory"); // Déclencher la validation après la réinitialisation
            await trigger(["category", "subcategory"]);
          }}
        >
          <option value="">Select a category</option>
          {categories.data?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div>
        {/* <label htmlFor="subcategory">Subcategory</label> */}
        <select
          id="subcategory"
          {...register("subcategory")}
          onChange={async (e) => {
            const value = e.target.value;
            setValue("subcategory", value);
            await trigger("subcategory");
          }}
          disabled={!subCategories.data || subCategories.data.length === 0}
        >
          <option value="">
            {subCategories.data && subCategories.data.length > 0
              ? "Select a subcategory"
              : "No subcategories found"}
          </option>
          {subCategories.data &&
            subCategories.data.length > 0 &&
            subCategories.data.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
        </select>

        {/* <div>
          <label htmlFor="images">Select images</label>
          <input
            type="file"
            id="images"
            {...register("images")}
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.images && <p>{errors.images.message}</p>}{" "}
        </div> */}

        {errors.subcategory &&
          subCategories.data &&
          subCategories.data.length > 0 && <p>{errors.subcategory.message}</p>}
      </div>

      <div>
        <label htmlFor="images">Select images</label>
        <input
          type="file"
          id="images"
          ref={(e) => {
            fileInputRef.current = e; // Associe la référence à l'élément
            register("images").ref(e); // Enregistre le champ avec react-hook-form
          }}
          multiple
          accept="image/*"
          onChange={handleImageChange} // Gérer le changement ici
        />
        {errors.images && <p>{errors.images.message}</p>}{" "}
        {/* Affiche le message d'erreur */}
      </div>

      {imagePreviews.length > 0 && (
        <div className="image-previews">
          <h3>Image Previews:</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }} // Style pour les images
              />
            ))}
          </div>
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default PageProducts;

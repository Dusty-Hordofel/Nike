"use client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";
// import { useGetSubCategoriesByParent } from "@/hooks/admin/use-admin-subcategories.hook";
// import Modal from "@/components/ui/modals/modal";
// import { useModal } from "@/context/modal/modal-context";
import { ProductFormData, productSchema } from "./product-schema";
import { useModal } from "@/context/modal/modal-context";
import { uploadImageToCloudinary } from "./components/upload-image-to-cloudinary";
import { useAdminCreateProduct } from "@/hooks/admin/use-admin-products.hook";
// import { uploadImageToCloudinary } from "./components/upload-image-to-cloudinary";
// import { useAdminCreateProduct } from "@/hooks/admin/use-admin-products.hook";
// import { AddItemButton } from "@/components/ui/item";
// import CreatePoductForm from "./create-product-form";
// import QueryStatus from "./query-status";

type Props = {};

const useProductForm = () => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  //   const { handleSubmit, reset } = form;

  //   const { fields, append, remove } = useFieldArray({
  //     control,
  //     name: "subProducts",
  //   });

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

  const modal = useModal();

  const handleResponse = (response: any, isUpdate = false) => {
    if (response.success) {
      handleModalClose(isUpdate);
      modal.setResultModalContent({ success: true, message: response.message });
      modal.showResultModal();
    } else {
      modal.setResultModalContent({
        success: false,
        message: `An error occurred: ${response.message}`,
      });
      handleModalClose(isUpdate);
      modal.showResultModal();
    }
  };

  const createProduct = useAdminCreateProduct();

  const onSubmit = async (data: ProductFormData) => {
    console.log("DATASSS", data);

    const updatedSubProducts = await Promise.all(
      data.subProducts.map(async (subProduct) => {
        if (subProduct.images && subProduct.images.length > 0) {
          const uploadedImageUrls = await Promise.all(
            [...subProduct.images].map(
              async (file: File) => await uploadImageToCloudinary(file)
            )
          );
          console.log(
            "🚀 ~ data.subProducts.map ~ uploadedImageUrls:IMAGES UPLOADED",
            uploadedImageUrls
          );
          return {
            ...subProduct,
            color: {
              color: subProduct.color,
              image: uploadedImageUrls[0].url,
            },
            images: uploadedImageUrls,
          };
        }

        return subProduct;
      })
    );

    // Envoyer les données finales au backend
    const productData = {
      ...data,
      subProducts: updatedSubProducts,
    };

    const newProduct = await createProduct.mutateAsync(productData);
    console.log("🚀 ~ onSubmit ~ newProduct:FE P", newProduct);

    handleResponse(newProduct);
  };

  const handleModalClose = (isUpdate = false) => {
    form.reset();
    isUpdate ? modal.setUpdateModalOpen(false) : modal.closeCreateModal();
  };

  //   const productType = form.watch("productType") as string;
  //   console.log("🚀 ~ ProductForm ~ productType:CLOTHES", productType);

  return {
    // fields,
    // append,
    // remove,
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    createProduct,
    handleModalClose,
    isCreateModalOpen,
    isResultModalOpen,
    isUpdateModalOpen,
    // productType,
  };
};

export default useProductForm;

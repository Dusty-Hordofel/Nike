"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "./product-schema";
import { useModal } from "@/context/modal/modal-context";
import { uploadImageToCloudinary } from "./components/upload-image-to-cloudinary";
import {
  useAdminCreateProduct,
  useAdminUpdateProduct,
} from "@/hooks/admin/use-admin-products.hook";
import { ISubProduct } from "@/models/Product";

const useProductForm = () => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

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
    setEntityToEdit,
    resultModalContent,
    openModal,
    closeModal,
    isModalOpen,
    formMode,
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
  const updateCategory = useAdminUpdateProduct();

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
    setEntityToEdit(null);
    isUpdate ? modal.setUpdateModalOpen(false) : modal.closeCreateModal();
  };

  useEffect(() => {
    if (entityToEdit) {
      form.reset({
        name: entityToEdit.name || "",
        description: entityToEdit.description || "",
        category: entityToEdit.category || "",
        subCategories: entityToEdit.subCategories || [],
        productType: entityToEdit.productType || "",
        shipping: entityToEdit.shipping || 0,
        subProducts:
          entityToEdit.subProducts.map((subproduct: ISubProduct) => ({
            ...subproduct,
            color: subproduct.color.color,
          })) || [],
      });
    }
  }, [entityToEdit, form.reset]);

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    createProduct,
    handleModalClose,
    isCreateModalOpen,
    isResultModalOpen,
    isUpdateModalOpen,
    entityToEdit,
  };
};

export default useProductForm;

"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "../components/product-schema";
import { useModal } from "@/context/modal/modal-context";
import { uploadImageToCloudinary } from "../components/upload-image-to-cloudinary";
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
    showResultModal,
    setResultModalContent,
    closeModal,
    formMode,
  } = useModal();

  const handleResponse = (response: any) => {
    if (response.success) {
      handleModalClose();
      setResultModalContent({ success: true, message: response.message });
      showResultModal();
    } else {
      setResultModalContent({
        success: false,
        message: `An error occurred: ${response.message}`,
      });
      handleModalClose();
      showResultModal();
    }
  };

  const createProduct = useAdminCreateProduct();
  const updateProduct = useAdminUpdateProduct();

  const isFileList = (images: any): images is FileList => {
    return images instanceof FileList && images.length > 0;
  };

  const handleProductSubmit = async (data: ProductFormData) => {
    if (formMode === "create") {
      try {
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
        console.log("🚀 ~ onSubmit ~ newProduct:NEW PRODUCT ", newProduct);

        handleResponse(newProduct);
      } catch (error) {
        console.error("Erreur lors de la création du produit.", error);
      }
    } else if (formMode === "update" && entityToEdit) {
      const updatedSubProducts = await Promise.all(
        data.subProducts.map(async (subProduct, index) => {
          console.log("REGARDE", subProduct.images);
          console.log("REGARDE2", Array.isArray(subProduct.images));

          if (isFileList(subProduct.images)) {
            // Upload new images if a valid FileList is provided
            const uploadedImageUrls = await Promise.all(
              Array.from(subProduct.images).map(
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
                image: uploadedImageUrls[0]?.url || "",
              },
              images: uploadedImageUrls,
            };
          } else if (entityToEdit) {
            // Use existing images from entityToEdit if no new images are provided
            const existingSubProduct = entityToEdit.subProducts[index];
            return {
              ...subProduct,
              images: existingSubProduct?.images || [],
              color: existingSubProduct?.color || subProduct.color,
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
      const updatedProduct = await updateProduct.mutateAsync({
        id: entityToEdit._id,
        ...productData,
      });
      console.log(
        "🚀 ~ handleProductSubmit ~ updatedProduct:UPDATE",
        updatedProduct
      );
      handleResponse(updatedProduct);
    }
  };

  const handleModalClose = () => {
    form.reset();
    closeModal();
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
    handleSubmit: form.handleSubmit(handleProductSubmit),
    createProduct,
    handleModalClose,
    isCreateModalOpen,
    isResultModalOpen,
    isUpdateModalOpen,
    entityToEdit,
  };
};

export default useProductForm;

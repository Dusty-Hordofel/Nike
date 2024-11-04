"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/context/modal/modal-context";
import {
  useAdminCreateProduct,
  useAdminUpdateProduct,
} from "@/hooks/admin/products/use-admin-products.hook";
import { deleteImageFromCloudinary } from "@/services/admin/images.service";
import {
  ProductFormData,
  ProductSchema,
} from "@/schemas/products/product.schema";
import { uploadImageToCloudinary } from "@/app/(private)/admin/products/components/upload-image-to-cloudinary";
import { SubProduct } from "@/@types/admin/admin.products.interface";
import { colors } from "@/schemas/products/subproduct.schema";

const useProductForm = () => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
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
    isModalOpen,
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
    // const selectedColor = colors.find(color => color.hexCode === data.color);
    console.log("🚀 ~ handleProductSubmit ~ data:TOTO", data);
    if (formMode === "create") {
      try {
        const updatedSubProducts = await Promise.all(
          data.subProducts.map(async (subProduct) => {
            const selectedColor = colors.find(
              (color) => color.hexCode === subProduct.color
            );

            if (subProduct.images && subProduct.images.length > 0) {
              const uploadedImageUrls = await Promise.all(
                [...subProduct.images].map(
                  async (file: File) => await uploadImageToCloudinary(file)
                )
              );

              return {
                ...subProduct,
                color: {
                  name: selectedColor?.name,
                  hexCode: selectedColor?.hexCode,
                  image: uploadedImageUrls[0].url,
                },
                images: uploadedImageUrls,
              };
            }

            return subProduct;
          })
        );

        const productData = {
          ...data,
          subProducts: updatedSubProducts,
        };

        const newProduct = await createProduct.mutateAsync(productData);

        handleResponse(newProduct);
      } catch (error) {
        console.error("Erreur lors de la création du produit.", error);
      }
    } else if (formMode === "update" && entityToEdit) {
      const updatedSubProducts = await Promise.all(
        data.subProducts.map(async (subProduct, index) => {
          const selectedColor = colors.find(
            (color) => color.hexCode === subProduct.color
          );

          if (isFileList(subProduct.images)) {
            const uploadedImageUrls = await Promise.all(
              Array.from(subProduct.images).map(
                async (file: File) => await uploadImageToCloudinary(file)
              )
            );

            if (entityToEdit.subProducts[index]?.images.length > 0) {
              // const deleteImageUrls =
              await Promise.all(
                entityToEdit.subProducts[index].images.map(
                  async ({ public_id }: { public_id: string }) => {
                    if (public_id) deleteImageFromCloudinary(public_id);
                  }
                )
              );
            }

            return {
              ...subProduct,
              // color: {
              //   color: subProduct.color,
              //   image: uploadedImageUrls[0]?.url || "",
              // },
              color: {
                name: selectedColor?.name,
                hexCode: selectedColor?.hexCode,
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

      handleResponse(updatedProduct);
    }
  };

  const handleModalClose = () => {
    form.reset();
    closeModal();
  };

  useEffect(() => {
    if (entityToEdit) {
      console.log("🚀 ~ useEffect ~ entityToEditENTITY", entityToEdit);
      form.reset({
        name: entityToEdit.name || "",
        description: entityToEdit.description || "",
        category: entityToEdit.category || "",
        brand: entityToEdit.brand || "",
        subCategories: entityToEdit.subCategories || [],
        productType: entityToEdit.productType || "",
        shipping: entityToEdit.shipping || 0,
        subProducts:
          entityToEdit.subProducts.map((subproduct: SubProduct) => ({
            ...subproduct,
            color: subproduct.color.hexCode,
          })) || [],
      });
    }
  }, [entityToEdit, form.reset]);

  return {
    form,
    handleSubmit: form.handleSubmit(handleProductSubmit),
    createProduct,
    entityToEdit,
  };
};

export default useProductForm;
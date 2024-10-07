"use client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";
import { useGetSubCategoriesByParent } from "@/hooks/admin/use-admin-subcategories.hook";
import Modal from "@/components/ui/modals/modal";
import { useModal } from "@/context/modal/modal-context";
import { ProductFormData, productSchema } from "./product-schema";
import { uploadImageToCloudinary } from "./components/upload-image-to-cloudinary";
import { useAdminCreateProduct } from "@/hooks/admin/use-admin-products.hook";
import { AddItemButton } from "@/components/ui/item";
import CreatePoductForm from "./create-product-form";
import QueryStatus from "./query-status";

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subProducts",
  });

  const createProduct = useAdminCreateProduct();

  const handleResponse = (response: any, isUpdate = false) => {
    if (response.success) {
      handleModalClose(isUpdate);
      setResultModalContent({ success: true, message: response.message });
      showResultModal();
    } else {
      setResultModalContent({
        success: false,
        message: `An error occurred: ${response.message}`,
      });
      handleModalClose(isUpdate);
      showResultModal();
    }
  };

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
    reset();
    isUpdate ? setUpdateModalOpen(false) : closeCreateModal();
  };

  const productType = watch("productType") as string;

  return (
    <QueryStatus
      isLoading={categories.isLoading}
      isError={categories.isError}
      error={categories.error}
    >
      <div>
        {isCreateModalOpen && (
          <CreatePoductForm
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onCloseModal={handleModalClose}
            setSelectedCategory={setSelectedCategory}
            setValue={setValue}
            clearErrors={clearErrors}
            categories={categories}
            trigger={trigger}
            getValues={getValues}
            allSubCategories={allSubCategories}
            fields={fields}
            append={append}
            remove={remove}
            control={control}
            watch={watch}
            productType={productType}
            handleModalClose={handleModalClose}
            createProduct={createProduct}
          />
        )}

        {isResultModalOpen && resultModalContent && (
          <Modal
            title={resultModalContent.success ? "Success" : "Error"}
            onCloseModal={closeResultModal}
          >
            <p className="mb-4">{resultModalContent.message}</p>
          </Modal>
        )}

        <div
          data-testid="interests-layout"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AddItemButton onClick={showCreateModal} label="Add a Product" />
        </div>
      </div>
    </QueryStatus>
  );
};

export default ProductForm;

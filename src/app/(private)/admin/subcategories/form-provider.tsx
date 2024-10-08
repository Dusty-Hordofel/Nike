"use client";
import React from "react";
import { FormProvider } from "react-hook-form";
import useSubProductForm from "./use-subcategories-form";
import { EntityToEdit } from "@/context/modal/modal-context";

// interface ProductFormProviderProps {
//   children: (handleModalClose: () => void) => React.ReactNode; // Les enfants doivent être une fonction
// }

interface SubProductFormProviderProps {
  children: (props: {
    handleDeleteCategory: (id: string) => void;
    handleFileChange: any;
    handleButtonClick: any;
    previewUrl: any;
    fileInputRef: any;
    openModal: (mode: "create" | "update", item?: EntityToEdit) => void;
    closeModal: () => void;
    categories: any;
    subCategories: any;
  }) => React.ReactNode;
}

const SubcategoryFormProvider = ({ children }: SubProductFormProviderProps) => {
  const {
    form,
    handleDeleteCategory,
    handleSubmit,
    handleFileChange,
    handleButtonClick,
    previewUrl,
    fileInputRef,
    openModal,
    closeModal,
    categories,
    subCategories,
  } = useSubProductForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        {children({
          handleDeleteCategory,
          handleFileChange,
          handleButtonClick,
          previewUrl,
          fileInputRef,
          openModal,
          closeModal,
          categories,
          subCategories,
        })}
      </form>
    </FormProvider>
  );
};

export default SubcategoryFormProvider;

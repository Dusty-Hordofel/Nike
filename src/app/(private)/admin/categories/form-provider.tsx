"use client";
import React from "react";
import { FormProvider } from "react-hook-form";
import { EntityToEdit } from "@/context/modal/modal-context";
import useCategoryForm from "./use-category-form";

interface CategoryFormProviderProps {
  children: (props: {
    handleDeleteCategory: (id: string) => void;
    handleFileChange: any;
    handleButtonClick: any;
    previewUrl: any;
    fileInputRef: any;
    openModal: (mode: "create" | "update", item?: EntityToEdit) => void;
    closeModal: () => void;
    categories: any;
  }) => React.ReactNode;
}

const CategoryFormProvider = ({ children }: CategoryFormProviderProps) => {
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
  } = useCategoryForm();

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
        })}
      </form>
    </FormProvider>
  );
};

export default CategoryFormProvider;

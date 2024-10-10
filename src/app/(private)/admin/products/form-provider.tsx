"use client";
import React from "react";
import useProductForm from "./hooks/use-product-form";
import { FormProvider } from "react-hook-form";

// interface ProductFormProviderProps {
//   children: (handleModalClose: () => void) => React.ReactNode; // Les enfants doivent être une fonction
// }

interface ProductFormProviderProps {
  children: (props: {
    handleModalClose: () => void;
    createProduct: any;
    isCreateModalOpen: boolean;
    isResultModalOpen: boolean;
    isUpdateModalOpen: boolean;
    entityToEdit: any;
  }) => React.ReactNode; // Les enfants reçoivent un objet avec plusieurs propriétés
}

const ProductFormProvider = ({ children }: ProductFormProviderProps) => {
  const {
    form,
    handleSubmit,
    handleModalClose,
    createProduct,
    isCreateModalOpen,
    isResultModalOpen,
    isUpdateModalOpen,
    entityToEdit,
  } = useProductForm();
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        {children({
          handleModalClose,
          createProduct,
          isCreateModalOpen,
          isResultModalOpen,
          isUpdateModalOpen,
          entityToEdit,
        })}
      </form>
    </FormProvider>
  );
};

export default ProductFormProvider;

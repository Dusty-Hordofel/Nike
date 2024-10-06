"use client";
import React, { useState } from "react";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";
import { useGetSubCategoriesByParent } from "@/hooks/admin/use-admin-subcategories.hook";
import Modal from "@/components/ui/modals/modal";
import { useModal } from "@/context/modal/modal-context";
import { AddItemButton } from "@/components/ui/item";
import CreatePoductForm from "./create-product-form";
import QueryStatus from "./query-status";
import ProductFormProvider from "./form-provider";

const ProductForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = useAdminGetCategories();
  const allSubCategories = useGetSubCategoriesByParent(selectedCategory, true);

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

  return (
    <QueryStatus
      isLoading={categories.isLoading}
      isError={categories.isError}
      error={categories.error}
    >
      {isCreateModalOpen && (
        <ProductFormProvider>
          {({ handleModalClose, createProduct }) => (
            <Modal
              title="Create your Product"
              onCloseModal={() => handleModalClose()}
            >
              <CreatePoductForm
                onCloseModal={handleModalClose}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                allSubCategories={allSubCategories}
                handleModalClose={handleModalClose}
                createProduct={createProduct}
              />
            </Modal>
          )}
        </ProductFormProvider>
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
    </QueryStatus>
  );
};

export default ProductForm;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/ui/modals/modal";
import { CreateCategory } from "@/components/admin/categories";
import { AddItemButton, ItemList } from "@/components/ui/item";
import CategoryFormProvider from "./form-provider";
import useCategoryForm from "./use-category-form";
import QueryStatus from "../olive/query-status";

const CategoriesPage = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const pathname = usePathname();

  const activePage = pathname.split("/")[2] || "";
  const entity = activeEntity(activePage);

  function activeEntity(activePage: string) {
    switch (activePage) {
      case "categories":
        return "category";
      case "subCategories":
        return "subcategory";
      case "products":
        return "product";
      default:
        return "";
    }
  }

  if (!user /*&& userRole !== "user"*/) {
    router.push(`${window.location.origin}` || "/");
  }

  const { isResultModalOpen, resultModalContent, isModalOpen, formMode } =
    useModal();

  const {
    form,
    handleDeleteCategory,
    openModal,
    categories,
    closeResultModal,
  } = useCategoryForm();

  return (
    <QueryStatus
      isLoading={categories.isLoading}
      isError={categories.isError}
      error={categories.error}
    >
      {isModalOpen && (
        <CategoryFormProvider>
          {({
            handleFileChange,
            handleButtonClick,
            previewUrl,
            fileInputRef,
            closeModal,
          }) => {
            return (
              <Modal title="Create your subcategory" onCloseModal={closeModal}>
                <CreateCategory
                  onCloseModal={closeModal}
                  handleFileChange={handleFileChange}
                  handleButtonClick={handleButtonClick}
                  previewUrl={previewUrl}
                  fileInputRef={fileInputRef}
                />
              </Modal>
            );
          }}
        </CategoryFormProvider>
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
        <AddItemButton
          onClick={() => openModal("create")}
          label="Add a category"
        />

        <ItemList
          items={categories.data}
          onDeleteItem={handleDeleteCategory}
          openModal={openModal}
        />
      </div>
    </QueryStatus>
  );
};

export default CategoriesPage;

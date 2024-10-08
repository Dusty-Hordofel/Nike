"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/ui/modals/modal";
import { CreateSubCategory } from "@/components/admin/subcategories";
import { AddItemButton, ItemList } from "@/components/ui/item";
import QueryStatus from "../olive/query-status";
import SubcategoryFormProvider from "./form-provider";
import useSubProductForm from "./use-subcategories-form";

const SubCategoriesPage = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const pathname = usePathname();

  const activePage = pathname.split("/")[2] || "";
  // const entity = activeEntity(activePage);

  // function activeEntity(activePage: string) {
  //   switch (activePage) {
  //     case "categories":
  //       return "category";
  //     case "subCategories":
  //       return "subcategory";
  //     case "products":
  //       return "product";
  //     default:
  //       return "";
  //   }
  // }

  if (!user /*&& userRole !== "user"*/) {
    router.push(`${window.location.origin}` || "/");
  }

  const { categories, subCategories, deleteSubCategory } = useSubProductForm();

  const {
    isResultModalOpen,
    closeResultModal,
    resultModalContent,
    openModal,
    isModalOpen,
    formMode,
  } = useModal();

  const handleDeleteCategory = async (id: string) => {
    await deleteSubCategory.mutateAsync({ id });
  };

  return (
    <QueryStatus
      isLoading={categories.isLoading}
      isError={categories.isError}
      error={categories.error}
    >
      {isModalOpen && (
        <SubcategoryFormProvider>
          {({
            handleFileChange,
            handleButtonClick,
            previewUrl,
            fileInputRef,
            closeModal,
          }) => {
            return (
              <Modal title="Create your subcategory" onCloseModal={closeModal}>
                <CreateSubCategory
                  onCloseModal={closeModal}
                  handleFileChange={handleFileChange}
                  handleButtonClick={handleButtonClick}
                  previewUrl={previewUrl}
                  fileInputRef={fileInputRef}
                  options={categories.data}
                  formMode={formMode}
                />
              </Modal>
            );
          }}
        </SubcategoryFormProvider>
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
          label="Add a SubCategory"
        />

        {subCategories.data?.length && (
          <ItemList
            items={subCategories.data}
            onDeleteItem={handleDeleteCategory}
            openModal={openModal}
          />
        )}
      </div>
    </QueryStatus>
  );
};

export default SubCategoriesPage;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";
import { useModal } from "@/context/modal/modal.context";
import Modal from "@/components/ui/modals/modal";
import { CreateCategory } from "@/app/(private)/admin/categories/components";
import { AddItemButton, ItemList } from "@/components/ui/item";
import QueryStatus from "@/components/ui/query-status";
import CategoryFormProvider from "@/app/(private)/admin/categories/components/form-provider";
import useCategoryForm from "@/hooks/admin/categories/use-category-form.hook";
import Loader from "@/components/ui/loader";

const CategoriesPage = () => {
  const user = useCurrentUser();
  console.log("🚀 ~ CategoriesPage ~ user:CATO GOGO", user);

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

  // if (!user /*&& userRole !== "user"*/) {
  //   router.push(`${window.location.origin}` || "/");
  // }

  const { isResultModalOpen, resultModalContent, isModalOpen, formMode } =
    useModal();

  const {
    handleDeleteCategory,
    handleFileChange,
    handleButtonClick,
    closeResultModal,
    previewUrl,
    fileInputRef,
    openModal,
    closeModal,
    categories,
    deleteCategory,
  } = useCategoryForm();

  if (categories.isLoading || !categories.data)
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );

  return (
    // <QueryStatus
    //   isLoading={categories.isLoading}
    //   isError={categories.isError}
    //   error={categories.error}
    //   data={categories.data}
    // >
    <>
      {isModalOpen && (
        <CategoryFormProvider>
          <Modal title="Create your subcategory" onCloseModal={closeModal}>
            <CreateCategory
              onCloseModal={closeModal}
              handleFileChange={handleFileChange}
              handleButtonClick={handleButtonClick}
              previewUrl={previewUrl}
              fileInputRef={fileInputRef}
            />
          </Modal>
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
    </>
    // </QueryStatus>
  );
};

export default CategoriesPage;

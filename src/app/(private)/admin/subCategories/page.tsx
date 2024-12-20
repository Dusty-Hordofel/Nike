"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";
import Modal from "@/components/ui/modals/modal";
import { AddItemButton, ItemList } from "@/components/ui/item";
import useSubProductForm from "@/hooks/admin/sucategories/use-subcategories-form.hook";
import QueryStatus from "@/components/ui/query-status";
import SubcategoryFormProvider from "@/components/common/subproduct/form-provider";
import CreateSubCategory from "@/components/common/subproduct/create-subcategory";
import Loader from "@/components/ui/loader";

const SubCategoriesPage = () => {
  const router = useRouter();
  const user = useCurrentUser();
  console.log("🚀 ~ SubCategoriesPage ~ user:", user);
  const pathname = usePathname();

  // const activePage = pathname.split("/")[2] || "";
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

  // if (!user /*&& userRole !== "user"*/) {
  //   router.push(`${window.location.origin}` || "/");
  // }

  const {
    handleDeleteCategory,
    handleFileChange,
    handleButtonClick,
    previewUrl,
    fileInputRef,
    openModal,
    closeModal,
    categories,
    subCategories,
    isResultModalOpen,
    closeResultModal,
    resultModalContent,
    isModalOpen,
    formMode,
  } = useSubProductForm();

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
        <SubcategoryFormProvider>
          <Modal title="Create your subcategory" onCloseModal={closeModal}>
            <CreateSubCategory
              onCloseModal={closeModal}
              handleFileChange={handleFileChange}
              handleButtonClick={handleButtonClick}
              previewUrl={previewUrl}
              fileInputRef={fileInputRef}
              options={categories.data}
              formMode={formMode}
              user={user}
            />
          </Modal>
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
    </>
    // </QueryStatus>
  );
};

export default SubCategoriesPage;

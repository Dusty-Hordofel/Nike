"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SubCategorySchema, {
  CategoryFormData,
  CategorySchema,
  SubCategoryFormData,
} from "@/lib/validations/auth";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/modals/modal";
import useAdminCreateCategory from "@/hooks/api/admin/categories/use-admin-create-category";
import { useFileContext } from "@/context/file/file-context";
import { useAdminGetCategories } from "@/hooks/api/admin/categories/use-admin-get-categories";
import Loader from "@/components/loader";
import AddItemButton from "../add-Item-button";
import { useEffect } from "react";
import useAdminUpdateCategory from "@/hooks/api/admin/categories/use-admin-update-category";
import useAdminDeleteCategory from "@/hooks/api/admin/categories/use-admin-delete-category";
import CreateCategory from "../categories/create-category";
import UpdateCategory from "../categories/update-category";
import ItemList from "../categories/item-list";
import CreateSubCategory from "./create-subcategory";
import useAdminCreateSubCategory from "@/hooks/api/admin/subcategories/use-admin-create-category";
import useAdminUpdateSubCategory from "@/hooks/api/admin/subcategories/use-admin-update-category";
import useAdminDeleteSubCategory from "@/hooks/api/admin/subcategories/use-admin-delete-category";
import { useAdminGetSubCategories } from "@/hooks/api/admin/subcategories/use-admin-get-categories";
import UpdateSubCategory from "./update-subcategory";
// import ItemList from "./item-list";
// import UpdateCategory from "../update-category";
// import CreateCategory from "../create-category";

const SubCategoriesPage = () => {
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

  const createSubCategory = useAdminCreateSubCategory();
  const updateSubCategory = useAdminUpdateSubCategory();
  const categories = useAdminGetCategories();
  const subCategories = useAdminGetSubCategories();
  const deleteSubCategory = useAdminDeleteSubCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<SubCategoryFormData>({
    resolver: zodResolver(SubCategorySchema(categories.data)),
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

  const {
    handleFileChange,
    handleButtonClick,
    previewUrl,
    fileInputRef,
    uploadImageToCloudinary,
    setPreviewUrl,
    setPicture,
  } = useFileContext();

  useEffect(() => {
    if (entityToEdit) {
      setValue("subcategory", entityToEdit.name);
      setValue("parent", entityToEdit.parent as string);
      setPreviewUrl(entityToEdit.image);
    }
  }, [entityToEdit, setValue, setPreviewUrl]);

  const handleModalClose = (isUpdate = false) => {
    reset();
    setPreviewUrl(null);
    setPicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    isUpdate ? setUpdateModalOpen(false) : closeCreateModal();
  };

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

  const handleImageUpload = async (file: any) => {
    if (file && file.length > 0) {
      const uploadedImage = await uploadImageToCloudinary();
      return uploadedImage.secure_url;
    }
    return "";
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteSubCategory.mutateAsync({ id });
  };

  const handleCreateSubCategorySubmit = async ({
    subcategory,
    file,
    parent,
  }: SubCategoryFormData) => {
    const imageUrl = await handleImageUpload(file);
    const newSubCategory = await createSubCategory.mutateAsync({
      name: subcategory,
      image: imageUrl,
      parent,
    });
    console.log("🚀 ~ SubCategoriesPage ~ newSubCategory:SUB", newSubCategory);
    handleResponse(newSubCategory);
  };

  const handleUpdateSubCategorySubmit = async ({
    subcategory,
    file,
    parent,
  }: SubCategoryFormData) => {
    if (!entityToEdit) return;
    const imageUrl = (await handleImageUpload(file)) || entityToEdit.image;
    const updatedCategory = await updateSubCategory.mutateAsync({
      id: entityToEdit.id,
      name: subcategory,
      image: imageUrl,
      parent,
    });
    handleResponse(updatedCategory, true);
  };

  if (categories.isLoading)
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );

  if (categories.isError)
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {categories.error?.message}</h1>
        </div>
      </div>
    );

  return (
    <div>
      {isCreateModalOpen && (
        <CreateSubCategory
          subCategoryTypeForm="Create"
          register={register}
          errors={errors}
          onSubmit={handleCreateSubCategorySubmit}
          onCloseModal={() => handleModalClose()}
          handleFileChange={handleFileChange}
          clearErrors={clearErrors}
          setValue={setValue}
          handleButtonClick={handleButtonClick}
          previewUrl={previewUrl}
          fileInputRef={fileInputRef}
          handleSubmit={handleSubmit}
          options={categories.data}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateSubCategory
          subCategoryTypeForm="Update"
          register={register}
          errors={errors}
          onSubmit={handleUpdateSubCategorySubmit}
          onCloseModal={() => handleModalClose(true)}
          handleFileChange={handleFileChange}
          clearErrors={clearErrors}
          setValue={setValue}
          handleButtonClick={handleButtonClick}
          previewUrl={previewUrl}
          fileInputRef={fileInputRef}
          handleSubmit={handleSubmit}
          options={categories.data}
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

      <div data-testid="interests-layout" className="grid grid-cols-3 gap-4">
        <AddItemButton onClick={showCreateModal} label="Add a SubCategory" />

        <ItemList
          items={subCategories.data}
          onDeleteItem={handleDeleteCategory}
          showUpdateModal={showUpdateModal}
        />
      </div>
    </div>
  );
};

export default SubCategoriesPage;

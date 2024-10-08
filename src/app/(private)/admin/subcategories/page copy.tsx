"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SubCategorySchema, SubCategoryFormData } from "@/lib/validations/auth";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/ui/modals/modal";
import { useFileContext } from "@/context/file/file-context";

import Loader from "@/components/ui/loader";
import { useEffect } from "react";

import {
  CreateSubCategory,
  UpdateSubCategory,
} from "@/components/admin/subcategories";
import { AddItemButton, ItemList } from "@/components/ui/item";
import {
  useAdminCreateSubCategory,
  useAdminDeleteSubCategory,
  useAdminGetSubCategories,
  useAdminUpdateSubCategory,
  useGetSubCategoriesByParent,
} from "@/hooks/admin/use-admin-subcategories.hook";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";

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
  const subCategories = useGetSubCategoriesByParent();
  console.log("🚀 ~ SubCategoriesPage ~ subCategories:", subCategories.data);
  const deleteSubCategory = useAdminDeleteSubCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    getValues,
  } = useForm<SubCategoryFormData>({
    resolver: zodResolver(SubCategorySchema(categories.data)),
  });

  // const {
  //   entityToEdit,
  //   isCreateModalOpen,
  //   isResultModalOpen,
  //   isUpdateModalOpen,
  //   showCreateModal,
  //   showResultModal,
  //   showUpdateModal,
  //   closeCreateModal,
  //   closeResultModal,
  //   setUpdateModalOpen,
  //   setResultModalContent,
  //   resultModalContent,
  // } = useModal();

  const {
    entityToEdit,
    // isCreateModalOpen,
    isResultModalOpen,
    // isUpdateModalOpen,
    // showCreateModal,
    // showResultModal,
    // showUpdateModal,
    // closeCreateModal,
    closeResultModal,
    resultModalContent,
    openModal,
    closeModal,
    isModalOpen,
    formMode,
  } = useModal();

  console.log("🚀 ~ SubCategoriesPage ~ entityToEdit:ENTITY", entityToEdit);

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
    if (entityToEdit && "parent" in entityToEdit) {
      setValue("subcategory", entityToEdit.name);
      setValue("parent", entityToEdit.parent?._id as string);
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
    if (entityToEdit && "image" in entityToEdit) {
      const imageUrl = (await handleImageUpload(file)) || entityToEdit.image;
      const updatedCategory = await updateSubCategory.mutateAsync({
        id: entityToEdit.id,
        name: subcategory,
        image: imageUrl,
        parent,
      });
      handleResponse(updatedCategory, true);
    }
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

      <div
        data-testid="interests-layout"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AddItemButton onClick={showCreateModal} label="Add a SubCategory" />

        {subCategories.data?.length && (
          <ItemList
            items={subCategories.data}
            onDeleteItem={handleDeleteCategory}
            showUpdateModal={showUpdateModal}
          />
        )}
      </div>
    </div>
  );
};

export default SubCategoriesPage;

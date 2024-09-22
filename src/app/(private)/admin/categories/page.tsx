"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "@/lib/validations/auth";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/ui/modals/modal";
import { useFileContext } from "@/context/file/file-context";
import Loader from "@/components/ui/loader";
import {
  useAdminCreateCategory,
  useAdminDeleteCategory,
  useAdminGetCategories,
  useAdminUpdateCategory,
} from "@/hooks/admin/categories";
import { CreateCategory, UpdateCategory } from "@/components/admin/categories";
import { AddItemButton, ItemList } from "@/components/ui/item";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
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
      setValue("category", entityToEdit.name);
      setPreviewUrl(entityToEdit.image);
    }
  }, [entityToEdit, setValue, setPreviewUrl]);

  const createCategory = useAdminCreateCategory();
  const updateCategory = useAdminUpdateCategory();
  const categories = useAdminGetCategories();
  const deleteCategory = useAdminDeleteCategory();

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
    await deleteCategory.mutateAsync({ id });
  };

  const handleCreateSubmit = async ({ category, file }: CategoryFormData) => {
    const imageUrl = await handleImageUpload(file);
    const newCategory = await createCategory.mutateAsync({
      name: category,
      image: imageUrl,
    });
    handleResponse(newCategory);
  };

  const handleUpdateSubmit = async ({ category, file }: CategoryFormData) => {
    if (!entityToEdit) return;
    const imageUrl = (await handleImageUpload(file)) || entityToEdit.image;
    const updatedCategory = await updateCategory.mutateAsync({
      id: entityToEdit.id,
      name: category,
      image: imageUrl,
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
        <CreateCategory
          categoryTypeForm="Create"
          register={register}
          errors={errors}
          onSubmit={handleCreateSubmit}
          onCloseModal={() => handleModalClose()}
          handleFileChange={handleFileChange}
          clearErrors={clearErrors}
          setValue={setValue}
          handleButtonClick={handleButtonClick}
          previewUrl={previewUrl}
          fileInputRef={fileInputRef}
          handleSubmit={handleSubmit}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateCategory
          register={register}
          errors={errors}
          onSubmit={handleUpdateSubmit}
          handleFileChange={handleFileChange}
          clearErrors={clearErrors}
          setValue={setValue}
          handleButtonClick={handleButtonClick}
          previewUrl={previewUrl}
          fileInputRef={fileInputRef}
          onCloseModal={() => handleModalClose(true)}
          handleSubmit={handleSubmit}
          categoryTypeForm="Update"
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
        <AddItemButton onClick={showCreateModal} label="Add a category" />

        <ItemList
          items={categories.data}
          onDeleteItem={handleDeleteCategory}
          showUpdateModal={showUpdateModal}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "@/lib/validations/auth";
import { usePathname, useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/user/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/modals/modal";
import { Button } from "@/components/ui/buttons/button/button";
import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
import useAdminCreateCategory from "@/hooks/api/admin/categories/use-admin-create-category";
import { useFileContext } from "@/context/file/file-context";
import { useAdminGetCategories } from "@/hooks/api/admin/categories/use-admin-get-categories";
import Loader from "@/components/loader";
import ItemCard from "../item-card";
import AddItemButton from "../add-Item-button";
import { useEffect } from "react";
import useAdminUpdateCategory from "@/hooks/api/admin/categories/use-admin-update-category";
// import ItemForm from "./entity-form";
import EntityForm from "./entity-form";
import useAdminDeleteCategory from "@/hooks/api/admin/categories/use-admin-delete-category";

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
    showCreateModal,
    closeCreateModal,
    showResultModal,
    closeResultModal,
    resultModalContent,
    setResultModalContent,
    isCreateModalOpen,
    isResultModalOpen,
    isUpdateModalOpen,
    setUpdateModalOpen,
    entityToEdit,
    openUpdateModal,
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
      setValue("category", entityToEdit.name); // Mettre à jour le champ 'category' avec la nouvelle valeur
      setPreviewUrl(entityToEdit.image); // Mettre à jour l'image de prévisualisation si nécessaire
    }
  }, [entityToEdit, setValue, setPreviewUrl]);

  console.log("🚀 ~ CategoriesPage ~ entityToEdit:CONTENT", entityToEdit);

  const createCategory = useAdminCreateCategory();
  const updateCategory = useAdminUpdateCategory();
  const categories = useAdminGetCategories();

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

  const onSubmit = async ({ category, file }: CategoryFormData) => {
    const imageUrl = await handleImageUpload(file);
    const newCategory = await createCategory.mutateAsync({
      name: category,
      image: imageUrl,
    });
    handleResponse(newCategory);
  };

  const onUpdateSubmit = async ({ category, file }: CategoryFormData) => {
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
        <Modal
          title={`Create your ${entity}`}
          onCloseModal={() => handleModalClose()}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <EntityForm
              entityTypeForm="Create"
              entityType="Category"
              register={register}
              errors={errors}
              onUpdateSubmit={onUpdateSubmit}
              onClose={() => handleModalClose()}
              handleFileChange={handleFileChange}
              clearErrors={clearErrors}
              setValue={setValue}
              handleButtonClick={handleButtonClick}
              previewUrl={previewUrl}
              fileInputRef={fileInputRef}
            />
          </form>
        </Modal>
      )}

      {isUpdateModalOpen && (
        <Modal
          title={`Update your ${entity}`}
          onCloseModal={() => setUpdateModalOpen(false)}
        >
          <form onSubmit={handleSubmit(onUpdateSubmit)}>
            <EntityForm
              entityTypeForm="Update"
              entityType="Category"
              register={register}
              errors={errors}
              onUpdateSubmit={onUpdateSubmit}
              onClose={() => setUpdateModalOpen(false)}
              handleFileChange={handleFileChange}
              clearErrors={clearErrors}
              setValue={setValue}
              handleButtonClick={handleButtonClick}
              previewUrl={previewUrl}
              fileInputRef={fileInputRef}
            />
          </form>
        </Modal>
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
        <AddItemButton onClick={showCreateModal} label="Add un category" />

        {categories.data.map(
          (category: { _id: string; name: string; image: string }) => (
            <ItemCard
              key={category._id}
              category={category}
              onClick={() =>
                openUpdateModal({
                  id: category._id,
                  name: category.name,
                  image: category.image,
                })
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;

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

import { CreateSubCategory } from "@/components/admin/subcategories";
import { AddItemButton, ItemList } from "@/components/ui/item";
import {
  useAdminCreateSubCategory,
  useAdminDeleteSubCategory,
  useAdminGetSubCategories,
  useAdminUpdateSubCategory,
  useGetSubCategoriesByParent,
} from "@/hooks/admin/use-admin-subcategories.hook";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";
import QueryStatus from "../olive/query-status";

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

  const createSubCategory = useAdminCreateSubCategory();
  const updateSubCategory = useAdminUpdateSubCategory();
  const categories = useAdminGetCategories();
  const subCategories = useGetSubCategoriesByParent();
  // console.log("🚀 ~ SubCategoriesPage ~ subCategories:", subCategories.data);
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

  const {
    entityToEdit,
    isResultModalOpen,
    showResultModal,
    setResultModalContent,
    closeResultModal,
    resultModalContent,
    openModal,
    closeModal,
    isModalOpen,
    formMode,
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
    if (entityToEdit && "parent" in entityToEdit) {
      setValue("subcategory", entityToEdit.name);
      setValue("parent", entityToEdit.parent?._id as string);
      setPreviewUrl(entityToEdit.image);
    }
  }, [entityToEdit, setValue, setPreviewUrl]);

  const handleModalClose = () => {
    reset();
    setPreviewUrl(null);
    setPicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    closeModal();
  };

  const handleResponse = (response: any) => {
    if (response.success) {
      handleModalClose();
      setResultModalContent({ success: true, message: response.message });
      showResultModal();
    } else {
      setResultModalContent({
        success: false,
        message: `An error occurred: ${response.message}`,
      });
      handleModalClose();
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

  const handleSubCategorySubmit = async ({
    subcategory,
    file,
    parent,
  }: SubCategoryFormData) => {
    const imageUrl = file ? await handleImageUpload(file) : entityToEdit?.image;

    if (formMode === "create") {
      try {
        const subCategory = await createSubCategory.mutateAsync({
          name: subcategory,
          image: imageUrl,
          parent,
        });
        handleResponse(subCategory);
      } catch (error) {
        console.error(
          "Erreur lors de la création de la sous-catégorie:",
          error
        );
      }
    } else if (formMode === "update" && entityToEdit) {
      try {
        const subCategory = await updateSubCategory.mutateAsync({
          id: entityToEdit.id,
          name: subcategory,
          image: imageUrl,
          parent,
        });
        handleResponse(subCategory);
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de la sous-catégorie:",
          error
        );
      }
    }
  };

  return (
    <QueryStatus
      isLoading={categories.isLoading}
      isError={categories.isError}
      error={categories.error}
    >
      {isModalOpen && (
        <CreateSubCategory
          register={register}
          errors={errors}
          onSubmit={handleSubCategorySubmit}
          onCloseModal={closeModal}
          handleFileChange={handleFileChange}
          clearErrors={clearErrors}
          setValue={setValue}
          handleButtonClick={handleButtonClick}
          previewUrl={previewUrl}
          fileInputRef={fileInputRef}
          handleSubmit={handleSubmit}
          options={categories.data}
          formMode={formMode}
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

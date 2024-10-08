"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SubCategorySchema, SubCategoryFormData } from "@/lib/validations/auth";
import { useModal } from "@/context/modal/modal-context";
import { useFileContext } from "@/context/file/file-context";

import { useEffect } from "react";

import {
  useAdminCreateSubCategory,
  useAdminDeleteSubCategory,
  useAdminUpdateSubCategory,
  useGetSubCategoriesByParent,
} from "@/hooks/admin/use-admin-subcategories.hook";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";

const useSubProductForm = () => {
  const createSubCategory = useAdminCreateSubCategory();
  const updateSubCategory = useAdminUpdateSubCategory();
  const categories = useAdminGetCategories();
  const subCategories = useGetSubCategoriesByParent();
  const deleteSubCategory = useAdminDeleteSubCategory();

  const form = useForm<SubCategoryFormData>({
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
      form.setValue("subcategory", entityToEdit.name);
      form.setValue("parent", entityToEdit.parent?._id as string);
      setPreviewUrl(entityToEdit.image);
    }
  }, [entityToEdit, form.setValue, setPreviewUrl]);

  const handleModalClose = () => {
    form.reset();
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

  return {
    form,
    handleDeleteCategory,
    // handleSubCategorySubmit,
    handleSubmit: form.handleSubmit(handleSubCategorySubmit),
    handleFileChange,
    handleButtonClick,
    previewUrl,
    fileInputRef,
    openModal,
    closeModal,
    categories,
    subCategories,
    deleteSubCategory,
  };
};

export default useSubProductForm;

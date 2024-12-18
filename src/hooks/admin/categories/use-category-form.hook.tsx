"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/context/modal/modal.context";
import { useFileContext } from "@/context/file/file.context";
import {
  useAdminCreateCategory,
  useAdminDeleteCategory,
  useAdminGetCategories,
  useAdminUpdateCategory,
} from "@/hooks/admin/categories/use-admin-categories.hook";
import {
  CategoryFormData,
  CategorySchema,
} from "../../../schemas/products/category.schema";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";

const useCategoryForm = () => {
  const user = useCurrentUser();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
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
    if (entityToEdit) {
      form.setValue("category", entityToEdit.name);
      setPreviewUrl(entityToEdit.image);
    }
  }, [form, entityToEdit, form.setValue, setPreviewUrl]);

  const createCategory = useAdminCreateCategory();
  const updateCategory = useAdminUpdateCategory();
  const categories = useAdminGetCategories();
  const deleteCategory = useAdminDeleteCategory();

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
    // permissions and authorizations will be managed by middleware
    if (
      !user ||
      (user && user._id !== process.env.NEXT_PUBLIC_ADMIN_ID) ||
      (user && user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)
    ) {
      alert(
        "You must be authenticated and have admin privileges to perform this CRUD operation."
      );
      return;
    }

    await deleteCategory.mutateAsync({ id });
  };

  const handleCategorySubmit = async ({ category, file }: CategoryFormData) => {
    // permissions and authorizations will be managed by middleware

    if (
      !user ||
      (user && user._id !== process.env.NEXT_PUBLIC_ADMIN_ID) ||
      (user && user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)
    ) {
      alert(
        "You must be authenticated and have admin privileges to perform this CRUD operation."
      );
      return;
    }

    const imageUrl = file ? await handleImageUpload(file) : entityToEdit?.image;

    if (formMode === "create") {
      try {
        const newCategory = await createCategory.mutateAsync({
          name: category,
          image: imageUrl,
        });
        handleResponse(newCategory);
      } catch (error) {
        console.error("Erreur lors de la création de la catégorie.", error);
      }
    } else if (formMode === "update" && entityToEdit) {
      try {
        const updatedCategory = await updateCategory.mutateAsync({
          id: entityToEdit.id,
          name: category,
          image: imageUrl,
        });
        handleResponse(updatedCategory);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie.", error);
      }
    }
  };

  return {
    form,
    handleDeleteCategory,
    handleSubmit: form.handleSubmit(handleCategorySubmit),
    handleFileChange,
    handleButtonClick,
    closeResultModal,
    previewUrl,
    fileInputRef,
    openModal,
    closeModal,
    categories,
    deleteCategory,
  };
};

export default useCategoryForm;

import React from "react";
import CategoryForm from "./category-form";
import { useFormContext } from "react-hook-form";
import { CategoryFormData } from "@/lib/validations/products/category";

const CreateCategory = ({
  handleFileChange,
  handleButtonClick,
  previewUrl,
  fileInputRef,
  onCloseModal,
}: any) => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext<CategoryFormData>();

  return (
    <CategoryForm
      register={register}
      errors={errors}
      onCloseModal={onCloseModal}
      handleFileChange={handleFileChange}
      clearErrors={clearErrors}
      setValue={setValue}
      handleButtonClick={handleButtonClick}
      previewUrl={previewUrl}
      fileInputRef={fileInputRef}
    />
  );
};

export default CreateCategory;

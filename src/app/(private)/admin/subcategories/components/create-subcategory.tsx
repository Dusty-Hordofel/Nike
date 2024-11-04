import React from "react";
import SubCategoryForm from "./subcategory-form";
import { useFormContext } from "react-hook-form";
import { SubCategoryFormData } from "@/schemas/products/subcategory.schema";

const CreateSubCategory = ({
  handleFileChange,
  handleButtonClick,
  previewUrl,
  fileInputRef,
  onCloseModal,
  formMode,
  options,
}: any) => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext<SubCategoryFormData>();

  return (
    <SubCategoryForm
      register={register}
      errors={errors}
      onCloseModal={onCloseModal}
      handleFileChange={handleFileChange}
      clearErrors={clearErrors}
      setValue={setValue}
      handleButtonClick={handleButtonClick}
      previewUrl={previewUrl}
      fileInputRef={fileInputRef}
      options={options}
      formMode={formMode}
    />
  );
};

export default CreateSubCategory;

import React from "react";
import { useFormContext } from "react-hook-form";
import { SubCategoryFormData } from "@/schemas/products/subcategory.schema";
import SubCategoryManagerForm from "./subcategory-manager-form";

const CreateSubCategory = ({
  handleFileChange,
  handleButtonClick,
  previewUrl,
  fileInputRef,
  onCloseModal,
  formMode,
  options,
}: // user,
any) => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext<SubCategoryFormData>();

  //SubCategoryManagerForm is old SubCategoryForm
  return (
    <SubCategoryManagerForm
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
      // user={user}
    />
  );
};

export default CreateSubCategory;

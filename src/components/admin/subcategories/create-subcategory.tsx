import React from "react";
// import CategoryForm from "./category-form";
import { CategoryFormProps } from "@/@types/admin/admin.categories.interface";
import Modal from "@/components/ui/modals/modal";
import CategoryForm from "../categories/category-form";
import SubCategoryForm from "./subcategory-form";
import { SubCategoryFormProps } from "@/@types/admin/admin.subcategories.interface";
import { SubCategoryFormData } from "@/lib/validations/auth";
import { useFormContext } from "react-hook-form";

type Props = {};
// CategoryFormProps
// register, errors, clearErrors, setValue
const CreateSubCategory = ({
  // register,
  // errors,
  handleFileChange,
  // clearErrors,
  handleButtonClick,
  // setValue,
  previewUrl,
  fileInputRef,
  // onSubmit,
  onCloseModal,
  // handleSubmit,
  formMode,
  // subCategoryTypeForm,
  options,
}: any) => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    getValues,
    setValue,
    clearErrors,
    trigger,
  } = useFormContext<SubCategoryFormData>();

  return (
    <SubCategoryForm
      // subCategoryTypeForm={subCategoryTypeForm}
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

import React from "react";
// import CategoryForm from "./category-form";
import { CategoryFormProps } from "@/@types/admin/admin.categories.interface";
import Modal from "@/components/ui/modals/modal";
import CategoryForm from "../categories/category-form";
import SubCategoryForm from "./subcategory-form";
import { SubCategoryFormProps } from "@/@types/admin/admin.subcategories.interface";

type Props = {};
// CategoryFormProps

const CreateSubCategory = ({
  register,
  errors,
  handleFileChange,
  clearErrors,
  handleButtonClick,
  setValue,
  previewUrl,
  fileInputRef,
  onSubmit,
  onCloseModal,
  handleSubmit,
  formMode,
  // subCategoryTypeForm,
  options,
}: SubCategoryFormProps) => {
  return (
    <Modal title="Create your subcategory" onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </Modal>
  );
};

export default CreateSubCategory;

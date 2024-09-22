import React from "react";
// import CategoryForm from "./category-form";
import { CategoryFormProps } from "@/@types/admin/admin.categories.interface";
import Modal from "@/components/modals/modal";
import CategoryForm from "../categories/category-form";
import SubCategoryForm from "./subcategory-form";

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
  subCategoryTypeForm,
  options,
}: any) => {
  return (
    <Modal title="Create your subcategory" onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SubCategoryForm
          subCategoryTypeForm={subCategoryTypeForm}
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
        />
      </form>
    </Modal>
  );
};

export default CreateSubCategory;

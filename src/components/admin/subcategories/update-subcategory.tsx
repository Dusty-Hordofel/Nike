import React from "react";
import Modal from "@/components/ui/modals/modal";
import SubCategoryForm from "./subcategory-form";
import { SubCategoryFormProps } from "@/@types/admin/admin.subcategories.interface";

const UpdateSubCategory = ({
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
}: SubCategoryFormProps) => {
  return (
    <Modal title="Update your subcategory" onCloseModal={onCloseModal}>
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

export default UpdateSubCategory;

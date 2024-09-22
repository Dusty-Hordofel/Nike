import React from "react";
import Modal from "@/components/modals/modal";
import SubCategoryForm from "./subcategory-form";

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
}: any) => {
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

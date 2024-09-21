import React from "react";
import CategoryForm from "./category-form";
import { CategoryFormProps } from "@/@types/admin/admin.interface";
import Modal from "@/components/modals/modal";

type Props = {};

const CreateCategory = ({
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
  categoryTypeForm,
}: CategoryFormProps) => {
  return (
    <Modal title="Create your Category" onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CategoryForm
          categoryTypeForm="Create"
          register={register}
          errors={errors}
          //   onUpdateSubmit={onUpdateSubmit}
          // onClose={onCloseModal}
          onCloseModal={onCloseModal}
          handleFileChange={handleFileChange}
          clearErrors={clearErrors}
          setValue={setValue}
          handleButtonClick={handleButtonClick}
          previewUrl={previewUrl}
          fileInputRef={fileInputRef}
        />
      </form>
    </Modal>
  );
};

export default CreateCategory;

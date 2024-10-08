import React from "react";
import CategoryForm from "./category-form";
import { CategoryFormProps } from "@/@types/admin/admin.categories.interface";
import Modal from "@/components/ui/modals/modal";
import { CategoryFormData } from "@/lib/validations/auth";
import { useFormContext } from "react-hook-form";

type Props = {};
// CategoryFormProps
const CreateCategory = ({
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
  // categoryTypeForm,
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
  } = useFormContext<CategoryFormData>();

  return (
    // <Modal title="Create your Category" onCloseModal={onCloseModal}>
    //   <form onSubmit={handleSubmit(onSubmit)}>
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
    //   </form>
    // </Modal>
  );
};

export default CreateCategory;

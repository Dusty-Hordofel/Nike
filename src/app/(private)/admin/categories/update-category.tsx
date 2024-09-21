import CategoryForm from "./category-form";
import Modal from "@/components/modals/modal";
import { CategoryFormProps } from "@/@types/admin/admin.interface";

const UpdateCategory = ({
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
    <Modal title="Update your Category" onCloseModal={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CategoryForm
          categoryTypeForm={categoryTypeForm}
          register={register}
          errors={errors}
          //   onUpdateSubmit={onUpdateSubmit}
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

export default UpdateCategory;

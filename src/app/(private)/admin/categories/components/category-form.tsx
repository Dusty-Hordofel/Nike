import DynamicFormField from "@/components/ui/forms/dynamic-form-field/dynamic-form-field";
import { Button } from "@/components/ui/buttons/button/button";

// Omit<CategoryFormProps, "handleSubmit" | "onSubmit">
const CategoryForm = ({
  register,
  errors,
  handleFileChange,
  clearErrors,
  handleButtonClick,
  setValue,
  previewUrl,
  fileInputRef,
  onCloseModal,
}: any) => {
  return (
    <>
      <DynamicFormField
        inputType="input"
        label="Category"
        name="category"
        register={register}
        errors={errors}
        inputProps={{
          type: "text",
          placeholder: "Category*",
          disabled: false,
        }}
      />

      <DynamicFormField
        inputType="file"
        label="Profile Picture"
        name="file"
        register={register}
        errors={errors}
        onFileChange={(event) => handleFileChange(event, setValue, clearErrors)}
        onButtonClick={handleButtonClick}
        fileProps={{
          previewUrl,
          fileInputRef: fileInputRef,
          disabled: false,
        }}
      />

      <div className="flex gap-x-3 justify-end mt-4">
        <Button type="button" variant="outline" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button aria-label="OK" type="submit">
          Save
        </Button>
      </div>
    </>
  );
};

export default CategoryForm;

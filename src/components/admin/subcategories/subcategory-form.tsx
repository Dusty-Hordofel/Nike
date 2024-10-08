import { SubCategoryFormProps } from "@/@types/admin/admin.subcategories.interface";
import DynamicFormField from "@/components/ui/forms/dynamic-form-field/dynamic-form-field";
import { Button } from "@/components/ui/buttons/button/button";

const SubCategoryForm = ({
  register,
  errors,
  handleFileChange,
  clearErrors,
  handleButtonClick,
  setValue,
  previewUrl,
  fileInputRef,
  onCloseModal,
  formMode,
  // subCategoryTypeForm,
  options,
}: Omit<SubCategoryFormProps, "handleSubmit" | "onSubmit">) => {
  return (
    <>
      <DynamicFormField
        inputType="input"
        label="Subcategory"
        name="subcategory"
        register={register}
        errors={errors}
        inputProps={{
          type: "text",
          placeholder: "Subcategory*",
          disabled: false,
        }}
      />

      <DynamicFormField
        inputType="select"
        label="Category"
        register={register}
        errors={errors}
        name="parent"
        selectProps={{
          disabled: false,
        }}
        options={options}
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
          {formMode === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </>
  );
};

export default SubCategoryForm;

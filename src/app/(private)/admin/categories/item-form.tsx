import React, { RefObject } from "react";
import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
import { Button } from "@/components/ui/buttons/button/button";
import { CategoryFormData } from "@/lib/validations/auth";
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

// const CategoryForm = ({
//   register,
//   handleSubmit,
//   onSubmit,
//   errors,
//   previewUrl,
//   fileInputRef,
//   handleFileChange,
//   clearErrors,
//   handleButtonClick,
//   onClose,
// }: any) => (
//   <form onSubmit={handleSubmit(onSubmit)}>
//     <DynamicFormField
//       inputType="input"
//       label="Category"
//       name="category"
//       register={register}
//       errors={errors}
//       inputProps={{
//         type: "text",
//         placeholder: "Category*",
//         disabled: false,
//       }}
//     />

//     <DynamicFormField
//       inputType="file"
//       label="Profile Picture"
//       name="file"
//       register={register}
//       errors={errors}
//       onFileChange={(event) => handleFileChange(event, setValue, clearErrors)}
//       onButtonClick={handleButtonClick}
//       fileProps={{
//         previewUrl,
//         fileInputRef: fileInputRef,
//         disabled: false,
//       }}
//     />

//     <div className="flex gap-x-3 justify-end mt-4">
//       <Button type="button" variant="outline" onClick={onClose}>
//         Cancel
//       </Button>
//       <Button aria-label="OK" type="submit">
//         Submit
//       </Button>
//     </div>
//   </form>
// );

interface ItemFormProps {
  onUpdateSubmit: ({ category, file }: CategoryFormData) => Promise<void>;
  onClose: () => void;
  fileInputRef?: RefObject<HTMLInputElement> | undefined;
  previewUrl?: any;
  className?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  fileProps?: any;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<any>,
    clearErrors: UseFormClearErrors<any>
  ) => void;
  clearErrors: UseFormClearErrors<{
    category: string;
    file?: any;
  }>;
  setValue: UseFormSetValue<{
    category: string;
    file?: any;
  }>;
  handleButtonClick: () => void;
  formType: "Create" | "Update";
  entityType: "Product" | "Category" | "SubCategory";
}

const ItemForm = ({
  register,
  errors,
  handleFileChange,
  clearErrors,
  handleButtonClick,
  setValue,
  previewUrl,
  fileInputRef,
  onClose,
  formType,
  entityType,
}: ItemFormProps) => {
  switch (formType) {
    case "Update":
      switch (entityType) {
        case "Category":
        case "SubCategory":
          return (
            <>
              <DynamicFormField
                inputType="input"
                label={entityType}
                name={entityType.toLocaleLowerCase()}
                register={register}
                errors={errors}
                inputProps={{
                  type: "text",
                  placeholder: `${entityType}*`,
                  disabled: false,
                  //   disabled: createCategory.isPending,
                }}
              />

              <DynamicFormField
                inputType="file"
                label="Profile Picture"
                name="file"
                register={register}
                errors={errors}
                onFileChange={(event) =>
                  handleFileChange(event, setValue, clearErrors)
                }
                onButtonClick={handleButtonClick}
                fileProps={{
                  previewUrl,
                  fileInputRef: fileInputRef,
                  disabled: false,
                }}
              />

              <div className="flex gap-x-3 justify-end mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  //   onClick={() => setUpdateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button aria-label="OK" type="submit">
                  Save
                </Button>
              </div>
            </>
          );
        default:
          console.log("Unknown entity for update");
      }
    default:
      console.log("Unknown form type");
  }
};

export default ItemForm;

import React, { RefObject } from "react";
import DynamicFormField from "@/components/ui/forms/dynamic-form-field/dynamic-form-field";
import { Button } from "@/components/ui/buttons/button/button";
import { CategoryFormData } from "@/lib/validations/auth";
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { CategoryFormProps } from "@/@types/admin/admin.categories.interface";

// interface CategoryFormProps {
//   onUpdateSubmit: ({ category, file }: CategoryFormData) => Promise<void>;
//   onClose: () => void;
//   fileInputRef?: RefObject<HTMLInputElement> | undefined;
//   previewUrl?: any;
//   className?: string;
//   register: UseFormRegister<any>;
//   errors: FieldErrors<FieldValues>;
//   fileProps?: any;
//   handleFileChange: (
//     event: React.ChangeEvent<HTMLInputElement>,
//     setValue: UseFormSetValue<any>,
//     clearErrors: UseFormClearErrors<any>
//   ) => void;
//   clearErrors: UseFormClearErrors<{
//     category: string;
//     file?: any;
//   }>;
//   setValue: UseFormSetValue<{
//     category: string;
//     file?: any;
//   }>;
//   handleButtonClick: () => void;
//   categoryTypeForm: "Create" | "Update";
// }

// export interface ItemWithId extends Omit<Item, "_id"> {
//   id: string;
// }
// Omit<CategoryFormProps, "handleSubmit onUpdateSubmit">
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
  categoryTypeForm,
}: Omit<CategoryFormProps, "handleSubmit" | "onSubmit">) => {
  switch (categoryTypeForm) {
    case "Update":
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
            <Button type="button" variant="outline" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button aria-label="OK" type="submit">
              Save
            </Button>
          </div>
        </>
      );

    case "Create":
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
            <Button type="button" variant="outline" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button aria-label="OK" type="submit">
              Create
            </Button>
          </div>
        </>
      );

    default:
      console.log("Unknown form type");
  }
};

export default CategoryForm;

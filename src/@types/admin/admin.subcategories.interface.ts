import { CategoryFormData, SubCategoryFormData } from "@/lib/validations/auth";
import { RefObject } from "react";
import {
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Item } from "./admin.item.interface";

// Fetch SubCategories

export interface FetchSubCategoriesResponse {
  success: boolean;
  error: boolean;
  subCategories: Item[] | [];
  message?: string;
}

// Form Types

export interface FileProps {
  previewUrl?: any;
  fileInputRef?: RefObject<HTMLInputElement>;
}

export interface FormHandlers {
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<any>,
    clearErrors: UseFormClearErrors<any>
  ) => void;
  handleButtonClick: () => void;
}

export interface SubCategoryFormProps extends FileProps, FormHandlers {
  onSubmit: ({
    subcategory,
    file,
    parent,
  }: SubCategoryFormData) => Promise<void>;
  handleSubmit: (
    onValid: SubmitHandler<{
      subcategory: string;
      parent: string;
      file?: any;
    }>,
    onInvalid?:
      | SubmitErrorHandler<{
          subcategory: string;
          parent: string;
          file?: any;
        }>
      | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  clearErrors: UseFormClearErrors<{
    subcategory: string;
    parent: string;
    file?: any;
  }>;
  setValue: UseFormSetValue<{
    subcategory: string;
    parent: string;
    file?: any;
  }>;
  subCategoryTypeForm: "Create" | "Update";
  onCloseModal: () => void;
  options: any;
}

// import { CategoryFormData } from "../../schemas/user/auth.schema";
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
import { CategoryFormData } from "@/schemas/products/category.schema";

// ITEMS LIST AND CARD

export interface FetchCategoriesResponse {
  success: boolean;
  error: boolean;
  categories: Item[] | [];
  message: string;
}

// FORM TYPES
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

export interface CategoryFormProps extends FileProps, FormHandlers {
  onSubmit: ({ category, file }: CategoryFormData) => Promise<void>;
  handleSubmit: (
    onValid: SubmitHandler<{
      category: string;
      file?: any;
    }>,
    onInvalid?:
      | SubmitErrorHandler<{
          category: string;
          file?: any;
        }>
      | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  clearErrors: UseFormClearErrors<{
    category: string;
    file?: any;
  }>;
  setValue: UseFormSetValue<{
    category: string;
    file?: any;
  }>;
  categoryTypeForm: "Create" | "Update";
  onCloseModal: () => void;
}

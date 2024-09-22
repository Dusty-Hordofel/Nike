import { CategoryFormData } from "@/lib/validations/auth";
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

// ITEMS LIST AND CARD
export interface Item {
  _id: string;
  name: string;
  image: string;
  parent?: { _id: string; name: string };
}

export interface ItemWithId extends Omit<Item, "_id"> {
  id: string;
}

export type ItemListProps = {
  items: Item[];
  onDeleteItem: (id: string) => void;
  showUpdateModal: (item: ItemWithId) => void;
};

export interface ItemCardProps {
  item: Item;
  onshowUpdateItemModal: (item: ItemWithId) => void;
  onDeleteItem: (id: string) => void;
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

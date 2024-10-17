import { IProduct } from "@/models/product.model";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ModalContextProps {
  isCreateModalOpen: boolean;
  isResultModalOpen: boolean;
  showCreateModal: () => void;
  closeCreateModal: () => void;
  showResultModal: () => void;
  closeResultModal: () => void;
  resultModalContent: {
    success: boolean;
    message: string;
  } | null;
  setResultModalContent: Dispatch<
    SetStateAction<{
      success: boolean;
      message: string;
    } | null>
  >;
  isUpdateModalOpen: boolean;
  setUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  entityToEdit: any | null;
  setEntityToEdit: Dispatch<SetStateAction<any | null>>;
  showUpdateModal: (entity: any) => void;
  openModal: (mode: "create" | "update", item?: EntityToEdit) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  formMode: "create" | "update";
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

interface IItem {
  id: string;
  name: string;
  image: string;
  parent?: { _id: string; name: string };
}

export type EntityToEdit = IItem | IProduct;

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [entityToEdit, setEntityToEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "update">("create");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isResultModalOpen, setResultModalOpen] = useState(false);
  const [resultModalContent, setResultModalContent] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // console.log("🚀 ~ entityToEdit:ENTITY", entityToEdit);

  const showCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const showResultModal = () => setResultModalOpen(true);
  const closeResultModal = () => setResultModalOpen(false);

  const showUpdateModal = (item: EntityToEdit) => {
    console.log("RECEIVE ENTITY", item);
    setEntityToEdit(item);
    // setUpdateModalOpen(true); // Ouvre la modale pour l'édition
    setCreateModalOpen(true); // Ouvre la modale pour l'édition
  };

  const openModal = (mode: "create" | "update", item?: EntityToEdit) => {
    setFormMode(mode);
    if (mode === "update" && item) {
      setEntityToEdit(item);
    } else {
      setEntityToEdit(null); // Réinitialiser en mode création
      // form.reset(); // Réinitialiser le formulaire pour la création
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fermer la modale
  };

  return (
    <ModalContext.Provider
      value={{
        isCreateModalOpen,
        isResultModalOpen,
        isUpdateModalOpen,
        showCreateModal,
        closeCreateModal,
        showResultModal,
        closeResultModal,
        resultModalContent,
        setResultModalContent,
        setUpdateModalOpen,
        entityToEdit,
        setEntityToEdit,
        showUpdateModal,
        openModal,
        closeModal,
        isModalOpen,
        formMode,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

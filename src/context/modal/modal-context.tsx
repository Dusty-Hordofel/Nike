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
  entityToEdit: {
    id: string;
    name: string;
    image: string;
    parent?: { _id: string; name: string };
  } | null;
  setEntityToEdit: Dispatch<
    SetStateAction<{
      id: string;
      name: string;
      image: string;
      parent?: { _id: string; name: string };
    } | null>
  >;
  showUpdateModal: (entity: {
    id: string;
    name: string;
    image: string;
  }) => void;
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

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isResultModalOpen, setResultModalOpen] = useState(false);
  const [resultModalContent, setResultModalContent] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [entityToEdit, setEntityToEdit] = useState<{
    id: string;
    name: string;
    image: string;
    parent?: { _id: string; name: string };
  } | null>(null);
  // const [entityToEdit, setEntityToEdit] = useState<{
  //   id: string;
  //   type: "category" | "product" | "subproduct";
  //   data:
  //   { id: string; name: string; image: string };
  // } | null>(null);

  const showCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const showResultModal = () => setResultModalOpen(true);
  const closeResultModal = () => setResultModalOpen(false);

  const showUpdateModal = (item: {
    id: string;
    name: string;
    image: string;
    parent?: { _id: string; name: string };
  }) => {
    setEntityToEdit(item);
    setUpdateModalOpen(true); // Ouvre la modale pour l'édition
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

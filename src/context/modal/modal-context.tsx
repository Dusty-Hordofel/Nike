import React, { createContext, useState, useContext, ReactNode } from "react";

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
  setResultModalContent: React.Dispatch<
    React.SetStateAction<{
      success: boolean;
      message: string;
    } | null>
  >;
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
  const [isResultModalOpen, setResultModalOpen] = useState(false);
  const [resultModalContent, setResultModalContent] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const showCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const showResultModal = () => setResultModalOpen(true);
  const closeResultModal = () => setResultModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isCreateModalOpen,
        isResultModalOpen,
        showCreateModal,
        closeCreateModal,
        showResultModal,
        closeResultModal,
        resultModalContent,
        setResultModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextProps {
  isOpen: boolean;
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
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
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, showModal, closeModal, modalContent }}
    >
      {children}
      {isOpen && modalContent}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

import { ModalContext } from "@/components/providers/modal-provider";
import { ReactNode, useContext } from "react";

interface ModalContextProps {
  isOpen: boolean;
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

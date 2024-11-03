"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface DeliveryContextProps {
  deliveryStep: number | null;
  setDeliveryStep: Dispatch<SetStateAction<number | null>>;
  activeSection: "address" | "payment" | "summary";
  setActiveSection: Dispatch<SetStateAction<"address" | "payment" | "summary">>;
}

export const DeliveryContext = createContext<DeliveryContextProps | undefined>(
  undefined
);

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
  const [deliveryStep, setDeliveryStep] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<
    "address" | "payment" | "summary"
  >(deliveryStep === 3 ? "payment" : "address");

  return (
    <DeliveryContext.Provider
      value={{ deliveryStep, setDeliveryStep, activeSection, setActiveSection }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

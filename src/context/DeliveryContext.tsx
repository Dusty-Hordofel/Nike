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
  deliveryStep: number;
  setDeliveryStep: Dispatch<SetStateAction<number>>;
  activeSection: "address" | "payment" | "summary";
  setActiveSection: Dispatch<SetStateAction<"address" | "payment" | "summary">>;
}

// const DeliveryContext: DeliveryContextProps | undefined =
//   createContext(undefined);
const DeliveryContext = createContext<DeliveryContextProps | undefined>(
  undefined
);

export const DeliveryProvider = ({
  children,
  deliveryAddress,
}: {
  children: ReactNode;
  deliveryAddress: any;
}) => {
  const [deliveryStep, setDeliveryStep] = useState(
    deliveryAddress.success ? 3 : 1
  );
  const [activeSection, setActiveSection] = useState<
    "address" | "payment" | "summary"
  >(deliveryStep === 3 ? "payment" : "address");

  console.log("TOTO", deliveryAddress);
  return (
    <DeliveryContext.Provider
      value={{ deliveryStep, setDeliveryStep, activeSection, setActiveSection }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDeliveryContext = () => {
  const context = useContext(DeliveryContext);
  if (!context)
    throw new Error(
      "throw new Error('useDeliveryContext must be used within a DeliveryProvider');"
    );

  return context;
};

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

// const DeliveryContext: DeliveryContextProps | undefined =
//   createContext(undefined);
const DeliveryContext = createContext<DeliveryContextProps | undefined>(
  undefined
);

export const DeliveryProvider = ({
  children,
  // deliveryAddress,
}: {
  children: ReactNode;
}) => {
  const [deliveryStep, setDeliveryStep] = useState<number | null>(
    // deliveryAddress.success ? 3 : 1
    null
  );
  const [activeSection, setActiveSection] = useState<
    "address" | "payment" | "summary"
  >(deliveryStep === 3 ? "payment" : "address");

  // const activePaymentMethod = useActivePaymentMethod();
  // const changeActivePaymentMethod = useChangeActivePaymentMethod();

  // useEffect(() => {
  //   if (activePaymentMethod.isSuccess && activePaymentMethod.data.success) {
  //     setPaymentStep(3);
  //   }
  // }, [activePaymentMethod.isSuccess, activePaymentMethod.data]);

  // useEffect(() => {
  //   if (
  //     activePaymentMethod.isError ||
  //     (activePaymentMethod.isSuccess && !activePaymentMethod.data.success)
  //   ) {
  //     setPaymentStep(1);
  //   }
  // }, [
  //   activePaymentMethod.isError,
  //   activePaymentMethod.isSuccess,
  //   activePaymentMethod.data,
  // ]);

  // console.log("TOTO", deliveryAddress);
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

import { PaymentContext } from "@/context/checkout/payment-context";
import { useContext } from "react";

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error(
      "throw new Error('usePaymentContext must be used within a PaymentProvider');"
    );

  return context;
};

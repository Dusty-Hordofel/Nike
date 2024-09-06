import { DeliveryContext } from "@/context/checkout/delivery-context";
import { useContext } from "react";

export const useDeliveryContext = () => {
  const context = useContext(DeliveryContext);
  if (!context)
    throw new Error(
      "throw new Error('useDeliveryContext must be used within a DeliveryProvider');"
    );

  return context;
};

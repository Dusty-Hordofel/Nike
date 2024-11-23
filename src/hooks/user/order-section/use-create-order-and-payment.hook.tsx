import React, { Dispatch, SetStateAction } from "react";
import { DeliveryInfoFormData } from "../../../schemas/checkout/delivery.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useSaveAddressProps {
  setPaymentStatus: Dispatch<SetStateAction<string>>;
  //   setError: Dispatch<SetStateAction<string>>;
}

// DeliveryInfoFormData
// paymentStatus
const useCreateOrderAndPayment = ({
  setPaymentStatus,
}: //   setError,
useSaveAddressProps) => {
  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (orderInformation: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/pay-with-stripe`,
        {
          method: "POST",
          body: JSON.stringify({
            ...orderInformation,
          }),
        }
      );
      console.log("SAVE USER", response);
      return response.json();
    },
    onSuccess: (data) => {
      //   queryClient.invalidateQueries({ queryKey: ["active-address"] });
      //   queryClient.invalidateQueries({ queryKey: ["addresses"] });

      if (data.success) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failed");
      }
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
      // setPaymentStatus("failed");
    },
  });

  return mutation;
};

export default useCreateOrderAndPayment;

import React, { Dispatch, SetStateAction } from "react";
import { DeliveryInfoFormData } from "@/lib/validations/delivery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useSaveAddressProps {
  setSuccess: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
}

export const useSaveAddress = ({
  setSuccess,
  setError,
}: useSaveAddressProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newAddress: DeliveryInfoFormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/address`,
        {
          method: "POST",
          body: JSON.stringify({
            ...newAddress,
          }),
        }
      );
      return response.json();
    },

    onSuccess: () => {
      alert("SUCCESS");
      setSuccess("Address saved successfully");
      queryClient.invalidateQueries({ queryKey: ["active-address"] });
    },
    onError: () => {
      alert("ERROR");
      setError("Address not saved");
    },
  });

  return mutation;
};

import React, { Dispatch, SetStateAction } from "react";
import { DeliveryInfoFormData } from "@/lib/validations/delivery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAdminCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryInformation: {
      name: string;
      image: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/categories`,
        {
          method: "POST",
          body: JSON.stringify({
            ...categoryInformation,
          }),
        }
      );
      console.log("SAVE USER", response);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export default useAdminCreateCategory;

import React, { Dispatch, SetStateAction } from "react";
import { DeliveryInfoFormData } from "@/lib/validations/delivery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useSaveAddressProps {
  setPaymentStatus: Dispatch<SetStateAction<string>>;
  //   setError: Dispatch<SetStateAction<string>>;
}

// DeliveryInfoFormData
// paymentStatus
const useAdminCreateCategory = () =>
  // {
  //   // setPaymentStatus,
  //   //   setError,
  // }: useSaveAddressProps
  {
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

        // if (data.success) {
        //   alert("Category  successfully fetched!");
        //   console.log("Payment succeeded!");
        //   // setPaymentStatus("success");
        //   // window.location.href = "/"; // Redirection vers la page d'accueil
        // } else {
        //   alert("Category  unsuccessfully fetched!");
        //   console.log("Payment failed. Please try again.");
        //   // setPaymentStatus("failed");
        // }
      },
      onError: (error) => {
        console.log(`Error: ${error.message}`);
        // alert("Payment failed. Please try again.");
        // console.log("Payment failed. Please try again.");
        // setPaymentStatus("failed");
      },
    });

    return mutation;
  };

export default useAdminCreateCategory;

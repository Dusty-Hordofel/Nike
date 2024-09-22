import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface useSaveAddressProps {
//   setSuccess: Dispatch<SetStateAction<string>>;
//   setError: Dispatch<SetStateAction<string>>;
// }

const useDeletePaymentMethod = () =>
  //     {
  //   setSuccess,
  //   setError,
  // }: useSaveAddressProps
  {
    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: async (paymentMethodId: string) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/payment-method`,
          {
            method: "DELETE",
            body: JSON.stringify({
              paymentMethodId,
            }),
          }
        );
        console.log("SAVE PAYMENT METHOD", response);
        return response.json();
      },
      onSuccess: () => {
        // alert("SUCCESS");
        // setSuccess("Address saved successfully");
        queryClient.invalidateQueries({ queryKey: ["payment-method"] });
      },
      onError: () => {
        alert("ERROR");
        // setError("Address not saved");
      },
    });

    return mutation;
  };

export default useDeletePaymentMethod;

import { useMutation, useQueryClient } from "@tanstack/react-query";

const useChangeActivePaymentMethod = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      paymentMethodId,
      id,
    }: {
      paymentMethodId: string;
      id: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/payment-method/active`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodId,
            id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to change active payment method"
        );
      }

      console.log("CHANGE PAYMENT", data);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-method"] });
    },
    onError: (error: any) => {
      alert("ERROR: " + error.message);
    },
  });

  return mutation;
};

export default useChangeActivePaymentMethod;

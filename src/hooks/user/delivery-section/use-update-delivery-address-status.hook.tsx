import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateDeliveryAddressStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/address/active`,
        {
          method: "PUT",
          body: JSON.stringify({
            id,
          }),
        }
      );

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      console.log("ERROR");
    },
  });

  return mutation;
};

export default useUpdateDeliveryAddressStatus;

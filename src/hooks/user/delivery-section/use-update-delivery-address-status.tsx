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
      console.log("SAVE USER", response);
      return response.json();
    },
    onSuccess: () => {
      // alert("SUCCESS");
      console.log("SUCCESS");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      // queryClient.invalidateQueries({ queryKey: ["active-address"] });
    },
    onError: () => {
      console.log("ERROR");
      // alert("ERROR");
    },
  });

  return mutation;
};

export default useUpdateDeliveryAddressStatus;

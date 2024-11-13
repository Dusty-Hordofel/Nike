import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/cart`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) throw new Error("Cart not found");
      const result = response.json();

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      alert("ERROR");
    },
  });

  return mutation;
};

export default useDeleteCart;

import { addProductToWishlist } from "@/services/client/user/wishlist.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddProductToWishlist = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addProductToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export { useAddProductToWishlist };

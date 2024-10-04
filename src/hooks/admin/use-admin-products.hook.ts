import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/services/admin/products.service";

const useAdminCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export { useAdminCreateProduct };

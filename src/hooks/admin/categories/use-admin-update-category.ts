import { updateCategory } from "@/services/admin/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAdminUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export default useAdminUpdateCategory;

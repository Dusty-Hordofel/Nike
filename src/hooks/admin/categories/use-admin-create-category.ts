import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/services/admin/categoryService";

const useAdminCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export default useAdminCreateCategory;

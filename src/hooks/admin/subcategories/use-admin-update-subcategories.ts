import { updateSubCategory } from "@/services/admin/subCategoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAdminUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSubCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export default useAdminUpdateSubCategory;

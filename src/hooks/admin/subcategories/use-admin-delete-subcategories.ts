import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubCategory } from "@/services/admin/subCategoryService";

interface useSaveAddressProps {
  setPaymentStatus: Dispatch<SetStateAction<string>>;
}

const useAdminDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSubCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export default useAdminDeleteSubCategory;

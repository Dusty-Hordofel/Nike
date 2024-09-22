import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useSaveAddressProps {
  setPaymentStatus: Dispatch<SetStateAction<string>>;
}

const useAdminDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (subCategoryInformation: { id: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
        {
          method: "DELETE",
          body: JSON.stringify({
            ...subCategoryInformation,
          }),
        }
      );
      console.log("SAVE USER", response);
      return response.json();
    },
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

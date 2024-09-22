import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAdminUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (subCategoryInformation: {
      id: string;
      name: string;
      image: string;
      parent: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
        {
          method: "PUT",
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

export default useAdminUpdateSubCategory;

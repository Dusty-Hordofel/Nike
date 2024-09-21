import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAdminUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryInformation: {
      id: string;
      name: string;
      image: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/categories`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...categoryInformation,
          }),
        }
      );
      console.log("SAVE USER", response);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export default useAdminUpdateCategory;

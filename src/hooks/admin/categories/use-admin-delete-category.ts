// import { Dispatch, SetStateAction } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface useSaveAddressProps {
//   setPaymentStatus: Dispatch<SetStateAction<string>>;
// }

// const useAdminDeleteCategory = () => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: async (categoryInformation: { id: string }) => {
//       const response = await fetch(
import { deleteCategory } from "@/services/admin/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAdminDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export default useAdminDeleteCategory;

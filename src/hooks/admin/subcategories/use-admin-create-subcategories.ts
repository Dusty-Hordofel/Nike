import React, { Dispatch, SetStateAction } from "react";
import { DeliveryInfoFormData } from "@/lib/validations/delivery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubCategory } from "@/services/admin/subCategoryService";

const useAdminCreateSubCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSubCategory,

    // async (subCategoryInformation: {
    //   name: string;
    //   image: string;
    //   parent: string;
    // }) => {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         ...subCategoryInformation,
    //       }),
    //     }
    //   );
    //   console.log("SAVE USER", response);
    //   return response.json();
    // },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export default useAdminCreateSubCategory;

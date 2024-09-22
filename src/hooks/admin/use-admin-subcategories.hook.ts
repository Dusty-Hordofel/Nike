import React, { Dispatch, SetStateAction } from "react";
import { DeliveryInfoFormData } from "@/lib/validations/delivery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  updateSubCategory,
} from "@/services/admin/subcategory.service";

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

const useAdminGetSubCategories = () => {
  return useQuery({
    queryKey: ["subCategories"],
    queryFn: getSubCategories,
  });
};

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

export {
  useAdminCreateSubCategory,
  useAdminGetSubCategories,
  useAdminDeleteSubCategory,
  useAdminUpdateSubCategory,
};

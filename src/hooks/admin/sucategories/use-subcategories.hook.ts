import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  updateSubCategory,
} from "@/services/client/admin/subcategories.service";

const useAdminCreateSubCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSubCategory,

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

const useAdminGetSubCategories = (parent?: string) => {
  return useQuery({
    enabled: !!parent || parent === undefined,
    // staleTime: 5 * 60 * 1000,
    queryKey: ["subCategories", parent],
    queryFn: () => getSubCategories(parent),
  });
};

const useGetSubCategoriesByParent = (
  parent?: string,
  isParentRequired: boolean = false
) => {
  return useQuery({
    queryKey: ["subCategories", parent || "all"],
    queryFn: () => getSubCategories(parent),
    enabled: isParentRequired ? !!parent : true, // Si parent est requis, évalue la présence de parent, sinon toujours enabled
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
  useGetSubCategoriesByParent,
};

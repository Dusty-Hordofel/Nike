import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/client/admin/categories.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const useAdminGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

const useAdminUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export {
  useAdminGetCategories,
  useAdminCreateCategory,
  useAdminDeleteCategory,
  useAdminUpdateCategory,
};

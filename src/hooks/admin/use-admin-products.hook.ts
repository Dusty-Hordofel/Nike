import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminCreateProduct,
  adminGetProducts,
  adminUpdateProduct,
  deleteProduct,
} from "@/services/admin/products.service";
import { getProducts } from "@/services/user/products.service";

const useAdminCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: adminCreateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

const useAdminGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: adminGetProducts,
  });
};

const useAdminDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

const useAdminUpdateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: adminUpdateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return mutation;
};

export {
  useAdminCreateProduct,
  useAdminGetProducts,
  useAdminDeleteProduct,
  useAdminUpdateProduct,
};

import { getProduct } from "@/services/user/products.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (slug: string, color: string) => {
  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", slug, color],
    queryFn: async () => {
      const { product } = await getProduct(slug, color);
      return product;
    },
  });
  return { product, isProductLoading, isProductError };
};

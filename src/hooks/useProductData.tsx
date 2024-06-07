import { getProduct, getProducts } from "@/utils/apiRequests";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products"],
    // queryFn: getProducts,
    queryFn: async () => {
      const { products } = await getProducts();
      return products;
    },
  });

  return { products, isProductsLoading, isProductsError };
};

export const useProduct = (slug: string, style: number, size: number) => {
  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", slug, style, size],
    queryFn: async () => {
      const { product } = await getProduct(slug, style, size);
      return product;
    },
  });
  return { product, isProductLoading, isProductError };
};

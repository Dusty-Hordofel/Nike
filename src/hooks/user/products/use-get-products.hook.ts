import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
      );
      if (!response.ok) throw new Error("Failed to fetch products.");

      const { products } = await response.json();
      console.log("🚀 ~ queryFn: ~ products:", products);
      return products;
    },
  });
};

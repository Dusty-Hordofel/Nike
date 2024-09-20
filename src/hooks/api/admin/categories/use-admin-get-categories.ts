import { useQuery } from "@tanstack/react-query";

export const useAdminGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/categories`
      );
      if (!response.ok) throw new Error("Failed to fetch categories.");

      const { categories } = await response.json();
      console.log("🚀 ~ queryFn: ~ products:", categories);
      return categories;
    },
  });
};

// export const useProducts = () => {
//   const categoriesQuery = useQuery({
//     queryKey: ["products"],
//     queryFn: () => fetch(`/api/products`).then((res) => res.json()),
//   });
//   return categoriesQuery;
// };

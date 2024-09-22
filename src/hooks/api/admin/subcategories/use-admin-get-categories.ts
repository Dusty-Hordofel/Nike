import { useQuery } from "@tanstack/react-query";

export const useAdminGetSubCategories = () => {
  return useQuery({
    queryKey: ["subCategories"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`
      );
      if (!response.ok) throw new Error("Failed to fetch categories.");

      const { subCategories } = await response.json();
      console.log("🚀 ~ queryFn: ~ products:", subCategories);
      return subCategories;
    },
  });
};

import { getWishlistProducts } from "@/services/client/user/products.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsFromWishlist = (user?: {
  _id: string;
  role: "user" | "admin";
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
}) => {
  return useQuery({
    enabled: !!user,
    queryKey: ["wishlist", user?._id],
    queryFn: () => getWishlistProducts(user!._id),
  });
};

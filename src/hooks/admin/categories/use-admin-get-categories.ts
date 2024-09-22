import { getCategories } from "@/services/admin/category.service";
import { useQuery } from "@tanstack/react-query";

const useAdminGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export default useAdminGetCategories;

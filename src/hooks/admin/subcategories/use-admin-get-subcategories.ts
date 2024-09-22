import { getSubCategories } from "@/services/admin/subcategory.service";
import { useQuery } from "@tanstack/react-query";

const useAdminGetSubCategories = () => {
  return useQuery({
    queryKey: ["subCategories"],
    queryFn: getSubCategories,
  });
};
export default useAdminGetSubCategories;

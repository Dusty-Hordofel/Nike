import { getSubCategories } from "@/services/admin/subCategoryService";
import { useQuery } from "@tanstack/react-query";

const useAdminGetSubCategories = () => {
  return useQuery({
    queryKey: ["subCategories"],
    queryFn: getSubCategories,
  });
};
export default useAdminGetSubCategories;

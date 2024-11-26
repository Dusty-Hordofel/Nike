import Category from "@/models/category.model";
import SubCategory from "@/models/subcategory.model"; // Mongoose model

export const subcategoryService = {
  getSubCategories: async () => {
    return await SubCategory.find()
      .populate({
        path: "parent",
        model: Category,
      })
      .lean();
    // return SubCategory.find().populate("parent").lean();
  },
  //   getSubCategoryById: async (id: string) => {
  //     return SubCategory.findById(id).populate("parent").lean();
  //   },
  //   createSubCategory: async (data: any) => {
  //     return SubCategory.create(data);
  //   },
  //   updateSubCategory: async (id: string, data: any) => {
  //     return SubCategory.findByIdAndUpdate(id, data, { new: true }).lean();
  //   },
  //   deleteSubCategory: async (id: string) => {
  //     return SubCategory.findByIdAndDelete(id).lean();
  //   },
};

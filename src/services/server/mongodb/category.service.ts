// services/server/category.service.ts
import Category from "@/models/category.model"; // Mongoose model

export const categoryService = {
  getCategories: async () => {
    return Category.find({})
      .sort({ updatedAt: -1 })
      .select("-__v -createdAt -updatedAt");
  },
  getCategoryById: async (id: string) => {
    return Category.findById(id).lean();
  },
  getCategoryByName: async (name: string) => {
    return Category.findOne({ name });
  },
  createCategory: async (data: any) => {
    return Category.create(data);
    // return Category.create(data);
  },
  updateCategory: async (id: string, data: any) => {
    return Category.findByIdAndUpdate(id, data, { new: true }).lean();
    // Category.findByIdAndUpdate(id, { name, image });
  },
  deleteCategory: async (id: string) => {
    return Category.findByIdAndDelete(id).lean();
  },
};

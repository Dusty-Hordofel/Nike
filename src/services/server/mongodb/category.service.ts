// services/server/category.service.ts
import Category from "@/models/category.model"; // Mongoose model

export const categoryService = {
  getCategories: async () => {
    return Category.find().lean();
  },
  getCategoryById: async (id: string) => {
    return Category.findById(id).lean();
  },
  createCategory: async (data: any) => {
    return Category.create(data);
  },
  updateCategory: async (id: string, data: any) => {
    return Category.findByIdAndUpdate(id, data, { new: true }).lean();
  },
  deleteCategory: async (id: string) => {
    return Category.findByIdAndDelete(id).lean();
  },
};

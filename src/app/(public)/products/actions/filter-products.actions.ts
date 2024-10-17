"use server";

import { connectDB } from "@/config/database";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import SubCategory from "@/models/subcategory.model";

export const filterProducts = async () =>
  //     {
  //   category,
  // }: {
  //   category: { category: string };
  // }
  {
    try {
      connectDB();
      const products = await Product.find();
      console.log("🚀 ~ products:", products);
      let categories = await Category.find().lean();
      let subCategories = await SubCategory.find()
        .populate({
          path: "parent",
          model: Category,
        })
        .lean();
      const sizes = await Product.find().distinct("subProducts.sizes.size");
      // let details = await Product.find({ ...category }).distinct("details");
      console.log("🚀 ~ filterProducts ~ sizes:SIZE", sizes);
      console.log("🚀 ~ filterProducts ~ categories:CAT", categories);
      console.log("🚀 ~ filterProducts ~ subCategories:SUB", subCategories);

      return { products, categories, subCategories };
    } catch (error: any) {
      return { errMessage: error.message };
    }
  };

export const filterArray = (array: any, property: any) => {
  return array
    .filter((item: any) => item.name == property)
    .map((s: any) => {
      return s.value;
    });
};

// export const removeDuplicates = (array: any) => {
//   return [...new Set(array)];
// };

import Product from "@/models/product.model"; // Mongoose model

export const brandService = {
  getBrands: async () => {
    return Product.find().distinct("brand");
  },
};

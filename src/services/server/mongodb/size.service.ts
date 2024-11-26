import Product from "@/models/product.model"; // Mongoose model

export const sizeService = {
  getSizes: async () => {
    return Product.find().distinct("subProducts.sizes.size");
  },
};

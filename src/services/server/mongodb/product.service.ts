import Product from "@/models/product.model";

export const productService = {
  getProducts: async () => {
    return Product.find({}).sort({ createdAt: -1 }).lean();
  },
  getProductBySlug: async (slug: string) => {
    return Product.findOne({ slug });
  },
  getProductById: async (id: string) => {
    return Product.findById(id);
  },
  createProduct: async (data: any) => {
    return Product.create(data);
  },
  updateProduct: async (id: string, data: any) => {
    return Product.findByIdAndUpdate(id, data, { new: true }).lean();
  },
  deleteProduct: async (id: string) => {
    return Product.findByIdAndDelete(id).lean();
  },
};

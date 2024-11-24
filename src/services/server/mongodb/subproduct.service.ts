import { SubProduct } from "@/@types/admin/admin.products.interface";

export const subProductService = {
  getSubProduct: async (product: any, selectedColor: string) => {
    return product.subProducts.find(
      (subProduct: SubProduct) =>
        subProduct.color.name.toLocaleLowerCase() === selectedColor
    );
  },

  getPriceAfterDiscount: (subProduct: any) => {
    return subProduct.discount > 0
      ? (subProduct.price - subProduct.price / subProduct.discount).toFixed(2)
      : subProduct.price;
  },
  getPriceBeforeDiscount: (subProduct: any) => subProduct.price,

  getQuantity: (subProduct: any, selectedSize: string) => {
    return selectedSize
      ? subProduct.sizes.find(
          (item: { size: string; qty: number; _id: string }) =>
            item.size.toLocaleLowerCase() === selectedSize
        ).qty
      : subProduct.sizes[0].qty;
  },

  getColors: (product: any) =>
    product.subProducts.map((subProduct: SubProduct) => subProduct.color),
};

import Product from "@/models/product.model"; // Mongoose model

export const colorService = {
  getColors: async () => {
    return await Product.aggregate([
      { $unwind: "$subProducts" }, // Détache chaque sous-produit dans le pipeline
      { $unwind: "$subProducts.color" }, // Détache chaque couleur dans les sous-produits
      {
        $group: {
          _id: {
            name: "$subProducts.color.name",
            hexCode: "$subProducts.color.hexCode",
          },
          color: { $first: "$subProducts.color" },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$color",
        },
      },
    ]);
  },
};

import { Product } from "@/@types/admin/admin.products.interface";

export function filterProducts(
  products: Product[],
  filters: {
    category: string[];
    size: string[];
    color: string[];
    price: string;
    subcategory: string;
    brand: string[];
  }
): { filteredProducts: Product[]; isFiltering: boolean } {
  let filteredProducts = products;
  // console.log("🚀 ~ filteredProducts:PROD", filteredProducts);
  let isFiltering = false;

  if (
    filters.category.length > 0 ||
    filters.size.length > 0 ||
    filters.color.length > 0 ||
    filters.subcategory.length > 0 ||
    filters.brand.length > 0 ||
    filters.price
  ) {
    isFiltering = true;
  }

  // Filtrer par catégorie
  if (filters.category.length) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.category.includes(String(product.category))
    );
  }

  // filter by subcategory
  if (filters.subcategory.length) {
    filteredProducts = filteredProducts.filter((product) =>
      product.subCategories.includes(filters.subcategory)
    );
  }
  // // filter by brand
  if (filters.brand.length) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.brand.includes(product.brand)
    );
  }

  // Filtrer par taille
  if (filters.size.length) {
    filteredProducts = filteredProducts
      .map((product) => {
        const filteredSubProducts = product.subProducts.filter((subProduct) =>
          subProduct.sizes.some((subProductSize) =>
            filters.size.includes(subProductSize.size)
          )
        );
        // console.log("🚀 ~ filteredProducts:FOLOLI", filteredProducts);

        return { ...product, subProducts: filteredSubProducts };
      })
      .filter((product) => product.subProducts.length > 0);
  }

  // Filtrer par couleur
  if (filters.color.length) {
    filteredProducts = filteredProducts.map((product) => {
      const filteredSubProducts = product.subProducts.filter((subProduct) =>
        filters.color.includes(subProduct.color.hexCode)
      );
      console.log(
        "🚀 ~ filteredProducts=filteredProducts.map ~ filteredSubProducts:TALA",
        filteredSubProducts
      );

      return { ...product, subProducts: filteredSubProducts };
    });
  }

  // Trier par prix, nouveauté ou featured
  if (filters.price) {
    filteredProducts = filteredProducts.sort((a, b) => {
      const minPriceA = Math.min(
        ...a.subProducts.map((subProduct) => subProduct.price)
      );
      const minPriceB = Math.min(
        ...b.subProducts.map((subProduct) => subProduct.price)
      );

      if (filters.price === "asc") {
        return minPriceA - minPriceB;
      } else if (filters.price === "desc") {
        return minPriceB - minPriceA;
      } else if (filters.price === "newest") {
        const dateA =
          typeof a.createdAt === "string" ? new Date(a.createdAt) : a.createdAt;
        const dateB =
          typeof b.createdAt === "string" ? new Date(b.createdAt) : b.createdAt;

        return dateB.getTime() - dateA.getTime();
      } else if (filters.price === "featured") {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return 0;
    });
  }

  return { filteredProducts, isFiltering };
}

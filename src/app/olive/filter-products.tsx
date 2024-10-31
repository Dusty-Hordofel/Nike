import { Product } from "@/@types/admin/admin.products.interface";
// import { IProduct } from "@/models/product.model";

export function filterProducts(
  products: Product[],
  filters: {
    category: string[];
    size: string[];
    color: string[];
    price: string;
  }
): Product[] {
  let filtered = products;

  // Filtrer par catégorie
  if (filters.category.length) {
    filtered = filtered.filter((product) =>
      filters.category.includes(String(product.category))
    );
  }

  // Filtrer par taille
  if (filters.size.length) {
    filtered = filtered
      .map((product) => {
        const filteredSubProducts = product.subProducts.filter((subProduct) =>
          subProduct.sizes.some((subProductSize) =>
            filters.size.includes(subProductSize.size)
          )
        );
        return { ...product, subProducts: filteredSubProducts };
      })
      .filter((product) => product.subProducts.length > 0);
  }

  // Filtrer par couleur
  if (filters.color.length) {
    filtered = filtered.map((product) => {
      const filteredSubProducts = product.subProducts.filter((subProduct) =>
        filters.color.includes(subProduct.color.hexCode)
      );

      return { ...product, subProducts: filteredSubProducts };
    });
  }

  // Trier par prix, nouveauté ou featured
  if (filters.price) {
    filtered = filtered.sort((a, b) => {
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

  return filtered;
}

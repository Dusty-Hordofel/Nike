import { useState, useEffect, useMemo } from "react";
import { filterProducts } from "./filters/filter-products";
import { Product } from "@/@types/admin/admin.products.interface";

export const useProducts = (data: any) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filters, setFilters] = useState<{
    category: string[];
    color: string[];
    size: string[];
    price: "featured" | "asc" | "desc" | "newest" | "";
    brand: string[];
    subcategory: string;
  }>({
    category: [],
    color: [],
    size: [],
    price: "",
    subcategory: "",
    brand: [],
  });

  useEffect(() => {
    if (data?.products) {
      setIsFiltering(true);
      setTimeout(() => {
        const { filteredProducts, isFiltering } = filterProducts(
          data.products,
          filters
        );
        setFilteredProducts(filteredProducts);
        setIsFiltering(isFiltering);
      }, 500);
    }
  }, [data, filters]);

  return {
    products: data?.products || [],
    filteredProducts,
    setFilteredProducts,
    filters,
    setFilters,
    isFiltering,
    setIsFiltering,
  };
};

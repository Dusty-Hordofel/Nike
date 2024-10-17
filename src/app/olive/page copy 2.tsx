"use client";
import React, { useEffect, useState } from "react";
import { filterProducts } from "../(public)/products/actions/filter-products.actions";
import ProductCard from "@/components/common/product/product-card/product-card";
import { IProduct } from "@/models/product.model";
import { useQuery } from "@tanstack/react-query";
import CategoryFilter from "./category-filter";

type Props = {};

const page = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [filters, setFilters] = useState<{
    // search: string;
    category: string[];
    color: string[];
    size: string[];
  }>({
    // search: "",
    category: [], // Tableau pour stocker plusieurs catégories sélectionnées
    color: [],
    size: [],
    // size: "",
  });

  console.log("🚀 ~ page ~ filters:FILTER-PRODUCT", filteredProducts);

  const queryParams = new URLSearchParams({
    // search: filters.search,
    category: filters.category.join(","), // Transformer le tableau en chaîne de caractères séparée par des virgules
    color: filters.color.join(","),
    size: filters.size.join(","),
  }).toString();

  console.log("🚀 ~ page ~ queryParams:PARAMS", queryParams);

  const productsQuery =
    useQuery({
      queryKey: ["products"],
      queryFn: () =>
        fetch(`/api/products?${queryParams}`).then((res) => res.json()),
    }) || [];

  useEffect(() => {
    if (productsQuery.data) {
      setProducts(productsQuery.data.products); // Remplir l'état avec tous les produits
      setFilteredProducts(productsQuery.data.products); // Initialiser les produits filtrés avec tous les produits
    }
  }, [productsQuery.data]);

  useEffect(() => {
    // Appliquer les filtres chaque fois que `filters` change
    const applyFilters = () => {
      let filtered = products;

      if (filters.category.length) {
        filtered = filtered.filter((product) =>
          filters.category.includes(String(product.category))
        );
      }

      //   Si tu as d'autres filtres comme couleur et taille, ajoute-les ici.
      //   if (filters.size.length) {
      //     filtered = filtered.filter((product) =>
      //       product.subProducts.some((subProduct) =>
      //         subProduct.sizes.some((sizeObj) =>
      //           filters.size.includes(sizeObj.size)
      //         )
      //       )
      //     );
      //   }

      // Appliquer le filtrage sur les sous-produits en fonction de la taille

      if (filters.size.length) {
        filtered = filtered
          .map((product) => {
            const filteredSubProducts = product.subProducts.filter(
              (subProduct) =>
                subProduct.sizes.some((subProductSize) =>
                  filters.size.includes(subProductSize.size)
                )
            );

            return {
              ...product,
              subProducts: filteredSubProducts, // Ne garder que les sous-produits filtrés
            };
          })
          .filter((product) => product.subProducts.length > 0); // Ne garder que les produits qui ont des sous-produits filtrés
      }

      //   if (filters.size.length) {
      //     filtered = filtered
      //       .map((product) => {
      //         const filteredSubProducts = product.subProducts.filter(
      //           (subProduct) => filters.size.includes(subProduct.sizes)
      //         );

      //         return {
      //           ...product,
      //           subProducts: filteredSubProducts, // Ne garder que les sous-produits filtrés
      //         };
      //       })
      //       .filter((product) => product.subProducts.length > 0); // Ne garder que les produits qui ont des sous-produits filtrés
      //   }

      // Filtrer par couleur()
      if (filters.color.length) {
        filtered = filtered.map((product) => {
          const filteredSubProducts = product.subProducts.filter((subProduct) =>
            filters.color.includes(subProduct.color.color)
          );

          return {
            ...product,
            subProducts: filteredSubProducts, // Ne garder que les sous-produits filtrés
          };
        });
        // filtered = filtered.filter((product) =>
        //   product.subProducts.some((subProduct) =>
        //     filters.color.includes(subProduct.color.color)
        //   )
        // );
      }
      //   if (filters.color.length) {
      //     filtered = filtered.filter((product) =>
      //       product.subProducts.some((subProduct) =>
      //         filters.color.includes(subProduct.color.color)
      //       )
      //     );
      //   }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, products]); // Applique les filtres lorsque `filters` ou `products` change

  if (productsQuery.isLoading) return <p>Loading...</p>;
  if (productsQuery.isError) return <p>Error...</p>;

  console.log("🚀 ~ page ~ productsQuery:PRODUCT", productsQuery);

  type FilterKey = keyof typeof filters;

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterKey: FilterKey
  ) => {
    console.log("��� ~ handleCategoryChange ~ e.target.value:", e.target.value);
    setFilters((prev) => ({
      ...prev,
      [filterKey]: e.target.checked
        ? [...prev[filterKey], e.target.value]
        : prev[filterKey].filter((cat) => cat !== e.target.value),
    }));
  };
  //   const handleCategoryChange: React.ChangeEventHandler<HTMLInputElement> = (
  //     e
  //   ) => {
  //     console.log("��� ~ handleCategoryChange ~ e.target.value:", e.target.value);
  //     setFilters((prev) => ({
  //       ...prev,
  //       category: e.target.checked
  //         ? [...prev.category, e.target.value]
  //         : prev.category.filter((cat) => cat !== e.target.value),
  //     }));
  //   };

  return (
    <div>
      <section className="grid grid-cols-3 gap-4 px-11">
        {filteredProducts.map((product: IProduct) => {
          return <ProductCard product={product} key={Number(product._id)} />;
        })}
      </section>
      {/* <CategoryFilter categories={categories} subCategories={subCategories} /> */}

      {/* Category */}
      <div className="">
        <h3>
          Category
          {/* <span>{show ? "-" : "+"}</span> */}
        </h3>

        <ul>
          {productsQuery.data?.categories.map((category: any, i: number) => (
            <li key={category._id}>
              <input
                type="checkbox"
                name="filter"
                id={category._id}
                value={category._id}
                checked={filters.category.includes(category._id)}
                onChange={(e) => handleCategoryChange(e, "category")}
              />
              <label htmlFor={category._id}>{category.name}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="">
        <h3>
          Sizes
          {/* <span>{show ? "-" : "+"}</span> */}
        </h3>

        <ul>
          {productsQuery.data?.sizes.map((size: any, i: number) => (
            <li key={size._id}>
              <input
                type="checkbox"
                name="filter"
                id={size._id}
                checked={filters.size.includes(size)}
                value={size}
                onChange={(e) => handleCategoryChange(e, "size")}
              />
              <label htmlFor={size._id}>{size}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="">
        <h3>
          Colors
          {/* <span>{show ? "-" : "+"}</span> */}
        </h3>

        <ul>
          {productsQuery.data?.colors.map((color: any, i: number) => (
            <li key={i}>
              <input
                type="checkbox"
                name="filter"
                id={color}
                checked={filters.color.includes(color)}
                value={color}
                onChange={(e) => handleCategoryChange(e, "color")}
              />
              <label htmlFor={color}>{color}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;

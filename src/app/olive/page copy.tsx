"use client";
import React, { useState } from "react";
import { filterProducts } from "../(public)/products/actions/filter-products.actions";
import ProductCard from "@/components/common/product/product-card/product-card";
import { IProduct } from "@/models/product.model";
import { useQuery } from "@tanstack/react-query";
import CategoryFilter from "./category-filter";

type Props = {};

const page = (props: Props) => {
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

  console.log("🚀 ~ page ~ filters:FILTER", filters);

  const queryParams = new URLSearchParams({
    // search: filters.search,
    category: filters.category.join(","), // Transformer le tableau en chaîne de caractères séparée par des virgules
    color: filters.color.join(","),
    size: filters.size.join(","),
  }).toString();

  console.log("🚀 ~ page ~ queryParams:PARAMS", queryParams);

  // { category: { category: "" } }
  //   const products = await filterProducts();
  const productsQuery =
    useQuery({
      queryKey: ["products", filters.category, filters.color, filters.size],
      queryFn: () =>
        fetch(`/api/products?${queryParams}`).then((res) => res.json()),
    }) || [];

  if (productsQuery.isLoading) return <p>Loading...</p>;
  if (productsQuery.isError) return <p>Error...</p>;

  const { products, categories, subCategories, sizes } = productsQuery.data;
  console.log("🚀 ~ page ~ products:PRO", products);
  //   console.log("🚀 ~ page ~ subCategories:SUB", subCategories);
  console.log("🚀 ~ page ~ sizes:SIZES", sizes);
  //   console.log("🚀 ~ page ~ categories:CAT", categories);

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
        {products.map((product: IProduct) => {
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
          {
            //   show &&
            categories.map((category: any, i: number) => (
              <li key={category._id}>
                <input
                  type="checkbox"
                  name="filter"
                  id={category._id}
                  // checked={check.active}
                  value={category._id}
                  checked={filters.category.includes(category._id)}
                  onChange={(e) => handleCategoryChange(e, "category")}
                  //   onChange={handleCategoryChange}
                />
                <label htmlFor={category._id}>{category.name}</label>
                {/* <span>{show ? "-" : "+"}</span> */}
              </li>
            ))
          }
        </ul>
      </div>

      <div className="">
        <h3>
          Sizes
          {/* <span>{show ? "-" : "+"}</span> */}
        </h3>

        <ul>
          {
            //   show &&
            sizes.map((size: any, i: number) => (
              <li key={size._id}>
                <input
                  type="checkbox"
                  name="filter"
                  id={size._id}
                  // checked={check.active}
                  checked={filters.size.includes(size)}
                  value={size}
                  onChange={(e) => handleCategoryChange(e, "size")}
                />
                <label htmlFor={size._id}>{size}</label>
                {/* <span>{show ? "-" : "+"}</span> */}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default page;

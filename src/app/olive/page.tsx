"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/common/product/product-card/product-card";
import { IProduct } from "@/models/product.model";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filters, setFilters] = useState<{
    // search: string;
    category: string[];
    color: string[];
    size: string[];
  }>({
    // search: "",
    category: [],
    color: [],
    size: [],
  });

  const { data, isLoading, isError } =
    useQuery({
      queryKey: ["products"],
      queryFn: () => fetch(`/api/products`).then((res) => res.json()),
    }) || [];

  useEffect(() => {
    if (data && data.products) {
      setIsFiltering(true);

      setTimeout(() => {
        let filtered: IProduct[] = data.products;

        if (filters.category.length) {
          filtered = filtered.filter((product) =>
            filters.category.includes(String(product.category))
          );
        }

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
                subProducts: filteredSubProducts,
              };
            })
            .filter((product) => product.subProducts.length > 0);
        }

        if (filters.color.length) {
          filtered = filtered.map((product) => {
            const filteredSubProducts = product.subProducts.filter(
              (subProduct) => filters.color.includes(subProduct.color.color)
            );

            return {
              ...product,
              subProducts: filteredSubProducts,
            };
          });
        }

        setFilteredProducts(filtered);
        setIsFiltering(false);
      }, 500);
    }
  }, [data, filters]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  type FilterKey = keyof typeof filters;

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterKey: FilterKey
  ) => {
    console.log("��� ~ handleFilterChange ~ e.target.value:", e.target.value);
    setFilters((prev) => ({
      ...prev,
      [filterKey]: e.target.checked
        ? [...prev[filterKey], e.target.value]
        : prev[filterKey].filter((val) => val !== e.target.value),
    }));
  };

  return (
    <div
      className={`transition-opacity duration-500 ${isFiltering ? "opacity-50" : "opacity-100"} flex`}
    >
      {/* <CategoryFilter categories={categories} subCategories={subCategories} /> */}

      <section className="w-60 pl-12 pb-4 h-screen overflow-y-auto bg-blue-200">
        <CategoryFilter
          data={data}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
        <SizesFilter
          data={data}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
        <ColorsFilter
          data={data}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </section>
      <section className="grid grid-cols-3 gap-4 px-11 bg-warning w-full h-screen overflow-y-auto">
        {filteredProducts?.map((product: IProduct) => (
          <ProductCard product={product} key={Number(product._id)} />
        ))}
      </section>
    </div>
  );
};

export default page;

const CategoryFilter = ({ data, filters, handleFilterChange }: any) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`border-b border-gray-300 `}>
      <h3 className="font-medium py-3  flex justify-between">
        Category
        <span onClick={() => setShow(!show)}>
          <ChevronDown
            className={`transform  transition-transform ${show ? "-rotate-180" : "rotate-0"} cursor-pointer`}
          />
        </span>
      </h3>

      <ul
        className={`${show ? "opacity-100 delay-200 max-h-auto pb-5" : "opacity-0  max-h-0"} transition-all`}
      >
        {data.categories.map((category: any) => (
          <li key={category._id} className="flex cursor-pointer">
            <input
              type="checkbox"
              name="filter"
              id={category._id}
              value={category._id}
              checked={filters.category.includes(category._id)}
              onChange={(e) => handleFilterChange(e, "category")}
              className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 self-center mr-[6px] cursor-pointer"
            />
            <label
              className=" cursor-pointer hover:opacity-50"
              htmlFor={category._id}
            >
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SizesFilter = ({ data, filters, handleFilterChange }: any) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`border-b border-gray-300 `}>
      <h3 className="font-medium py-3 flex justify-between">
        Sizes
        <span onClick={() => setShow(!show)}>
          <ChevronDown
            className={`transform  transition-transform ${show ? "-rotate-180" : "rotate-0"} cursor-pointer`}
          />
        </span>
      </h3>

      <ul
        className={`${show ? "opacity-100 delay-200 max-h-auto pb-5" : "opacity-0  max-h-0"} transition-all cursor-pointer`}
      >
        {data.sizes.map((size: any) => (
          <li key={size._id}>
            <input
              type="checkbox"
              name="filter"
              id={size._id}
              checked={filters.size.includes(size)}
              value={size}
              onChange={(e) => handleFilterChange(e, "size")}
              className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 self-center mr-[6px] cursor-pointer"
            />
            <label
              htmlFor={size._id}
              className="cursor-pointer hover:opacity-50"
            >
              {size}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
const ColorsFilter = ({ data, filters, handleFilterChange }: any) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`border-b border-gray-300 `}>
      <h3 className="font-medium py-3  flex justify-between">
        Colors
        <span onClick={() => setShow(!show)}>
          <ChevronDown
            className={`transform  transition-transform ${show ? "-rotate-180" : "rotate-0"} cursor-pointer`}
          />
        </span>
      </h3>

      <ul
        className={`${show ? "opacity-100 delay-200 max-h-auto pb-5" : "opacity-0  max-h-0"} transition-all cursor-pointer`}
      >
        {data.colors.map((color: string) => (
          <li key={color} className="cursor-pointer">
            <input
              type="checkbox"
              name="filter"
              id={color}
              checked={filters.color.includes(color)}
              value={color}
              onChange={(e) => handleFilterChange(e, "color")}
              className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 self-center mr-[6px] cursor-pointer"
            />
            <label htmlFor={color} className="cursor-pointer hover:opacity-50">
              {color}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

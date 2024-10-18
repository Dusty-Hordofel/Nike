"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import ProductCard from "@/components/common/product/product-card/product-card";
import { IProduct } from "@/models/product.model";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import SortDropdownMenu from "./sort-dropdown-menu";
import ProductSortButton from "./product-sort-button";
import ProductsList from "./products-list";
import ProductFilterButton from "./product-filter-button";
import ProductFiltersSidebar from "./product-filter-sidebar";

const page = () => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 960);

  const [filters, setFilters] = useState<{
    category: string[];
    color: string[];
    size: string[];
    price: "featured" | "asc" | "desc" | "newest" | "";
  }>({
    category: [],
    color: [],
    size: [],
    price: "",
  });

  const { data, isLoading, isError } =
    useQuery({
      queryKey: ["products"],
      queryFn: () => fetch(`/api/products`).then((res) => res.json()),
    }) || [];

  useEffect(() => {
    if (data && data.products) {
      setTimeout(() => {
        setShowSidebar(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 960);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                typeof a.createdAt === "string"
                  ? new Date(a.createdAt)
                  : a.createdAt;
              const dateB =
                typeof b.createdAt === "string"
                  ? new Date(b.createdAt)
                  : b.createdAt;

              return dateB.getTime() - dateA.getTime();
            } else if (filters.price === "featured") {
              return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            } else {
              return 0;
            }
          });
          console.log("🚀 ~ filtered=filtered.sort ~ filtered:BOBO", filtered);
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
    if (filterKey === "price") {
      setFilters((prev) => ({
        ...prev,
        price: e.target.value as "asc" | "desc",
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: e.target.checked
          ? [...prev[filterKey], e.target.value]
          : prev[filterKey].filter((val) => val !== e.target.value),
      }));
    }
  };

  return (
    <div
      className={`transition-opacity duration-500 ${isFiltering ? "opacity-50" : "opacity-100"} flex flex-col`}
    >
      <section className="">
        <div
          className="header-position css-iqr4dm"
          style={{ top: "0px", transform: "translateY(0px)" }}
        >
          <header className="px-12 pb-4 bg-warning">
            <div className="flex flex-col min-[960px]:flex-row justify-between pt-2">
              <h1 className="font-medium text-2xl" id="Nike-Tech-Clothing">
                Nike Tech Clothing
                <span className="wall-header__item_count">(137)</span>
              </h1>
              <nav className="flex" aria-label="Sort By">
                <ProductFilterButton
                  setShowSidebar={setShowSidebar}
                  isLargeScreen={isLargeScreen}
                  showSidebar={showSidebar}
                />
                <div className="hidden relative min-[960px]:block">
                  <ProductSortButton
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                  />
                </div>
              </nav>
            </div>
          </header>
        </div>
      </section>
      <div className="flex">
        <ProductFiltersSidebar
          data={data}
          filters={filters}
          handleFilterChange={handleFilterChange}
          showSidebar={showSidebar}
          isLargeScreen={isLargeScreen}
        />
        <ProductsList
          filteredProducts={filteredProducts}
          isLargeScreen={isLargeScreen}
          showSidebar={showSidebar}
        />
      </div>
    </div>
  );
};

export default page;

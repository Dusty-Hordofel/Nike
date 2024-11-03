"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductsList from "./products-list";
import ProductFilterButton from "./filters/mobile/product-filter-button";
import ProductFiltersSidebar from "./product-filter-sidebar";
import { filterProducts } from "./filters/filter-products";
import ProductSorterButton from "./sorting/product-sorter-button";
import { Product } from "@/@types/admin/admin.products.interface";
import MobileProductFilterAndSort from "./filters/mobile/mobile-product-filter-and-sort";

const page = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // console.log("🚀 ~ page ~ filteredProducts:PR", filteredProducts);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [filterOpacity, setFilterOpacity] = useState(false);

  const [isFiltering, setIsFiltering] = useState(false);
  // console.log("🚀 ~ page ~ isFiltering:TALAFILTRE", isFiltering);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  // const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 960);
  type subcatecory =
    | "Lifestyle"
    | "Jordan"
    | "Running"
    | "Football"
    | "Basketball"
    | "Training et fitness"
    | "Skateboard"
    | "Retro Running"
    | "Nike SB"
    | "Sandals & Slides"
    | "Nike by You"
    | "Air Force 1"
    | "Hoodies & Sweatshirts"
    | "MALONGAO"
    | "MOLOASS"
    | "";
  const [filters, setFilters] = useState<{
    category: string[];
    color: string[];
    size: string[];
    price: "featured" | "asc" | "desc" | "newest" | "";
    brand: string[];
    subcategory: string;
    // subcategory: subcatecory;
  }>({
    category: [],
    color: [],
    size: [],
    price: "",
    subcategory: "",
    brand: [],
  });

  // console.log("🚀 ~ page ~ filters:FILTERS", filters);

  const { data, isLoading, isError } =
    useQuery({
      queryKey: ["products"],
      queryFn: () => fetch(`/api/products`).then((res) => res.json()),
    }) || [];

  useEffect(() => {
    if (data && data.products && isLargeScreen) {
      setTimeout(() => {
        setShowSidebar(true);
      }, 1000);
    } else {
      setShowSidebar(false);
    }
  }, [data, isLargeScreen]);

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
      setFilterOpacity(true);

      setTimeout(() => {
        const { filteredProducts, isFiltering } = filterProducts(
          data.products,
          filters
        );
        console.log("🚀 ~ setTimeout ~ filtered:TALA", filteredProducts);
        setFilteredProducts(filteredProducts);
        setIsFiltering(isFiltering);
        setFilterOpacity(false);
      }, 500);
    }
  }, [data, filters]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  type FilterKey = keyof typeof filters;

  const handleSorterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterKey: FilterKey
  ) => {
    if (filterKey === "price") {
      setFilters((prev) => ({
        ...prev,
        price: e.target.value as "asc" | "desc",
      }));
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      subcategory: e.target.value,
      // subcategory: e.target.value as subcatecory,
    }));
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterKey: FilterKey
  ) => {
    if (
      filterKey === "category" ||
      filterKey === "color" ||
      filterKey === "size" ||
      filterKey === "brand"
    ) {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: e.target.checked
          ? [...prev[filterKey], e.target.value]
          : prev[filterKey].filter((val) => val !== e.target.value),
      }));
    }
  };

  // const handleFilterChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   filterKey: FilterKey
  // ) => {
  //   if (filterKey === "price") {
  //     setFilters((prev) => ({
  //       ...prev,
  //       price: e.target.value as "asc" | "desc",
  //     }));
  //   } else {
  //     setFilters((prev) => ({
  //       ...prev,
  //       [filterKey]: e.target.checked
  //         ? [...prev[filterKey], e.target.value]
  //         : prev[filterKey].filter((val) => val !== e.target.value),
  //     }));
  //   }
  // };

  console.log("🚀 ~ page ~ filteredProducts:COCO", filteredProducts);
  return (
    <div
      className={`transition-opacity duration-500 ${filterOpacity ? "opacity-50" : "opacity-100"} flex flex-col`}
    >
      <section className="sticky top-0 z-20">
        <header className="px-12 pb-4 bg-warning ">
          <div className="flex flex-col min-[960px]:flex-row justify-between pt-2">
            <h1 className="font-medium text-2xl" id="Nike-Tech-Clothing">
              Nike Tech Clothing
              <span>(137)</span>
            </h1>
            <nav className="flex" aria-label="Sort By">
              <ProductFilterButton
                setShowSidebar={setShowSidebar}
                isLargeScreen={isLargeScreen}
                showSidebar={showSidebar}
              />
              <div className="hidden relative min-[960px]:block">
                <ProductSorterButton
                  showDropdown={showDropdown}
                  setShowDropdown={setShowDropdown}
                  filters={filters}
                  handleSorterChange={handleSorterChange}
                  isLargeScreen={isLargeScreen}
                />
              </div>
            </nav>
          </div>
        </header>
      </section>

      {showSidebar && (
        <MobileProductFilterAndSort
          data={data}
          filters={filters}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          handleFilterChange={handleFilterChange}
          isLargeScreen={isLargeScreen}
          setShowDropdown={setShowDropdown}
          handleSorterChange={handleSorterChange}
        />
      )}

      <div className="flex ">
        <ProductFiltersSidebar
          data={data}
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleSubCategoryChange={handleSubCategoryChange}
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

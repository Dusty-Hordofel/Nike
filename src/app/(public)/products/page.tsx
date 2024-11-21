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
import useWindowSize from "@/hooks/use-window-size";
import QueryStatus from "@/components/ui/query-status";

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [filterOpacity, setFilterOpacity] = useState(false);

  const [isFiltering, setIsFiltering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  // const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 960);
  const isLargeScreen = useWindowSize(960);

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

  const { data, isLoading, error, isError } =
    useQuery({
      queryKey: ["products"],
      queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`).then((res) =>
          res.json()
        ),
    }) || [];

  console.log("🚀 ~ ProductsPage ~ data:DATA", data);

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
    if (data && data.products) {
      setFilterOpacity(true);

      setTimeout(() => {
        const { filteredProducts, isFiltering } = filterProducts(
          data.products,
          filters
        );

        setFilteredProducts(filteredProducts);
        setIsFiltering(isFiltering);
        setFilterOpacity(false);
      }, 500);
    }
  }, [data, filters]);

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error...</p>;

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

  console.log("🚀 ~ page ~ filteredProducts:COCO", filteredProducts);
  return (
    <QueryStatus
      isLoading={isLoading}
      isError={isError}
      error={error}
      className="h-[calc(100vh-136px)] min-w-[320px] max-w-[1920px] w-full mx-0"
    >
      <div
        className={`transition-opacity duration-500 ${
          filterOpacity ? "opacity-50" : "opacity-100"
        } flex flex-col`}
      >
        <section className="max-[960px]:pt-4 max-[960px]:border-t max-[960px]:border-[#E5E5E5] max-[960px]:sticky max-[960px]:top-0 max-[960px]:z-20 bg-white max-[960px]:block hidden">
          <h1 className="max-[960px]:px-5  py-2 text-[20px] font-medium ">
            Nike Tech Clothing
          </h1>
        </section>
        <section className={`${isLargeScreen && "sticky top-0 z-20"} pb-4`}>
          <header className="min-[960px]:px-12 min-[960px]:pb-4 bg-white ">
            <div className="flex  justify-between max-[960px]:px-5 min-[960px]:pt-2 max-[960px]:h-[59px] items-center max-[960px]:border-t max-[960px]:border-[#E5E5E5]">
              <h1
                className="font-medium text-2xl hidden min-[960px]:block"
                id="Nike-Tech-Clothing"
              >
                <span>Nike Tech Clothing</span>
                <span>(137)</span>
              </h1>
              <span className="text-[#707072]  min-[960px]:hidden">
                919 Results
              </span>
              <nav className="flex" aria-label="Sort By">
                <ProductFilterButton
                  setShowSidebar={setShowSidebar}
                  isLargeScreen={isLargeScreen}
                  showSidebar={showSidebar}
                />
                {/* <div className="hidden relative min-[960px]:block">
                  <ProductSorterButton
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                    filters={filters}
                    handleSorterChange={handleSorterChange}
                    isLargeScreen={isLargeScreen}
                  />
                </div> */}
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
    </QueryStatus>
  );
};

export default ProductsPage;

"use client";
import React, { useEffect, useState } from "react";
import { filterProducts } from "./filters/filter-products";
import ProductFiltersSidebar from "./product-filter-sidebar";
import ProductsList from "./products-list";
import useWindowSize from "@/hooks/common/use-window-size";
import { Product } from "@/@types/admin/admin.products.interface";
import MobileProductFilterAndSort from "./filters/mobile/mobile-product-filter-and-sort";
import ProductSorterButton from "./sorting/product-sorter-button";
import ProductFilterButton from "./filters/mobile/product-filter-button";
import { useProducts } from "./use-products.hook";

type ProductsPageProps = {};

const ProductsPage = ({ data }: any) => {
  // Product[]

  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [filterOpacity, setFilterOpacity] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const isLargeScreen = useWindowSize(960);

  const {
    products,
    filteredProducts,
    setFilteredProducts,
    filters,
    setFilters,
    isFiltering,
    setIsFiltering,
  } = useProducts(data);

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

  return (
    <>
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
                <span>Nike Tech Clothing</span>{" "}
                <span>({filteredProducts.length})</span>
              </h1>
              <span className="text-[#707072]  min-[960px]:hidden">
                {filteredProducts.length} Results
              </span>
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
    </>
  );
};

export default ProductsPage;

"use client";
import React, { useEffect, useState } from "react";
// import { IProduct } from "@/models/product.model";
import { useQuery } from "@tanstack/react-query";
import ProductsList from "./products-list";
import ProductFilterButton from "./product-filter-button";
import ProductFiltersSidebar from "./product-filter-sidebar";
import { filterProducts } from "./filter-products";
import { Button } from "@/components/ui/buttons/button/button";
import ProductSorterButton from "./product-sorter-button";
import ProductSorter from "./product-sorter";
import { Product } from "@/@types/admin/admin.products.interface";

const page = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  // const [showMobileMenu, setShowMobileMenu] = useState(false);
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

  console.log("🚀 ~ page ~ filters:FILTERS", filters);

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
      setIsFiltering(true);

      setTimeout(() => {
        const filtered = filterProducts(data.products, filters);
        setFilteredProducts(filtered);
        setIsFiltering(false);
      }, 500);
    }
  }, [data, filters]);

  //   useEffect(() => {
  //     if (data && data.products) {
  //       setIsFiltering(true);

  //       setTimeout(() => {
  //         let filtered: IProduct[] = data.products;

  //         if (filters.category.length) {
  //           filtered = filtered.filter((product) =>
  //             filters.category.includes(String(product.category))
  //           );
  //         }

  //         if (filters.size.length) {
  //           filtered = filtered
  //             .map((product) => {
  //               const filteredSubProducts = product.subProducts.filter(
  //                 (subProduct) =>
  //                   subProduct.sizes.some((subProductSize) =>
  //                     filters.size.includes(subProductSize.size)
  //                   )
  //               );

  //               return {
  //                 ...product,
  //                 subProducts: filteredSubProducts,
  //               };
  //             })
  //             .filter((product) => product.subProducts.length > 0);
  //         }

  //         if (filters.color.length) {
  //           filtered = filtered.map((product) => {
  //             const filteredSubProducts = product.subProducts.filter(
  //               (subProduct) => filters.color.includes(subProduct.color.color)
  //             );

  //             return {
  //               ...product,
  //               subProducts: filteredSubProducts,
  //             };
  //           });
  //         }

  //         if (filters.price) {
  //           filtered = filtered.sort((a, b) => {
  //             const minPriceA = Math.min(
  //               ...a.subProducts.map((subProduct) => subProduct.price)
  //             );

  //             const minPriceB = Math.min(
  //               ...b.subProducts.map((subProduct) => subProduct.price)
  //             );

  //             if (filters.price === "asc") {
  //               return minPriceA - minPriceB;
  //             } else if (filters.price === "desc") {
  //               return minPriceB - minPriceA;
  //             } else if (filters.price === "newest") {
  //               const dateA =
  //                 typeof a.createdAt === "string"
  //                   ? new Date(a.createdAt)
  //                   : a.createdAt;
  //               const dateB =
  //                 typeof b.createdAt === "string"
  //                   ? new Date(b.createdAt)
  //                   : b.createdAt;

  //               return dateB.getTime() - dateA.getTime();
  //             } else if (filters.price === "featured") {
  //               return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  //             } else {
  //               return 0;
  //             }
  //           });
  //           console.log("🚀 ~ filtered=filtered.sort ~ filtered:BOBO", filtered);
  //         }

  //         setFilteredProducts(filtered);
  //         setIsFiltering(false);
  //       }, 500);
  //     }
  //   }, [data, filters]);

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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterKey: FilterKey
  ) => {
    if (
      filterKey === "category" ||
      filterKey === "color" ||
      filterKey === "size"
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
        </div>
      </section>

      {showSidebar && (
        <div
          id="mobile-nav-dialogue-id"
          className={`${!isLargeScreen ? "fixed inset-0 overflow-x-hidden z-50 bg-white overflow-y-auto" : "hidden"}`}
        >
          <div tabIndex={-1} className="dialog__overlay"></div>
          <div
            role="dialog"
            className="dialog__element"
            aria-labelledby="mobile-nav-dialogue-id-title"
            // open=""
          >
            <div role="document" className="dialog__document [object Object]">
              <button
                type="button"
                aria-label="Close this dialog window"
                className="visually-hidden"
              ></button>
              <p
                id="mobile-nav-dialogue-id-title"
                className="dialog__title"
                role="heading"
                // aria-level="1"
              ></p>
              <div
                className="draggable react-draggable"
                // style="transform: translate(0px, 0px)"
              >
                <div className="mobile-results-nav css-2civox">
                  <div className="mobile-results-nav__scroll-wrapper">
                    <nav className="flex justify-end relative">
                      <button
                        className="mobile-results-nav__close-btn bg-red p-5 absolute"
                        type="button"
                        onClick={() => {
                          setShowSidebar(!showSidebar);
                        }}
                      >
                        <svg
                          fill="#111"
                          viewBox="0 0 24 24"
                          width={32}
                          height={32}
                        >
                          <path d="M12 0C9.813 0 7.8.533 5.96 1.6A11.793 11.793 0 0 0 1.6 5.96C.533 7.8 0 9.813 0 12s.533 4.2 1.6 6.04a11.793 11.793 0 0 0 4.36 4.36C7.8 23.467 9.813 24 12 24s4.2-.533 6.04-1.6a11.793 11.793 0 0 0 4.36-4.36C23.467 16.2 24 14.187 24 12s-.533-4.2-1.6-6.04a11.793 11.793 0 0 0-4.36-4.36C16.2.533 14.187 0 12 0zm5.2 15.28l-1.92 1.92L12 13.84 8.72 17.2 6.8 15.28 10.16 12 6.8 8.72 8.72 6.8 12 10.08l3.28-3.28 1.92 1.92L13.92 12l3.28 3.28z"></path>
                        </svg>
                      </button>
                    </nav>
                    <div className="mobile-results-nav__scroll bg-red-100 px-5">
                      <h1 className="mobile-results-nav__top-title pt-9 pb-5">
                        Filter
                      </h1>
                      {/* SortBy */}
                      <div className="drag-handle">
                        <div
                          className="sort is-mobile css-lrxey8 pb-[10px]"
                          role="group"
                        >
                          <div className="nds-radio-set sort__wrapper css-h5os0z e4n6cbn0">
                            <fieldset
                              className="css-xeg9xx e5ue6ze0 nds-fieldset sort__section-title light"
                              aria-label="Sort By"
                            >
                              <legend className="font-medium">
                                <h3>Sort By</h3>
                              </legend>
                              {/* Moloto */}
                              <ProductSorter
                                setShowDropdown={setShowDropdown}
                                handleSorterChange={handleSorterChange}
                                filters={filters}
                                isLargeScreen={isLargeScreen}
                              />
                            </fieldset>
                          </div>
                        </div>
                        <div className="filters is--mobile css-1wmcdvn">
                          <div className="filter-group css-3d22fv border-b border-gray-500 mt-5 border-t">
                            <div
                              // aria-level="5"
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  Gender&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content">
                              <div
                                aria-label="Gender"
                                className="filter-group__items-group"
                                id="wallNavFG0"
                                role="group"
                              >
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/mens-tops-t-shirts-9om13znik1"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx={0}
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx={0}
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Men
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/womens-tops-t-shirts-5e1x6z9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx={0}
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="1"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Women
                                  </span>
                                </a>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/unisex-tops-t-shirts-3rauvz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx={0}
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="2"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Unisex
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="filter-group css-3d22fv border-b border-gray-500 mt-5">
                            <div
                              // aria-level="5"
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  Kids&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content">
                              <div
                                aria-label="Kids"
                                className="filter-group__items-group"
                                id="wallNavFG1"
                                role="group"
                              >
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/boys-tops-t-shirts-1onraz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="1"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx={0}
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Boys
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/girls-tops-t-shirts-3aqegz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="1"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="1"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Girls
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                          {/* <div className="filter-group css-3d22fv border-b border-gray-500 mt-5">
                            <div
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  Sale &amp; Offers&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content">
                              <div
                                aria-label="Sale &amp; Offers"
                                className="filter-group__items-group"
                                id="wallNavFG2"
                                role="group"
                              >
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/sale-tops-t-shirts-3yaepz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="2"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx={0}
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Sale
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div> */}
                          <div className="filter-group css-3d22fv border-b border-gray-500 mt-5">
                            <div
                              // aria-level="5"
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  Color&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content for--colors">
                              <div
                                aria-label="Color"
                                className="filter-group__items-group"
                                id="wallNavFG3"
                                role="group"
                              >
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/black-tops-t-shirts-90poyz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx={0}
                                >
                                  <div className="filter-item__color-patch is--black"></div>
                                  <span className="filter-item__item-label">
                                    Black
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/blue-tops-t-shirts-8hfx3z9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="1"
                                >
                                  <div className="filter-item__color-patch is--blue"></div>
                                  <span className="filter-item__item-label">
                                    Blue
                                  </span>
                                </a>
                                <button
                                  aria-label=""
                                  className="filter-item is--color is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/brown-tops-t-shirts-557pqz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="2"
                                >
                                  <div className="filter-item__color-patch is--brown"></div>
                                  <span className="filter-item__item-label">
                                    Brown
                                  </span>
                                </button>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/green-tops-t-shirts-9om13zbdka"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="3"
                                >
                                  <div className="filter-item__color-patch is--green"></div>
                                  <span className="filter-item__item-label">
                                    Green
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/grey-tops-t-shirts-6s5r5z9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="4"
                                >
                                  <div className="filter-item__color-patch is--grey"></div>
                                  <span className="filter-item__item-label">
                                    Grey
                                  </span>
                                </a>
                                <button
                                  aria-label=""
                                  className="filter-item is--color is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/multi-color-tops-t-shirts-416lqz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="5"
                                >
                                  <div className="filter-item__color-patch is--multi-color"></div>
                                  <span className="filter-item__item-label">
                                    Multi-Color
                                  </span>
                                </button>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/orange-tops-t-shirts-1n3adz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="6"
                                >
                                  <div className="filter-item__color-patch is--orange"></div>
                                  <span className="filter-item__item-label">
                                    Orange
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/pink-tops-t-shirts-9om13za6d74"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="7"
                                >
                                  <div className="filter-item__color-patch is--pink"></div>
                                  <span className="filter-item__item-label">
                                    Pink
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/purple-tops-t-shirts-47w4rz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="8"
                                >
                                  <div className="filter-item__color-patch is--purple"></div>
                                  <span className="filter-item__item-label">
                                    Purple
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/red-tops-t-shirts-3abn9z9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="9"
                                >
                                  <div className="filter-item__color-patch is--red"></div>
                                  <span className="filter-item__item-label">
                                    Red
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/white-tops-t-shirts-4g797z9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="10"
                                >
                                  <div className="filter-item__color-patch is--white"></div>
                                  <span className="filter-item__item-label">
                                    White
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--color css-1v0i2t4"
                                  href="https://www.nike.com/w/yellow-tops-t-shirts-9om13zayp69"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="3"
                                  data-group-type="filter"
                                  data-is-color="true"
                                  data-ndx="11"
                                >
                                  <div className="filter-item__color-patch is--yellow"></div>
                                  <span className="filter-item__item-label">
                                    Yellow
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="filter-group css-3d22fv border-b border-gray-500 mt-5">
                            <div
                              // aria-level="5"
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  Shop by Price&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content">
                              <div
                                aria-label="Shop by Price"
                                className="filter-group__items-group"
                                id="wallNavFG4"
                                role="group"
                              >
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/0-25-tops-t-shirts-90wvyz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="4"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx={0}
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    $0 - $25
                                  </span>
                                </button>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/25-50-tops-t-shirts-3f27bz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="4"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="1"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    $25 - $50
                                  </span>
                                </button>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/50-100-tops-t-shirts-5mmy2z9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="4"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="2"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    $50 - $100
                                  </span>
                                </button>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/100-150-tops-t-shirts-9om13zanjns"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="4"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="3"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    $100 - $150
                                  </span>
                                </button>
                                <div className="show-more__wrapper css-1xa4j0i">
                                  <div className="show-more">
                                    <button
                                      className="show-more__trigger is-closed show-more__btn"
                                      tabIndex={0}
                                      aria-expanded="false"
                                      aria-label="More Shop by Price"
                                      aria-pressed="false"
                                    >
                                      + More
                                    </button>
                                    <div
                                      className="show-more__contentOuter"
                                      //       style="
                                      //   height: 0px;
                                      //   transition: height 400ms linear;
                                      //   overflow: hidden;
                                      // "
                                    >
                                      <div className="show-more__contentInner filter-group__content">
                                        <button
                                          aria-label="Filter for Over $150"
                                          className="filter-item is--default is--button css-1v0i2t4"
                                          data-url="https://www.nike.com/w/over-150-tops-t-shirts-9om13zabwsq"
                                          role="checkbox"
                                          type="button"
                                          aria-checked="false"
                                          data-group-ndx="4"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="4"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Over $150
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    aria-label="Less Shop by Price"
                                    className="less-btn"
                                    // hidden=""
                                    type="button"
                                  >
                                    - Less
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="filter-group css-3d22fv border-b border-gray-500 mt-5">
                            <div
                              // aria-level="5"
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  Brand&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content">
                              <div
                                aria-label="Brand"
                                className="filter-group__items-group"
                                id="wallNavFG5"
                                role="group"
                              >
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/sportswear-tops-t-shirts-43h4uz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="5"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx={0}
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Nike Sportswear
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/jordan-tops-t-shirts-37eefz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="5"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="1"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Jordan
                                  </span>
                                </a>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/converse-tops-t-shirts-9om13zakmjx"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="5"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="2"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Converse
                                  </span>
                                </button>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/nikelab-tops-t-shirts-9kb2rz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="5"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="3"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    NikeLab
                                  </span>
                                </button>
                                <div className="show-more__wrapper css-1xa4j0i">
                                  <div className="show-more">
                                    <button
                                      className="show-more__trigger is-closed show-more__btn"
                                      tabIndex={0}
                                      aria-expanded="false"
                                      aria-label="More Brand"
                                      aria-pressed="false"
                                    >
                                      + More
                                    </button>
                                    <div
                                      className="show-more__contentOuter"
                                      //       style="
                                      //   height: 0px;
                                      //   transition: height 400ms linear;
                                      //   overflow: hidden;
                                      // "
                                    >
                                      <div className="show-more__contentInner filter-group__content">
                                        <a
                                          aria-label="Filter for ACG"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/acg-tops-t-shirts-93bsdz9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="5"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="4"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            ACG
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Nike Pro"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/nike-pro-tops-t-shirts-3cqxfz9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="5"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="5"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Nike Pro
                                          </span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    aria-label="Less Brand"
                                    className="less-btn"
                                    // hidden=""
                                    type="button"
                                  >
                                    - Less
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="filter-group css-3d22fv border-b border-gray-500 mt-5">
                            <div
                              // aria-level="5"
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  Sports &amp; Activities&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content">
                              <div
                                aria-label="Sports &amp; Activities"
                                className="filter-group__items-group"
                                id="wallNavFG6"
                                role="group"
                              >
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/lifestyle-tops-t-shirts-13jrmz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="6"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx={0}
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Lifestyle
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/running-tops-t-shirts-37v7jz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="6"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="1"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Running
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/soccer-tops-t-shirts-1gdj0z9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="6"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="2"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Soccer
                                  </span>
                                </a>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/training-gym-tops-t-shirts-58jtoz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="6"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="3"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Training &amp; Gym
                                  </span>
                                </a>
                                <div className="show-more__wrapper css-1xa4j0i">
                                  <div className="show-more">
                                    <button
                                      className="show-more__trigger is-closed show-more__btn"
                                      tabIndex={0}
                                      aria-expanded="false"
                                      aria-label="More Sports &amp; Activities"
                                      aria-pressed="false"
                                    >
                                      + More
                                    </button>
                                    <div
                                      className="show-more__contentOuter"
                                      //       style="
                                      //   height: 0px;
                                      //   transition: height 400ms linear;
                                      //   overflow: hidden;
                                      // "
                                    >
                                      <div className="show-more__contentInner filter-group__content">
                                        <a
                                          aria-label="Filter for Yoga"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/yoga-tops-t-shirts-9om13zanrlj"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="4"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Yoga
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Basketball"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/basketball-tops-t-shirts-3glsmz9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="5"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Basketball
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Football"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/football-tops-t-shirts-3hj8mz9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="6"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Football
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Baseball"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/baseball-tops-t-shirts-99fchz9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="7"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Baseball
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Golf"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/golf-tops-t-shirts-23q9wz9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="8"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Golf
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Skateboarding"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/skateboarding-tops-t-shirts-8mfrfz9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="9"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Skateboarding
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Tennis"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/tennis-tops-t-shirts-9om13zed1q"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="10"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Tennis
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Track &amp; Field"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/track-field-tops-t-shirts-7nem3z9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="11"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Track &amp; Field
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Walking"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/walking-tops-t-shirts-9om13zb3e0k"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="12"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Walking
                                          </span>
                                        </a>
                                        <a
                                          aria-label="Filter for Volleyball"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/volleyball-tops-t-shirts-9om13ztc2u"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="13"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Volleyball
                                          </span>
                                        </a>
                                        <button
                                          aria-label="Filter for Swimming"
                                          className="filter-item is--default is--button css-1v0i2t4"
                                          data-url="https://www.nike.com/w/surf-swimming-tops-t-shirts-3c2djz9om13"
                                          role="checkbox"
                                          type="button"
                                          aria-checked="false"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="14"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Swimming
                                          </span>
                                        </button>
                                        <a
                                          aria-label="Filter for Dance"
                                          className="is--link filter-item is--default css-1v0i2t4"
                                          href="https://www.nike.com/w/dance-tops-t-shirts-3cii8z9om13"
                                          aria-checked="false"
                                          role="checkbox"
                                          data-group-ndx="6"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="15"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Dance
                                          </span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    aria-label="Less Sports &amp; Activities"
                                    className="less-btn"
                                    // hidden=""
                                    type="button"
                                  >
                                    - Less
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="filter-group css-3d22fv border-b border-gray-500 mt-5">
                            <div
                              // aria-level="5"
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  More Sizes&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content">
                              <div
                                aria-label="More Sizes"
                                className="filter-group__items-group"
                                id="wallNavFG7"
                                role="group"
                              >
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/big-tall-tops-t-shirts-9om13zau499"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="7"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx={0}
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Big &amp; Tall
                                  </span>
                                </button>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/plus-size-tops-t-shirts-8mjm2z9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="7"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="1"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Plus Size
                                  </span>
                                </a>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/extended-sizes-tops-t-shirts-82dulz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="7"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="2"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Extended Sizes
                                  </span>
                                </button>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/maternity-tops-t-shirts-9om13zfl9s"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="7"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="3"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Maternity
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="filter-group css-3d22fv border-b border-gray-500 mt-5">
                            <div
                              // aria-level="5"
                              className="filter-group__label headline-5"
                              role="heading"
                            >
                              <div className="trigger-content">
                                <div className="font-medium">
                                  Fit&nbsp;
                                  <div className="filter-group__count is--hidden">
                                    (0)
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-group__content">
                              <div
                                aria-label="Fit"
                                className="filter-group__items-group"
                                id="wallNavFG8"
                                role="group"
                              >
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/oversized-tops-t-shirts-3nghfz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="8"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx={0}
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Oversized
                                  </span>
                                </button>
                                <a
                                  aria-label=""
                                  className="is--link filter-item is--default css-1v0i2t4"
                                  href="https://www.nike.com/w/loose-tops-t-shirts-4b30cz9om13"
                                  aria-checked="false"
                                  role="checkbox"
                                  data-group-ndx="8"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="1"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Loose
                                  </span>
                                </a>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/standard-tops-t-shirts-7ooj3z9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="8"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="2"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Standard
                                  </span>
                                </button>
                                <button
                                  aria-label=""
                                  className="filter-item is--default is--button css-1v0i2t4"
                                  data-url="https://www.nike.com/w/slim-tops-t-shirts-6gnxjz9om13"
                                  role="checkbox"
                                  type="button"
                                  aria-checked="false"
                                  data-group-ndx="8"
                                  data-group-type="filter"
                                  data-is-color="false"
                                  data-ndx="3"
                                >
                                  <div className="pseudo-checkbox css-1bppeb5"></div>
                                  <span className="filter-item__item-label">
                                    Slim
                                  </span>
                                </button>
                                <div className="show-more__wrapper css-1xa4j0i">
                                  <div className="show-more">
                                    <button
                                      className="show-more__trigger is-closed show-more__btn"
                                      tabIndex={0}
                                      aria-expanded="false"
                                      aria-label="More Fit"
                                      aria-pressed="false"
                                    >
                                      + More
                                    </button>
                                    <div
                                      className="show-more__contentOuter"
                                      //       style="
                                      //   height: 0px;
                                      //   transition: height 400ms linear;
                                      //   overflow: hidden;
                                      // "
                                    >
                                      <div className="show-more__contentInner filter-group__content">
                                        <button
                                          aria-label="Filter for Tight"
                                          className="filter-item is--default is--button css-1v0i2t4"
                                          data-url="https://www.nike.com/w/tight-tops-t-shirts-2vofpz9om13"
                                          role="checkbox"
                                          type="button"
                                          aria-checked="false"
                                          data-group-ndx="8"
                                          data-group-type="filter"
                                          data-is-color="false"
                                          data-ndx="4"
                                        >
                                          <div className="pseudo-checkbox css-1bppeb5"></div>
                                          <span className="filter-item__item-label">
                                            Tight
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    aria-label="Less Fit"
                                    className="less-btn"
                                    // hidden=""
                                    type="button"
                                  >
                                    - Less
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <nav className="results-nav-sub-nav css-c612cf flex justify-end px-6 py-4 gap-x-4">
                    <Button
                      aria-label="Apply Filters"
                      className="results-nav-sub-nav__btn is--apply is--full-width"
                      type="button"
                      variant="outline"
                      fullWidth
                    >
                      Clear
                    </Button>
                    <Button
                      aria-label="Apply Filters"
                      className="results-nav-sub-nav__btn is--apply is--full-width"
                      type="button"
                      fullWidth
                    >
                      Apply
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        <ProductFiltersSidebar
          data={data}
          filters={filters}
          // handleSorterChange={handleSorterChange}
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

"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import ProductCard from "@/components/common/product/product-card/product-card";
import { IProduct } from "@/models/product.model";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

const page = () => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 960);

  const [filters, setFilters] = useState<{
    // search: string;
    category: string[];
    color: string[];
    size: string[];
    price: string;
  }>({
    // search: "",
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
            } else {
              return 0;
            }
          });
          console.log("🚀 ~ filtered=filtered.sort ~ filtered:BOBO", filtered);

          //   return filtered;
        }

        // if(filters.)

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

    if (filterKey === "price") {
      // const priceRange = e.target.value.split("-");
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
                  />
                </div>
              </nav>
            </div>
          </header>
        </div>
      </section>
      <div className="flex">
        <div>
          <label>
            <input
              type="radio"
              name="price"
              value="asc"
              onChange={(e) => handleFilterChange(e, "price")}
              checked={filters.price === "asc"}
            />
            Prix croissant
          </label>

          <label>
            <input
              type="radio"
              name="price"
              value="desc"
              onChange={(e) => handleFilterChange(e, "price")}
              checked={filters.price === "desc"}
            />
            Prix décroissant
          </label>
        </div>
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

const ProductFilterButton = ({
  setShowSidebar,
  isLargeScreen,
  showSidebar,
}: any) => {
  return (
    <button
      aria-controls="left-nav"
      aria-describedby="Nike-Tech-Clothing"
      aria-expanded="true"
      aria-label="Hide Filters"
      className={`flex ${!isLargeScreen ? "border border-gray-400 rounded-full justify-center items-center p-2" : "pr-6"}`}
      type="button"
      onClick={() => setShowSidebar(!showSidebar)}
    >
      <span className={`pr-2`}>
        {showSidebar && isLargeScreen
          ? "Hide Filters"
          : isLargeScreen
            ? "Show Filters"
            : "Filters"}
      </span>
      <svg
        aria-hidden="true"
        className="icon-filter-ds"
        focusable="false"
        viewBox="0 0 24 24"
        role="img"
        width="24px"
        height="24px"
        fill="none"
      >
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M21 8.25H10m-5.25 0H3"
        ></path>
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
          clip-rule="evenodd"
        ></path>
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M3 15.75h10.75m5 0H21"
        ></path>
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  );
};
const ProductSortButton = ({ showDropdown, setShowDropdown }: any) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Ajoute l'écouteur d'événements
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Nettoie l'écouteur d'événements lors du démontage du composant
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <SortButton
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        ref={buttonRef}
      />
      <SortDropdownMenu showDropdown={showDropdown} ref={dropdownRef} />
    </>
  );
};

interface SortButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortButton = forwardRef<HTMLButtonElement, SortButtonProps>(
  ({ showDropdown, setShowDropdown, ...props }, ref) => {
    return (
      <button
        aria-controls="sort-options"
        aria-expanded={showDropdown}
        aria-label="Sort By"
        id="dropdown-btn"
        role="listbox"
        tabIndex={0}
        type="button"
        ref={ref}
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
        {...props}
      >
        <span className="flex">
          <span className="pr-2">Sort By</span>
          <span>
            <ChevronDown
              className={`transform transition-transform ${showDropdown ? "-rotate-180" : "rotate-0"} cursor-pointer`}
            />
          </span>
        </span>
      </button>
    );
  }
);

const SortDropdownMenu = forwardRef<
  HTMLDivElement,
  {
    showDropdown: boolean;
  }
>(({ showDropdown }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-white shadow-sm absolute w-max top-full overflow-hidden flex flex-col p-6 rounded-lg right-0 ${showDropdown ? "visible" : "hidden"}`}
      aria-labelledby="dropdown-btn"
      id="sort-options"
      role="menu"
    >
      <button
        aria-hidden="false"
        aria-label="Featured"
        className="text-end hover:opacity-55 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        data-ndx="0"
        role="menuitem"
        tabIndex={-1}
        type="button"
        value=""
        disabled
      >
        Featured
      </button>
      <button
        aria-hidden="false"
        aria-label="Newest"
        className="text-end hover:opacity-55 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        data-ndx="1"
        role="menuitem"
        tabIndex={-1}
        type="button"
        value="newest"
        disabled
      >
        Newest
      </button>
      <button
        aria-hidden="false"
        aria-label="Price: High-Low"
        className="text-end hover:opacity-55 transition-opacity"
        data-ndx="2"
        role="menuitem"
        tabIndex={-1}
        type="button"
        value="priceDesc"
      >
        Price: High-Low
      </button>
      <button
        aria-hidden="false"
        aria-label="Price: Low-High"
        className="text-end hover:opacity-55 transition-opacity"
        data-ndx="3"
        role="menuitem"
        tabIndex={-1}
        type="button"
        value="priceAsc"
      >
        Price: Low-High
      </button>
    </div>
  );
});

const ProductsList = ({
  showSidebar,
  isLargeScreen,
  filteredProducts,
}: any) => {
  return (
    <section
      className={`grid grid-cols-2 min-[960px]:grid-cols-3 gap-4 px-11 bg-warning w-full h-screen overflow-y-auto ${showSidebar && isLargeScreen ? "w-[83%]" : "w-full"} transition-all duration-200`}
    >
      {filteredProducts?.map((product: IProduct) => (
        <ProductCard product={product} key={Number(product._id)} />
      ))}
    </section>
  );
};

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

const ProductFiltersSidebar = ({
  showSidebar,
  isLargeScreen,
  data,
  filters,
  handleFilterChange,
}: any) => {
  return (
    <aside
      className={`h-screen overflow-y-auto bg-blue-200 ${
        showSidebar && isLargeScreen
          ? "w-[260px] pl-12 pb-4 translate-x-0"
          : "w-0 p-0 -translate-x-full "
      }  transform transition-all duration-200 `}
    >
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
    </aside>
  );
};

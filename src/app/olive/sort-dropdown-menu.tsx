"use client";
import { forwardRef } from "react";
import ProductSorter from "./product-sorter";

interface SortDropdownMenuProps {
  showDropdown: boolean;
  setShowDropdown: any;
  handleSorterChange: any;
  filters: any;
  isLargeScreen: boolean;
}

const SortDropdownMenu = forwardRef<HTMLDivElement, SortDropdownMenuProps>(
  (
    {
      showDropdown,
      setShowDropdown,
      handleSorterChange,
      filters,
      isLargeScreen,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`bg-white shadow-sm absolute w-max top-full overflow-hidden flex flex-col p-6 rounded-lg right-0 ${showDropdown ? "visible" : "hidden"}`}
        aria-labelledby="dropdown-btn"
        id="sort-options"
        role="menu"
      >
        <ProductSorter
          setShowDropdown={setShowDropdown}
          handleSorterChange={handleSorterChange}
          filters={filters}
          isLargeScreen={isLargeScreen}
        />
        {/* <label
          className={`cursor-pointer text-end hover:opacity-55 transition-opacity ${filters.price === "featured" ? "text-gray-500" : "text-black-200"}`}
        >
          <input
            type="radio"
            name="sortBy"
            value="featured"
            aria-label="featured"
            tabIndex={1}
            onChange={(e) => {
              handleSorterChange(e, "price");
              setShowDropdown(false);
            }}
            checked={filters.price === "featured"}
            hidden
          />
          Featured
        </label>
        <label
          className={`cursor-pointer text-end hover:opacity-55 transition-opacity ${filters.price === "newest" ? "text-gray-500" : "text-black-200"}`}
        >
          <input
            type="radio"
            name="sortBy"
            value="newest"
            aria-label="Newest"
            tabIndex={1}
            onChange={(e) => {
              handleSorterChange(e, "price");
              setShowDropdown(false);
            }}
            checked={filters.price === "newest"}
            hidden
          />
          Newest
        </label>
        <label
          className={`cursor-pointer text-end hover:opacity-55 transition-opacity ${filters.price === "desc" ? "text-gray-500" : "text-black-200"}`}
        >
          <input
            type="radio"
            name="sortBy"
            value="desc"
            aria-label="Price: Low-High"
            tabIndex={1}
            onChange={(e) => {
              handleSorterChange(e, "price");
              setShowDropdown(false);
            }}
            checked={filters.price === "desc"}
            hidden
          />
          Price: High-Low
        </label>
        <label
          className={`cursor-pointer text-end hover:opacity-55 transition-opacity ${filters.price === "asc" ? "text-gray-500" : "text-black-200"}`}
        >
          <input
            type="radio"
            name="sortBy"
            value="asc"
            aria-label="Price: Low-High"
            tabIndex={1}
            onChange={(e) => {
              handleSorterChange(e, "price");
              setShowDropdown(false);
            }}
            checked={filters.price === "asc"}
            hidden
          />
          Price: Low-High
        </label> */}
      </div>
    );
  }
);

export default SortDropdownMenu;

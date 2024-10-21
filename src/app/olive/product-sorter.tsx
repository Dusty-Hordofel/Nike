import React from "react";

const ProductSorter = ({
  setShowDropdown,
  handleSorterChange,
  filters,
  isLargeScreen,
}: any) => {
  return (
    <div className={`flex flex-col bg-orange `}>
      <label
        className={`cursor-pointer hover:opacity-55 transition-opacity ${isLargeScreen && filters.price === "featured" ? "text-gray-500" : "text-black-200"} ${isLargeScreen ? "text-end" : "flex items-center gap-x-[6px] text-start mt-3 mb-2"}`}
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
          className="custom-radio"
          hidden={isLargeScreen}
        />
        Featured
      </label>
      <label
        className={`cursor-pointer hover:opacity-55 transition-opacity ${isLargeScreen && filters.price === "newest" ? "text-gray-500" : "text-black-200"} ${isLargeScreen ? "text-end" : "flex items-center gap-x-[6px] text-start mt-3 mb-2"}`}
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
          className="custom-radio"
          hidden={isLargeScreen}
        />
        Newest
      </label>
      <label
        className={`cursor-pointer hover:opacity-55 transition-opacity ${isLargeScreen && filters.price === "desc" ? "text-gray-500" : "text-black-200"} ${isLargeScreen ? "text-end" : "flex items-center gap-x-[6px] text-start mt-3 mb-2"}`}
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
          className="custom-radio"
          hidden={isLargeScreen}
        />
        Price: High-Low
      </label>
      <label
        className={`cursor-pointer hover:opacity-55 transition-opacity ${isLargeScreen && filters.price === "asc" ? "text-gray-500" : "text-black-200"} ${isLargeScreen ? "text-end" : "flex items-center gap-x-[6px] text-start mt-3 mb-2"}`}
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
          className="custom-radio"
          hidden={isLargeScreen}
        />
        Price: Low-High
      </label>
    </div>
  );
};

export default ProductSorter;

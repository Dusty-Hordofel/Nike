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
        className={`bg-white shadow-sm absolute w-max top-full overflow-hidden flex flex-col p-6 rounded-lg right-0 ${
          showDropdown ? "visible" : "hidden"
        }`}
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
      </div>
    );
  }
);

SortDropdownMenu.displayName = "SortDropdownMenu";
export default SortDropdownMenu;

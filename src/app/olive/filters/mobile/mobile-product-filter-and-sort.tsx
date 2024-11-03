import { Button } from "@/components/ui/buttons/button/button";
import React from "react";
import MobileProductSorter from "./mobile-product-sorter";
import MobileProductFilter from "./mobile-product-filter";

type MobileProductFilterProps = {};

const MobileProductFilterAndSort = ({
  isLargeScreen,
  showSidebar,
  setShowSidebar,
  filters,
  setShowDropdown,
  handleSorterChange,
  data,
  handleFilterChange,
}: any) => {
  return (
    <div
      // change  showSidebar , use mobile state  variable
      className={`${!isLargeScreen && showSidebar ? "fixed inset-0 overflow-x-hidden z-50 bg-white overflow-y-auto" : "hidden"}`}
    >
      <div>
        <div>
          <nav className="flex justify-end relative">
            <button
              className="mobile-results-nav__close-btn p-5 absolute"
              type="button"
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            >
              <svg fill="#111" viewBox="0 0 24 24" width={32} height={32}>
                <path d="M12 0C9.813 0 7.8.533 5.96 1.6A11.793 11.793 0 0 0 1.6 5.96C.533 7.8 0 9.813 0 12s.533 4.2 1.6 6.04a11.793 11.793 0 0 0 4.36 4.36C7.8 23.467 9.813 24 12 24s4.2-.533 6.04-1.6a11.793 11.793 0 0 0 4.36-4.36C23.467 16.2 24 14.187 24 12s-.533-4.2-1.6-6.04a11.793 11.793 0 0 0-4.36-4.36C16.2.533 14.187 0 12 0zm5.2 15.28l-1.92 1.92L12 13.84 8.72 17.2 6.8 15.28 10.16 12 6.8 8.72 8.72 6.8 12 10.08l3.28-3.28 1.92 1.92L13.92 12l3.28 3.28z"></path>
              </svg>
            </button>
          </nav>
          <div className="px-5">
            <h1 className=" pt-9 pb-5">Filter</h1>

            <div>
              <MobileProductSorter
                filters={filters}
                isLargeScreen={isLargeScreen}
                setShowDropdown={setShowDropdown}
                handleSorterChange={handleSorterChange}
              />
              <MobileProductFilter
                data={data}
                filters={filters}
                isLargeScreen={isLargeScreen}
                handleFilterChange={handleFilterChange}
              />
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
  );
};

export default MobileProductFilterAndSort;

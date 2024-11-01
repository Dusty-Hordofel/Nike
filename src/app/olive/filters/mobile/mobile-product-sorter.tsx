import React from "react";
import ProductSorter from "../../sorting/product-sorter";

type MobileProductSorterProps = {};

const MobileProductSorter = ({
  filters,
  isLargeScreen,
  setShowDropdown,
  handleSorterChange,
}: any) => {
  return (
    <div className={`border-b border-gray-300 mt-3 pb-10 bg-warning`}>
      <fieldset aria-label="Sort By">
        <legend className="font-medium">
          <h3>Sort By</h3>
        </legend>
        <ProductSorter
          filters={filters}
          isLargeScreen={isLargeScreen}
          setShowDropdown={setShowDropdown}
          handleSorterChange={handleSorterChange}
        />
      </fieldset>
    </div>
  );
};

export default MobileProductSorter;

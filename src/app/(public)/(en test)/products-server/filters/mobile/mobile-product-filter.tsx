import React from "react";
import { BrandFilter, CategoryFilter, ColorsFilter, SizesFilter } from "..";

type MobileProductFilterProps = {};

const MobileProductFilter = ({
  isLargeScreen,
  filters,
  data,
  handleFilterChange,
}: any) => {
  return (
    <>
      <CategoryFilter
        data={data}
        filters={filters}
        isLargeScreen={isLargeScreen}
        handleFilterChange={handleFilterChange}
      />

      <ColorsFilter
        colors={data.colors}
        filters={filters}
        isLargeScreen={isLargeScreen}
        handleFilterChange={handleFilterChange}
      />
      <BrandFilter
        data={data}
        filters={filters}
        isLargeScreen={isLargeScreen}
        handleFilterChange={handleFilterChange}
      />

      <SizesFilter
        data={data}
        filters={filters}
        isLargeScreen={isLargeScreen}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};

export default MobileProductFilter;

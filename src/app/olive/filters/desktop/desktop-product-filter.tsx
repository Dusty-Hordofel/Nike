import React from "react";
import {
  BrandFilter,
  CategoryFilter,
  ColorsFilter,
  SizesFilter,
  SubCategoryFilter,
} from "..";

const DesktopProductFilter = ({
  isLargeScreen,
  filters,
  data,
  handleFilterChange,
  handleSubCategoryChange,
}: any) => {
  return (
    <>
      <SubCategoryFilter
        data={data}
        filters={filters}
        handleSubCategoryChange={handleSubCategoryChange}
      />
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

export default DesktopProductFilter;

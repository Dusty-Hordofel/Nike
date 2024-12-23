"use client";

import DesktopProductFilter from "./filters/desktop/desktop-product-filter";

// import DesktopProductFilter from "./filters/desktop/desktop-product-filter";

const ProductFilterSidebar = ({
  showSidebar,
  isLargeScreen,
  data,
  filters,
  handleFilterChange,
  handleSubCategoryChange,
}: {
  data: any;
  isLargeScreen: boolean;
  showSidebar: boolean;
  filters: any;
  handleFilterChange: any;
  handleSubCategoryChange: any;
}) => {
  return (
    <aside
      className={` sticky top-[56px] z-10 h-[calc(100vh-56px)] -translate-x-full transform transition-all duration-300 overflow-y-auto  ${
        showSidebar && isLargeScreen
          ? "w-[240px] translate-x-0 pl-12 pb-4 custom-scrollbar"
          : "w-0 p-0 -translate-x-full "
      }`}
    >
      <DesktopProductFilter
        data={data}
        filters={filters}
        isLargeScreen={isLargeScreen}
        handleFilterChange={handleFilterChange}
        handleSubCategoryChange={handleSubCategoryChange}
      />
    </aside>
  );
};

export default ProductFilterSidebar;

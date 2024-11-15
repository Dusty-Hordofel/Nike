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
      // className={`-translate-x-full max-w-[240px] w-full`}
      // className={`h-screen ${
      //   showSidebar && isLargeScreen
      //     ? "max-w-[240px] w-full pl-12 pb-4 translate-x-0"
      //     : "w-0 p-0 -translate-x-full invisible"
      // } transform transition-all duration-200 `}
      // className={`h-screen overflow-y-auto bg-blue-200 ${
      //   showSidebar && isLargeScreen
      //     ? "max-w-[240px] w-full pl-12 pb-4 translate-x-0"
      //     : "w-0 p-0 -translate-x-full "
      // }  transform transition-all duration-200 custom-scrollbar sticky top-[56px] z-10`}
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

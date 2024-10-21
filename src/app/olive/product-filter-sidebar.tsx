"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ProductFilterSidebar = ({
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

export default ProductFilterSidebar;

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
        {data?.categories.map((category: any) => (
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

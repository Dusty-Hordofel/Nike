"use client";
import { Product } from "@/@types/admin/admin.products.interface";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ProductFilterSidebar = ({
  showSidebar,
  isLargeScreen,
  data,
  filters,
  handleFilterChange,
}: {
  data: any;
  isLargeScreen: boolean;
  showSidebar: boolean;
  filters: any;
  handleFilterChange: any;
}) => {
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
        colors={data.colors}
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

interface ColorsProps {
  filters: any;
  handleFilterChange: any;
  colors: {
    _id: string;
    name: string;
    hexCode: string;
    image: string;
  }[];
}
const ColorsFilter = ({ colors, filters, handleFilterChange }: ColorsProps) => {
  // console.log("🚀 ~ ColorsFilter ~ data:COLOR", colors);
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
        className={`${show ? "opacity-100 delay-200 max-h-auto pb-5" : "opacity-0  max-h-0"} transition-all cursor-pointer flex gap-x-4 flex-wrap`}
      >
        {colors?.map(({ _id, name, hexCode }) => (
          <li key={_id} className="cursor-pointer text-center">
            {/* htmlFor={`${name}-${_id}`}  */}
            <label className="cursor-pointer group ">
              <input
                type="checkbox"
                name="filter"
                // id={`${name}-${_id}`}
                checked={filters.color.includes(hexCode)}
                value={hexCode}
                onChange={(e) => handleFilterChange(e, "color")}
                className="custom-radio "
                // absolute
                style={{ width: "40px", height: "40px" }}
                hidden
              />
              <span
                className="size-10 block rounded-full relative"
                style={{ backgroundColor: hexCode }}
              ></span>
              <span className="text-xs group-hover:opacity-50">{name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

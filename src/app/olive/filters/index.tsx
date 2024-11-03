"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

const BrandFilter = ({
  data,
  filters,
  handleFilterChange,
  isLargeScreen,
}: any) => {
  //   console.log("🚀 ~ BrandFilter ~ data:BRANDS", data.brands);
  const [show, setShow] = useState(false);

  return (
    <div className={`border-b border-gray-300 `}>
      <h3 className="font-medium py-3 flex justify-between">
        Brands
        {isLargeScreen && (
          <span onClick={() => setShow(!show)}>
            <ChevronDown
              className={`transform  transition-transform ${show ? "-rotate-180" : "rotate-0"} cursor-pointer`}
            />
          </span>
        )}
      </h3>

      <ul
        className={`${(show && isLargeScreen) || !isLargeScreen ? "opacity-100 delay-200 max-h-auto pb-5" : "opacity-0  max-h-0"}  transition-all`}
      >
        {data.brands.map((brand: any, index: number) => (
          <li key={`${brand}${index}`}>
            <input
              type="checkbox"
              name="brand"
              id={`${brand}${index}`}
              checked={filters.brand.includes(brand)}
              value={brand}
              onChange={(e) => handleFilterChange(e, "brand")}
              className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 self-center mr-[6px] cursor-pointer"
            />
            <label
              htmlFor={`${brand}${index}`}
              className="cursor-pointer hover:opacity-50"
            >
              {brand}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CategoryFilter = ({
  data,
  filters,
  handleFilterChange,
  isLargeScreen,
}: any) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`border-b border-gray-300 `}>
      <h3 className="font-medium py-3  flex justify-between">
        Category
        {isLargeScreen && (
          <span onClick={() => setShow(!show)}>
            <ChevronDown
              className={`transform  transition-transform ${show ? "-rotate-180" : "rotate-0"} cursor-pointer`}
            />
          </span>
        )}
      </h3>

      <ul
        className={`${(show && isLargeScreen) || !isLargeScreen ? "opacity-100 delay-200 max-h-auto pb-5" : "opacity-0  max-h-0"}  transition-all`}
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

interface ColorsProps {
  filters: any;
  handleFilterChange: any;
  colors: {
    _id: string;
    name: string;
    hexCode: string;
    image: string;
  }[];
  isLargeScreen: boolean;
}

const ColorsFilter = ({
  colors,
  filters,
  handleFilterChange,
  isLargeScreen,
}: ColorsProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`border-b border-gray-300 `}>
      <h3 className="font-medium py-3  flex justify-between">
        Colors
        {isLargeScreen && (
          <span onClick={() => setShow(!show)}>
            <ChevronDown
              className={`transform  transition-transform ${show ? "-rotate-180" : "rotate-0"} cursor-pointer`}
            />
          </span>
        )}
      </h3>

      <ul
        className={`${(show && isLargeScreen) || !isLargeScreen ? "opacity-100 delay-200 max-h-auto pb-5" : "opacity-0  max-h-0"} transition-all cursor-pointer flex gap-x-4 flex-wrap`}
      >
        {colors?.map(({ _id, name, hexCode }) => (
          <li key={_id} className="cursor-pointer text-center">
            <label className="cursor-pointer group ">
              <input
                type="checkbox"
                name="filter"
                checked={filters.color.includes(hexCode)}
                value={hexCode}
                onChange={(e) => handleFilterChange(e, "color")}
                className="custom-radio "
                style={{ width: "40px", height: "40px" }}
                hidden
              />
              <div
                className="size-10  rounded-full relative flex justify-center items-center"
                style={{ backgroundColor: hexCode }}
              >
                {filters.color.includes(hexCode) && (
                  <Check
                    color="#ffffff"
                    strokeWidth={3}
                    className="checkbox-animation"
                  />
                )}
              </div>
              <span className="text-xs group-hover:opacity-50">{name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SizesFilter = ({
  data,
  filters,
  handleFilterChange,
  isLargeScreen,
}: any) => {
  const [show, setShow] = useState(false);

  return (
    <div
    // className={`border-b border-gray-300 `}
    >
      <h3 className="font-medium py-3 flex justify-between">
        Sizes
        {isLargeScreen && (
          <span onClick={() => setShow(!show)}>
            <ChevronDown
              className={`transform  transition-transform ${show ? "-rotate-180" : "rotate-0"} cursor-pointer`}
            />
          </span>
        )}
      </h3>

      <ul
        className={`${(show && isLargeScreen) || !isLargeScreen ? "opacity-100 delay-200 max-h-auto pb-5" : "opacity-0  max-h-0"}  transition-all`}
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

const SubCategoryFilter = ({ data, filters, handleSubCategoryChange }: any) => {
  return (
    <div className={`border-b border-gray-300 `}>
      <ul className="pb-5">
        {data?.subCategories?.map((subCategory: any) => {
          return (
            <li
              key={subCategory._id}
              className={`flex pb-[10px] font-medium ${filters.subcategory === subCategory._id && "underline underline-offset-4"}`}
            >
              <input
                type="radio"
                name="subcategory"
                id={subCategory._id}
                value={subCategory._id}
                checked={filters.subcategory === subCategory._id}
                onChange={handleSubCategoryChange}
                className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 self-center mr-[6px]"
                hidden
              />
              <label
                className="cursor-pointer hover:opacity-50"
                htmlFor={subCategory._id}
              >
                {subCategory.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export {
  BrandFilter,
  CategoryFilter,
  ColorsFilter,
  SizesFilter,
  SubCategoryFilter,
};

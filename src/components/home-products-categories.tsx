import { ECommerceSite } from "@/assets/data/products";
import Link from "next/link";
import React from "react";

const HomeProductsCategories = ({
  categories,
}: {
  categories: ECommerceSite;
}) => {
  return (
    <ul className="grid grid-cols-4 w-[920px] mx-auto gap-x-10 px-5 h-[197px] hover:h-[903px] overflow-hidden group transition-all ">
      {categories.map(({ name, products }, index) => (
        <li key={index}>
          <h4 className="text-xl font-medium mb-6">{name}</h4>
          <ul className="">
            {products.map(({ name, url }) => (
              <li
                className="mb-3 text-gray-500 leading-7 text-nowrap truncate  group-hover:text-wrap hover:text-black-200"
                key={name}
              >
                <Link href={url} className="">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default HomeProductsCategories;

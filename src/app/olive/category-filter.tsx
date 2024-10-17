"use client";
import { ICategory } from "@/models/category.model";
import { ISubCategory } from "@/models/subcategory.model";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const CategoryFilter = ({
  categories,
  subCategories,
}: {
  categories: ICategory[];
  subCategories: ISubCategory[];
}) => {
  console.log("🚀 ~ subCategories:SUB", subCategories);
  console.log("🚀 ~ CategoryFilter ~ categories:CATOS", categories);
  const [show, setShow] = useState(true);
  return (
    <div>
      {/* CategoryFilter */}
      <div className="">
        <h3>
          Category <span>{show ? "-" : "+"}</span>
        </h3>

        <ul>
          {show &&
            categories.map((category, i) => (
              <li>
                <input
                  type="checkbox"
                  name="filter"
                  id={category._id}
                  // checked={check.active}
                />
                <label htmlFor={category._id}>{category.name}</label>
                <span>{show ? "-" : "+"}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

{
  /* <Card
            key={i}
            category={category}
            subCategories={subCategories}
            categoryHandler={categoryHandler}
            replaceQuery={replaceQuery}
          /> */
}

export default CategoryFilter;

"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import ProductUnavailable from "./product-unavailable";

type ProductColorsProps = {
  slug: string;
  selectedColor: string;
  productQuantity: number | undefined;
  setProductQuantity: any;
  colors: any;
};

const ProductColors = ({
  slug,
  colors,
  selectedColor,
  productQuantity,
  setProductQuantity,
}: ProductColorsProps) => {
  const [activeColor, setActiveColor] = useState(0);

  const handleResetSelection = (index: number) => {
    setProductQuantity(undefined);
    setActiveColor(index);
  };

  return (
    <div className="flex gap-2 my-8">
      {colors.map(({ image, hexCode, name, _id }: any, index: number) => {
        return (
          <Link
            aria-label={name}
            className="product-card__img-link-overlay relative"
            data-el-type="Hero"
            data-testid="product-card__image-link"
            key={_id}
            href={`/products/${slug}?color=${name.toLocaleLowerCase()}`}
          >
            <Image
              src={image}
              alt=""
              width={70.3984}
              height={70.3984}
              className={cn(
                selectedColor === name.toLowerCase() && "border-2",
                "w-[70.3984px] h-[70.3984px] object-cover rounded hover:border border-black-200"
              )}
              onClick={() => handleResetSelection(index)}
            />

            {productQuantity !== undefined &&
              productQuantity < 1 &&
              activeColor === index && <ProductUnavailable />}
          </Link>
        );
      })}
    </div>
  );
};

export default ProductColors;

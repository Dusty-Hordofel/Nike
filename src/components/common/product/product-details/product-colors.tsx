"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

type ProductColorsProps = {
  slug: string;
  subProducts: any;
  name: string;
  selectedColor: string;
};

const ProductColors = ({ slug, colors, selectedColor }: any) => {
  return (
    // pb-[10px]
    <div className="flex gap-2 my-8">
      {colors.map(({ image, hexCode, name, _id }: any, index: number) => {
        return (
          <Link
            aria-label={name}
            className="product-card__img-link-overlay"
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
                selectedColor === name.toLocaleLowerCase() &&
                  "border-2 border-black-200",
                "w-[70.3984px] h-[70.3984px] object-cover rounded hover:border-black-200 border"
              )}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ProductColors;

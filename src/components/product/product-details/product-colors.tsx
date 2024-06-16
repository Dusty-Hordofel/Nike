"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

type ProductColorsProps = {
  slug: string;
  subProducts: any;
  name: string;
  productStyle: number;
};

const ProductColors = ({ slug, colors, productStyle, name }: any) => {
  const [colorVariants, setColorVariants] = useState<any>(colors);

  return (
    <div className="flex gap-2 pb-[10px]">
      {colorVariants.map(({ image, color }: any, index: number) => (
        <Link
          aria-label={name}
          className="product-card__img-link-overlay"
          data-el-type="Hero"
          data-testid="product-card__image-link"
          key={`${name} ${color}`}
          href={`/products/${slug}?style=${index}`}
        >
          <Image
            src={image}
            alt=""
            width={70.3984}
            height={70.3984}
            className={cn(
              productStyle === index && "border border-black-200",
              "w-[70.3984px] h-[70.3984px] object-cover rounded hover:border-black-200 border"
            )}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductColors;

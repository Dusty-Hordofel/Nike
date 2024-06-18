"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductsAndSizesProps {
  sizesInDatabase: string[];
  slug: string;
  productStyle: number;
  selectedSize: number;
}

const ProductSizes = ({
  sizesInDatabase,
  productStyle,
  selectedSize,
  slug,
}: ProductsAndSizesProps) => {
  return (
    <div className="mt8-lg">
      <ul className="grid grid-cols-3 gap-[6px]">
        {sizesInDatabase.map((size, index) => (
          <Link
            aria-label={slug}
            className="product-card__img-link-overlay group"
            data-el-type="Hero"
            data-testid="product-card__image-link"
            href={
              sizesInDatabase.includes(size)
                ? `/products/${slug}?style=${productStyle}&size=${
                    sizesInDatabase.includes(size)
                      ? sizesInDatabase.indexOf(size)
                      : null
                  }`
                : `/products/${slug}?style=${productStyle}`
            }
            scroll={false}
            key={index}
          >
            <li
              key={index}
              className={cn(
                sizesInDatabase.includes(size)
                  ? "bg-white"
                  : "bg-gray-100 text-gray-300",
                "font-normal w-[120.664px] h-[48px] flex items-center justify-center border hover:border-black-100  rounded-[4px] border-gray-200",
                sizesInDatabase.indexOf(size) === selectedSize &&
                  " border-black-100"
              )}
              style={{
                cursor: sizesInDatabase.includes(size) ? "pointer" : "default",
              }}
            >
              EU {size}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProductSizes;

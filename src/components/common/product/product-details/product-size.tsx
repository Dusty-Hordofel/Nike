"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductsAndSizesProps {
  sizesInDatabase: string[];
  slug: string;
  selectedColor: string;
  selectedSize: string;
}

const ProductSizes = ({
  sizesInDatabase,
  selectedColor,
  selectedSize,
  slug,
}: ProductsAndSizesProps) => {
  return (
    <div className="pt-3">
      <ul className="grid grid-cols-3 gap-[6px]">
        {sizesInDatabase.map((size, index) => (
          <Link
            aria-label={slug}
            className="group"
            href={
              sizesInDatabase.includes(size)
                ? `/products/${slug}?color=${selectedColor}&size=${size.toLocaleLowerCase()}`
                : `/products/${slug}?color=${selectedColor}`
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
                size.toLocaleLowerCase() === selectedSize && " border-black-100"
              )}
              style={{
                cursor: sizesInDatabase.includes(size) ? "pointer" : "default",
              }}
            >
              {size}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProductSizes;

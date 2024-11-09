"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductsAndSizesProps {
  // sizesInDatabase: string[];
  slug: string;
  sizes: {
    _id: string;
    size: string;
    qty: number;
  }[];
  selectedColor: string;
  selectedSize: string;
}

const ProductSizes = ({
  // sizesInDatabase,
  selectedColor,
  selectedSize,
  sizes,
  slug,
}: ProductsAndSizesProps) => {
  return (
    <div className="pt-3">
      <ul className="grid grid-cols-3 gap-[6px]">
        {sizes.map(({ _id, size, qty }) => (
          <Link
            aria-label={slug}
            className="group"
            href={
              selectedSize
                ? `/products/${slug}?color=${selectedColor}&size=${size.toLocaleLowerCase()}`
                : `/products/${slug}?color=${selectedColor}`
            }
            scroll={false}
            key={_id}
          >
            <li
              // key={index}
              className={cn(
                qty > 0 ? "bg-white" : "bg-gray-100 text-gray-300",
                "font-normal w-[120.664px] h-[48px] flex items-center justify-center border hover:border-black-100  rounded-[4px] border-gray-200",
                size.toLocaleLowerCase() === selectedSize && " border-black-100"
              )}
              style={{
                cursor: size ? "pointer" : "default",
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

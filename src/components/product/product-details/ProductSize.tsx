"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductsAndSizesProps {
  sizesInDatabase: string[];
  slug: string;
  productStyle: number;
  selectedSize: number;
}

const ProductSize = ({
  sizesInDatabase,
  productStyle,
  selectedSize,
  slug,
}: ProductsAndSizesProps) => {
  const excludedSizes = new Set([
    "37",
    "39.5",
    "41.5",
    "43.5",
    "46.5",
    "48",
    "49",
  ]);
  const sizesArray = Array.from({ length: 31 }, (_, index) =>
    String(35 + index * 0.5)
  );
  const filteredSizes = sizesArray.filter((size) => !excludedSizes.has(size));

  return (
    <div className="mt8-lg">
      <ul className="grid grid-cols-3 gap-[6px]">
        {filteredSizes.map((size, index) => (
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

export default ProductSize;

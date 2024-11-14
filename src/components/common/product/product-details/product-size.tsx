"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductsAndSizesProps {
  slug: string;
  sizes: {
    _id: string;
    size: string;
    qty: number;
  }[];
  selectedColor: string;
  selectedSize: string;
  setError: any;
  setProductQuantity: any;
}

const ProductSizes = ({
  selectedColor,
  selectedSize,
  sizes,
  slug,
  setError,
  setProductQuantity,
}: ProductsAndSizesProps) => {
  return (
    <div className="pt-3">
      {/* min-[960px]:gap-[6px] min-[960px]:grid-cols-3 */}
      <ul className="grid grid-cols-5  gap-2">
        {sizes.map(({ _id, size, qty }) => (
          <Link
            aria-label={slug}
            className="group"
            href={
              size
                ? `/products/${slug}?color=${selectedColor}&size=${size.toLocaleLowerCase()}`
                : `/products/${slug}?color=${selectedColor}`
            }
            scroll={false}
            key={_id}
          >
            <li
              // w-[120.664px]
              className={cn(
                qty > 0 ? "bg-white" : "bg-gray-100 text-gray-300",
                "font-normal  h-[48px] flex items-center justify-center border hover:border-black-100  rounded-[4px] border-gray-200",
                size.toLocaleLowerCase() === selectedSize && " border-black-100"
              )}
              style={{
                cursor: size ? "pointer" : "default",
              }}
              onClick={() => {
                setError("");
                setProductQuantity(qty);
                if (size && qty === 0) {
                  setError("This size is out of stock");
                }
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

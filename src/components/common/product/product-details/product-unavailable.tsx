import { cn } from "@/lib/common/utils";
import React from "react";

const ProductUnavailable = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute bg-gray-900/40 top-0 left-0 rounded-md h-full w-full",
        className
      )}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 125 125"
        preserveAspectRatio="none"
        className="p-2 z-20"
      >
        <line
          x1="125"
          y1="125"
          x2="0"
          y2="0"
          stroke="red"
          stroke-width="2"
        ></line>
      </svg>
    </div>
  );
};

export default ProductUnavailable;

import Link from "next/link";
import React from "react";

const ProductSizeGuide = () => {
  return (
    <legend className="flex items-center justify-between w-full">
      <span className="">Sélectionner la taille</span>
      <Link href="/" className="flex ">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          role="img"
          width="24px"
          height="24px"
          fill="none"
          className="pb-1"
        >
          <path
            stroke="currentColor"
            stroke-width="1.5"
            d="M21.75 10.5v6.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V10.5m3.308-2.25h12.885"
          ></path>
          <path
            stroke="currentColor"
            stroke-width="1.5"
            d="M15.79 5.599l2.652 2.65-2.652 2.653M8.21 5.599l-2.652 2.65 2.652 2.653M17.25 19v-2.5M12 19v-2.5M6.75 19v-2.5"
          ></path>
        </svg>

        <span>Guide des tailles</span>
      </Link>
    </legend>
  );
};

export default ProductSizeGuide;

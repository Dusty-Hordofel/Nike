import React from "react";
import ProductSizeGuide from "./product-size-guide";
import ProductSizes from "./product-size";

type ProductSizeSelectorProps = {
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
  error: string;
};

const ProductSizeSelector = ({
  selectedSize,
  sizes,
  selectedColor,
  slug,
  setError,
  setProductQuantity,
  error,
}: ProductSizeSelectorProps) => {
  return (
    <fieldset className={`mt-5 mb-8 max-[960px]:px-6`}>
      <ProductSizeGuide />
      <div className={`${error ? "border-red-600 border rounded-sm" : ""}`}>
        <ProductSizes
          selectedSize={selectedSize}
          sizes={sizes}
          selectedColor={selectedColor}
          slug={slug}
          setError={setError}
          setProductQuantity={setProductQuantity}
        />
      </div>
      <p
        className={`${
          error ? "block pt-3 text-red-600 font-normal" : "hidden"
        }`}
      >
        {error}
      </p>
    </fieldset>
  );
};

export default ProductSizeSelector;

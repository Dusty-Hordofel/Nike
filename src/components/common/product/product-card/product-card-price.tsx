import { ISubProduct } from "@/models/product.model";
import React from "react";

interface ProductCardPriceProps {
  prices: number[];
  subProducts: ISubProduct[];
  active: number;
}

const ProductCardPrice = ({
  prices,
  subProducts,
  active,
}: ProductCardPriceProps) => {
  return (
    <div className="product-card-prices">
      <div className="product-card-price font-medium">
        <div
          className={`${subProducts[active]?.discount ? "flex space-x-2" : ""} `}
        >
          {subProducts[active]?.discount ? (
            <span>
              {(
                prices[active] -
                prices[active] * (subProducts[active]?.discount / 100)
              ).toFixed(2)}
              &nbsp;€
            </span>
          ) : null}
          <span
            className={`${subProducts[active]?.discount ? "line-through font-light text-gray-500" : "font-medium"}`}
          >
            {prices[active]}&nbsp;€
          </span>
        </div>
      </div>
      <div className="product-card-discount-price pt-[10px]  font-medium text-green-700">
        {subProducts[active]?.discount
          ? `${subProducts[active]?.discount}% de réduction`
          : ""}
      </div>
    </div>
  );
};

export default ProductCardPrice;

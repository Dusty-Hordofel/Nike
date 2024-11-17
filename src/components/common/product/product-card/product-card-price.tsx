// import { SubProduct } from "@/models/product.model";
import { SubProduct } from "@/@types/admin/admin.products.interface";
import React from "react";

interface ProductCardPriceProps {
  subProducts: SubProduct[];
  active: number;
}

const ProductCardPrice = ({ subProducts, active }: ProductCardPriceProps) => {
  return (
    <div className="product-card-prices max-[960px]:mx-3">
      <div className="product-card-price font-medium">
        <div
          className={`${
            subProducts[active]?.discount ? "flex space-x-2" : ""
          } `}
        >
          {subProducts[active]?.discount > 0 ? (
            <span>
              {(
                subProducts[active]?.price -
                subProducts[active]?.price *
                  (subProducts[active]?.discount / 100)
              ).toFixed(2)}
              &nbsp;€
            </span>
          ) : null}
          <span
            className={`${
              subProducts[active]?.discount
                ? "line-through font-light text-gray-500"
                : "font-medium"
            }`}
          >
            {subProducts[active]?.price}&nbsp;€
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

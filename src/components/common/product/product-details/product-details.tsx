import { cn } from "@/lib/common/utils";
import React from "react";

type ProductDetailsProps = {
  name: string;
  sku: string;
  priceAfterDiscount: number;
  priceBeforeDiscount: number;
  discount: number;
  className?: string;
};

const ProductDetails = ({
  name,
  sku,
  priceAfterDiscount,
  priceBeforeDiscount,
  discount,
  className,
}: ProductDetailsProps) => {
  return (
    <div className={cn("max-[960px]:px-6", className)}>
      <p className="text-[#992E00] font-medium">Exclu membre</p>
      <div>
        <div>
          <h1 className="text-2xl">{name}</h1>
          <h2 className="pb-1">{sku}</h2>
          <h2 className="pb-1">Chaussure pour Homme</h2>
        </div>

        <div className="leading-7">
          <div style={{ display: "inline-block" }}>
            <div className="product-price__wrapper flex gap-3">
              <div className="product-price" data-test="product-price-reduced">
                {priceAfterDiscount}&nbsp;€
              </div>

              {discount > 0 && (
                <>
                  <div
                    className="product-price line-through text-gray-600"
                    data-test="product-price"
                  >
                    <span className="sr-only">Réduction de</span>
                    {priceBeforeDiscount}&nbsp;€
                  </div>
                  <p className="text-primary" data-testid="OfferPercentage">
                    <span className="text-green-700">
                      {discount}&nbsp;% de réduction
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

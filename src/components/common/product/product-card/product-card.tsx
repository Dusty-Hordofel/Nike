"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { Product } from "@/models/product.model";
import ProductCardImage from "./product-card-image";
import ProductCardPrice from "./product-card-price";
import ProductCardColor from "./product-card-color";
import ProductCardDescription from "./product-card-description";
import { Product } from "@/@types/admin/admin.products.interface";

const ProductCard = ({ product }: { product: Product }) => {
  // console.log("🚀 ~ ProductCard ~ product:FILTERCARD", product);
  const { name, subProducts, slug } = product;

  const [active, setActive] = useState(0);
  const [images, setImages] = useState(subProducts[active]?.images);

  const [productColors, setProductColors] = useState(
    subProducts.map((p) => {
      return p.color;
    })
  );

  const bestSeller = true;
  const newRelease = false;

  useEffect(() => {
    setImages(subProducts[active]?.images);
  }, [active, product, subProducts]);

  return (
    <>
      {subProducts.length > 0 && (
        <figure>
          <Link
            className="sr-only"
            data-testid="product-card-link"
            href={`/products/${slug}?style=${active}`}
            tabIndex={0}
          >
            {name}
          </Link>
          <Link
            aria-label={name}
            className="product-card-link group"
            href={`/products/${slug}?style=${active}`}
          >
            <ProductCardImage images={images} name={name} />
            <div className="product-card-info pt-3 pb-[2px] bg-success">
              {productColors.length > 1 && (
                <ProductCardColor
                  productColors={productColors}
                  subProducts={subProducts}
                  setImages={setImages}
                  setActive={setActive}
                />
              )}

              <ProductCardDescription
                name={name}
                productColors={productColors}
                bestSeller={bestSeller}
                newRelease={newRelease}
              />
              <ProductCardPrice subProducts={subProducts} active={active} />
            </div>
          </Link>
        </figure>
      )}
    </>
  );
};

export default ProductCard;

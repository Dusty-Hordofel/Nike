"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/models/Product";
import ProductCardImage from "./ProductCardImage";
import ProductCardPrice from "./ProductCardPrice";
import ProductCardColor from "./ProductCardColor";
import ProductCardDescription from "./ProductCardDescription";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { name, subProducts, slug } = product;

  const [active, setActive] = useState(0);
  const [images, setImages] = useState(subProducts[active]?.images);
  const [prices, setPrices] = useState(
    subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );

  const [productColors, setProductColors] = useState(
    subProducts.map((p) => {
      return p.color;
    })
  );

  const bestSeller = true;
  const newRelease = false;

  useEffect(() => {
    setImages(subProducts[active].images);
    setPrices(
      subProducts[active]?.sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active, product, subProducts]);

  return (
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
        <ProductCardImage images={images} name={name} active={active} />
        <div className="product-card-info pt-3 pb-[2px]">
          <ProductCardColor
            productColors={productColors}
            subProducts={subProducts}
            setImages={setImages}
            setActive={setActive}
          />

          <ProductCardDescription
            name={name}
            productColors={productColors}
            bestSeller={bestSeller}
            newRelease={newRelease}
          />
          <ProductCardPrice
            prices={prices}
            subProducts={subProducts}
            active={active}
          />
        </div>
      </Link>
    </figure>
  );
};

export default ProductCard;

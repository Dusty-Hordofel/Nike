"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductCardImage from "./product-card-image";
import ProductCardPrice from "./product-card-price";
import ProductCardColor from "./product-card-color";
import ProductCardDescription from "./product-card-description";
import { Product } from "@/@types/admin/admin.products.interface";
import useWindowSize from "@/hooks/common/use-window-size";
import {
  useGetProduct,
  usePrefetchAllProductVariants,
} from "@/hooks/user/products/use-get-product.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "@/services/client/user/products.service";

const ProductCard = ({ product }: { product: Product }) => {
  // console.log("🚀 ~ ProductCard ~ product:POPO", product);

  const queryClient = useQueryClient();

  const { name, subProducts, slug } = product;

  const [active, setActive] = useState(0);
  const [images, setImages] = useState(subProducts[active]?.images);

  const isLargeScreen = useWindowSize(960);

  const [productColors, setProductColors] = useState(
    subProducts.map((p) => p.color)
  );
  // console.log("🚀 ~ ProductCard ~ productColors:PCOLORS", productColors);

  const bestSeller = true;
  const newRelease = false;

  useEffect(() => {
    setImages((prevImages) => subProducts[active]?.images || prevImages);
    setProductColors(
      (prevProductColors) =>
        subProducts.map((p) => p.color) || prevProductColors
    );
  }, [active, product, subProducts]);

  return (
    <>
      {subProducts.length > 0 && (
        <Link
          aria-label={name}
          className="product-card-link group"
          href={`/products/${slug}?color=${productColors[0]?.name.toLocaleLowerCase()}`}
          // onMouseEnter={usePrefetchAllProductVariants()}
          onMouseEnter={() => {
            console.log("CARD", productColors);
            usePrefetchAllProductVariants(slug, productColors, queryClient);
          }}
        >
          <figure>
            <Link
              className="sr-only"
              data-testid="product-card-link"
              href={`/products/${slug}?color=${productColors[0]?.name.toLocaleLowerCase()}`}
              tabIndex={0}
            >
              {name}
            </Link>

            <ProductCardImage images={images} name={name} />
            <div className="product-card-info pt-3 pb-[2px] ">
              {productColors.length > 1 && isLargeScreen && (
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
                isLargeScreen={isLargeScreen}
              />
              <ProductCardPrice subProducts={subProducts} active={active} />
            </div>
          </figure>
        </Link>
      )}
    </>
  );
};

export default ProductCard;

"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import ProductCardImage from "./product-card-image";
import ProductCardPrice from "./product-card-price";
import ProductCardColor from "./product-card-color";
import ProductCardDescription from "./product-card-description";
import { Product } from "@/@types/admin/admin.products.interface";
import useWindowSize from "@/hooks/use-window-size";
import { usePrefetchAllProductVariants } from "@/hooks/user/products/use-get-product.hook";
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";

const ProductCard = ({ product }: { product: Product }) => {
  const { name, subProducts, slug } = product;

  const [active, setActive] = useState(0);
  const [images, setImages] = useState(subProducts[active]?.images);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [productColors, setProductColors] = useState(
    subProducts.map((p) => p.color)
  );

  const isLargeScreen = useWindowSize(960);
  const queryClient = useQueryClient();

  const bestSeller = true;
  const newRelease = false;

  useEffect(() => {
    setImages((prevImages) => subProducts[active]?.images || prevImages);
    setProductColors(
      (prevProductColors) =>
        subProducts.map((p) => p.color) || prevProductColors
    );
  }, [active, product, subProducts]);

  const prefetchData = useCallback(
    debounce(() => {
      const cacheKey = ["product", slug, productColors[0]?.name];

      const cachedData = queryClient.getQueryData(cacheKey);

      if (cachedData) {
        console.log(
          "🚀 ~ debounce ~ cachedData:",
          "Data already cached, no network call required."
        );

        return;
      }

      if (isPrefetching) return;
      setIsPrefetching(true);
      usePrefetchAllProductVariants(slug, productColors, queryClient).finally(
        () => {
          setIsPrefetching(false);
        }
      );
    }, 500),
    [slug, productColors, queryClient, isPrefetching]
  );

  const handleMouseEnter = () => {
    prefetchData();
  };

  const handleMouseLeave = () => {
    prefetchData.cancel();
    setIsPrefetching(false);
  };

  return (
    <>
      {subProducts.length > 0 && (
        <figure>
          <Link
            className="sr-only"
            href={`/products/${slug}?color=${productColors[0]?.name.toLocaleLowerCase()}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>{name}</span>
          </Link>

          <Link
            href={`/products/${slug}?color=${productColors[0]?.name.toLocaleLowerCase()}`}
            className="product-card-link group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ProductCardImage images={images} name={name} />
            <div className="product-card-info pt-3 pb-[2px]">
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
          </Link>
        </figure>
      )}
    </>
  );
};

export default ProductCard;

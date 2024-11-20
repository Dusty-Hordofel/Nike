"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductCardImage from "./product-card-image";
import ProductCardPrice from "./product-card-price";
import ProductCardColor from "./product-card-color";
import ProductCardDescription from "./product-card-description";
import { Product } from "@/@types/admin/admin.products.interface";
import useWindowSize from "@/hooks/use-window-size";
import {
  useGetProduct,
  usePrefetchAllProductVariants,
} from "@/hooks/user/products/use-get-product.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "@/services/user/products.service";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: Product }) => {
  const { name, subProducts, slug } = product;

  const [active, setActive] = useState(0);
  const [images, setImages] = useState(subProducts[active]?.images);
  console.log("🚀 ~ ProductCard ~ images:", images);

  // const
  // const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 960);
  const isLargeScreen = useWindowSize(960);

  const [productColors, setProductColors] = useState(
    subProducts.map((p) => p.color)
  );
  console.log("🚀 ~ ProductCard ~ productColors:", productColors);
  const queryClient = useQueryClient();
  const router = useRouter();
  // usePrefetchAllProductVariants

  const bestSeller = true;
  const newRelease = false;

  useEffect(() => {
    setImages((prevImages) => subProducts[active]?.images || prevImages);
    setProductColors(
      (prevProductColors) =>
        subProducts.map((p) => p.color) || prevProductColors
    );
  }, [active, product, subProducts]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsLargeScreen(window.innerWidth >= 960);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // await usePrefetchAllProductVariants(
  //   slug as string,
  //   productColors,
  //   queryClient
  // );
  // console.log("🚀 ~ ProductCard ~ matalana:LOLO BEAUTÉ", matalana);

  // useEffect(() => {
  //   const handleColorClick = async () => {
  //     const matalana = await Promise.all(
  //       productColors.map(({ name: color }) =>
  //         queryClient.prefetchQuery(["product", color, slug], () =>
  //           getProduct(slug, color)
  //         )
  //       )
  //     );
  //   };

  //   handleColorClick();
  // }, []);

  // const olo= useQuery(
  //    que ['product'],
  //     () => getProduct("","" ),

  //   );

  const handleColorClick = (
    slug: string,
    productColors: any,
    queryClient: any
  ) => {
    // Pré-chargement de toutes les variantes avant la redirection
    usePrefetchAllProductVariants(slug, productColors, queryClient);

    // Redirection vers la page produit, en ajoutant la couleur sélectionnée dans l'URL
    router.push(
      `/products/${slug}?color=${productColors[0]?.name.toLocaleLowerCase()}`
    );
  };

  return (
    <>
      {subProducts.length > 0 && (
        <figure>
          {/* <Link
            className="sr-only"
            data-testid="product-card-link"
            href={`/products/${slug}?color=${productColors[0]?.name.toLocaleLowerCase()}`}
            tabIndex={0}
          >
            {name}
          </Link> */}
          <div
            className="sr-only"
            onClick={() => {
              handleColorClick(slug, productColors, queryClient);
            }}
            // data-testid="product-card-link"
            // href={`/products/${slug}?color=${productColors[0]?.name.toLocaleLowerCase()}`}
            // tabIndex={0}
          >
            <span>{name}</span>
          </div>
          {/* <Link
            aria-label={name}
            className="product-card-link group"
            href={`/products/${slug}?color=${productColors[0]?.name.toLocaleLowerCase()}`}
          > */}
          <div
            className="product-card-link group"
            onClick={() => {
              handleColorClick(slug, productColors, queryClient);
            }}
          >
            <ProductCardImage images={images} name={name} />
            <div
              className="product-card-info pt-3 pb-[2px]"
              // onClick={() => {
              //   console.log("🚀 ~ onClick={ ~ oyo:MAKAMBO", slug, productColors);

              //   usePrefetchAllProductVariants(slug, productColors, queryClient);

              //   // console.log("🚀 ~ onClick={ ~ oyo:OYO", oyo);
              // }}
              // onClick={() => {
              //   handleColorClick(slug, productColors, queryClient);
              // }}
            >
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
          </div>
          {/* </Link>
           */}
        </figure>
      )}
    </>
  );
};

export default ProductCard;

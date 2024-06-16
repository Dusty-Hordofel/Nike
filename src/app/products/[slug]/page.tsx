"use client";
import { bannerVideo } from "@/assets/data/banner";
import ProductImages from "@/components/product/product-details/ProductImages";
import ProductInformation from "@/components/product/product-details/ProductInformation";
import Link from "next/link";
import React from "react";
import { Banner as VideoBanner, Banner as ImageBanner } from "@/components/ui";
import Carousel from "@/components/ui/carousels/carousel";
import CarouselContent from "@/components/ui/carousels/carousel-content";
import { NewThisWeek } from "@/assets/data/slides";
import { useQuery } from "@tanstack/react-query";

interface IProduct {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductPage = ({ params, searchParams }: IProduct) => {
  const { slug: productSlug } = params;
  const productStyle = Number(searchParams.style);
  const selectedSize = Number(searchParams.size) || 0;

  const productQuery = useQuery({
    queryKey: ["product", productSlug, productStyle, selectedSize],
    queryFn: () =>
      fetch(
        `/api/products/${productSlug}?style=${productStyle}&size=${selectedSize}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            style: productStyle,
            size: selectedSize,
            slug: productSlug,
          }),
        }
      ).then((res) => res.json()),
  });

  if (productQuery.isLoading) return <p>Loading...</p>;
  if (productQuery.isError) return <p>Error...</p>;

  const { product } = productQuery.data;

  console.log("🚀 ~ ProductPage ~ productsQuery:", productQuery);
  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto flex">
        <div className="flex">
          <ProductImages images={product.images} />

          <div className="">
            <ProductInformation
              product={product}
              productStyle={productStyle}
              selectedSize={selectedSize}
            />
          </div>
        </div>
      </div>

      <div className="px-12 mt-40">
        <VideoBanner
          mediaType="video"
          showContent={false}
          bannerClassName="h-[740px]"
          {...bannerVideo}
        />
      </div>
      <div className="mt-16 w-[692px] text-center mx-auto">
        <h3 className="text-4xl font-medium">Ça, c&apos;est Nike Tech</h3>

        <p className="mt-4 text-xl/8">
          Certaines personnes pensent que Nike Tech était déjà très bien comme
          ça. Pas nous. Même si elle est toujours aussi stylée et culte
          qu&rsquo;il y a 10&nbsp;ans, on l&rsquo;a rendue plus chaude et plus
          douce que jamais, sans être plus lourde. Tout le plaisir est pour
          nous&nbsp;!
          <br />
          <br />
          <Link target="_blank" href="">
            Voir toute la collection
          </Link>
        </p>
      </div>

      <div className="px-12 mt-40">
        <ImageBanner
          mediaType="image"
          showContent={false}
          bannerClassName="h-[740px]"
          href="#"
          alt=""
          src="https://res.cloudinary.com/dgsc66scx/image/upload/v1717781346/nike/image_rppxjq.webp"
        />
      </div>

      <div className="mt-16 w-[692px] text-center mx-auto">
        <h3 className="text-4xl font-medium">Plus de chaleur</h3>
        <p className="mt-4 text-xl/8">
          Depuis toujours, Nike Tech procure la chaleur, la légèreté et le
          confort nécessaires pour bouger librement. Sans entrer dans les
          détails, les vêtements Nike Tech sont maintenant plus chauds, sans
          être plus lourds.
        </p>
      </div>

      <div className="my-24">
        <h3 className="px-12 text-2xl">Ces articles devraient te plaire</h3>
        <Carousel title="" data={NewThisWeek}>
          {(slide) => (
            <CarouselContent carouselContentClassName="mt-[36px]">
              <>
                <h4 className="text-base font-medium">{slide.title}</h4>
                <p className="w-full text-gray-500">{slide.type}</p>
                <p className="pt-2 font-medium">{slide.prix}</p>
              </>
            </CarouselContent>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductPage;

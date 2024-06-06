"use client";
import { footerMenu } from "@/assets/data/footer";
import {
  bannerImage,
  bannerVideo,
  discountedItems,
  discoverItems,
} from "@/assets/data/banner";
import { categories } from "@/assets/data/products";
import {
  AllForYourSport,
  AtTheMoment,
  MoreArticles,
  NewThisWeek,
  NikeMemberAccess,
  OurIconicModels,
  trendSlides,
} from "@/assets/data/slides";
import HomeProductsCategories from "@/components/HomeProductsCategories";
import Navbar from "@/components/navbar/Navbar";

import {
  Banner as DiscountBanner,
  Banner as DiscoverBanner,
  Banner as VideoBanner,
  Banner as ImageBanner,
  Banner as SmallDiscountBanner,
} from "@/components/ui";
import ButtonLinks from "@/components/ui/buttons/button-links/buttonLinks";
import { buttonVariants } from "@/components/ui/buttons/button/button";

import Carousel from "@/components/ui/carousels/Carousel";
import CarouselContent from "@/components/ui/carousels/CarouselContent";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* <div className="h-10 bg-info w-full mb-20"></div> */}

      <Navbar />

      <VideoBanner
        mediaType="video"
        contentPosition="bottom-left w-[80%]"
        textAlign="text-start"
        linksAlign="justify-start"
        linksVariant="secondary"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white"
        descriptionClassName="text-white"
        bannerClassName="h-[518px]"
        {...bannerVideo}
      />

      <Carousel
        title="En ce moment"
        data={AtTheMoment}
        imageClassName="h-[571px]"
      >
        {(slide) => (
          <CarouselContent carouselContentClassName="mt-[36px]">
            <h3 className="text-xl font-medium">{slide.title}</h3>
          </CarouselContent>
        )}
      </Carousel>

      <Carousel
        title="Nos modèles iconiques"
        data={OurIconicModels}
        imageClassName="h-[311px]"
      >
        {(slide) => (
          <CarouselContent carouselContentClassName="absolute left-12 bottom-12">
            <Link
              href=""
              className={cn(
                buttonVariants({ variant: "secondary", size: "small" }),
                "font-medium"
              )}
            >
              {slide.title}
            </Link>
          </CarouselContent>
        )}
      </Carousel>

      <Carousel
        title="Tout pour ton sport"
        data={AllForYourSport}
        imageClassName="h-[311px]"
      >
        {(slide) => (
          <CarouselContent carouselContentClassName="absolute left-12 bottom-12">
            <Link
              href=""
              className={cn(
                buttonVariants({ variant: "secondary", size: "small" }),
                "font-medium"
              )}
            >
              {slide.title}
            </Link>
          </CarouselContent>
        )}
      </Carousel>

      <Carousel title="Nouveau cette semaine" data={NewThisWeek}>
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

      <Carousel
        title="Plus d'articles"
        data={MoreArticles}
        imageClassName="h-[571px]"
      >
        {(slide) => (
          <CarouselContent carouselContentClassName="absolute left-12 bottom-12">
            <Link
              href=""
              className={cn(
                buttonVariants({ variant: "secondary", size: "small" }),
                "font-medium"
              )}
            >
              {slide.title}
            </Link>
          </CarouselContent>
        )}
      </Carousel>

      <Carousel
        title="Accès Membre Nike"
        data={NikeMemberAccess}
        imageClassName="h-[458px]"
      >
        {(slide) => (
          <CarouselContent carouselContentClassName="absolute left-12 bottom-12">
            <p className="w-full text-gray-500 pb-2">{slide.type}</p>
            <h4 className="text-base font-medium">{slide.title}</h4>
            <Link
              href=""
              className={cn(
                buttonVariants({ variant: "secondary", size: "small" }),
                "font-medium mt-[18px]"
              )}
            >
              {slide.title}
            </Link>
          </CarouselContent>
        )}
      </Carousel>
      <HomeProductsCategories categories={categories} />

      <footer className="p-12 border-t border-gray-500 text-sm">
        <ul className="grid grid-cols-4">
          {footerMenu.map(({ name, content }, index) => (
            <li key={index}>
              <h4 className="font-medium mb-6">{name}</h4>
              <ul className="">
                {content.map(({ text, url }) => (
                  <li
                    className=" text-gray-500 hover:text-black-200"
                    key={name}
                  >
                    <Link href={url} className="">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </footer>

      {/* 
      <SmallDiscountBanner
        mediaType="image"
        src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1512,c_limit/340cfca0-c6d2-4748-ac2b-aa77dcfe44ad/nike-just-do-it.png"
        title="-25% sur tout le site"
        alt="Molongui"
        href="https://www.nike.com/fr/w/promotions-9dklk"
        contentPosition="absolute-center text-black-200 w-[90%]"
        titleClassName="text-2xl sm:text-3xl  md:text-[40px] min-[960px]:text-5xl"
        bannerClassName="h-[104px] bg-orange"
      />
      <DiscountBanner
        {...discountedItems}
        mediaType="image"
        contentPosition="absolute-center text-black-200 w-[90%]"
        titleClassName="text-2xl sm:text-3xl md:text-[40px] min-[960px]:text-5xl"
        bannerClassName="h-[250px]"
      />
      <DiscoverBanner
        mediaType="none"
        contentPosition="absolute-center w-[90%]"
        titleClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black-200 px-10"
        bannerClassName="h-[300px]"
        linksAlign="justify-center"
        {...discoverItems}
      />
      <ImageBanner
        mediaType="image"
        contentPosition="absolute-center w-[80%]"
        textAlign="text-center"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl  text-white"
        bannerClassName="h-[518px]"
        descriptionClassName="text-white"
        {...bannerImage}
      />
      <VideoBanner
        mediaType="video"
        contentPosition="bottom-left w-[80%]"
        textAlign="text-start"
        linksAlign="justify-start"
        linksVariant="secondary"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white"
        descriptionClassName="text-white"
        bannerClassName="h-[518px]"
        {...bannerVideo}
      /> */}
    </>
  );
}

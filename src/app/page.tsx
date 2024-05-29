import {
  bannerImage,
  bannerVideo,
  discountedItems,
  discoverItems,
} from "@/assets/data/links";
import { trendCrossSlides, trendSlides } from "@/assets/data/slides";

import {
  Banner as DiscountBanner,
  Banner as DiscoverBanner,
  Banner as VideoBanner,
  Banner as ImageBanner,
  Banner as SmallDiscountBanner,
} from "@/components/ui";

import Carousel from "@/components/ui/carousels/Carousel";

export default function Home() {
  return (
    <>
      <div className="h-10 bg-info w-full mb-20"></div>
      <Carousel
        title="Tendances de la semaine"
        data={trendSlides}
        // isContentVisible={true}
        type="content"
      />
      <Carousel
        title="Tendances de la semaine"
        data={trendSlides}
        carouselClassName="h-[637px] bg-gray-500"
        imageClassName="h-[571px]"
        titleClassName="text-xl"
        type="title"
      />
      {/* <TrendCaroussel data={trendSlides} crossProduct/> */}
      {/* <TrendCaroussel
        title="Tendances de la semaine"
        exclusive
        data={trendSlides}
        crossProduct
      /> */}
      {/* <TrendCaroussel
        title="Tendances de la semaine prochaine"
        exclusive={false}
        data={trendCrossSlides}
        crossProduct
      /> */}
      {/* <Carousel data={trendSlides} /> */}
      {/* <SmallDiscountBanner
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

import {
  bannerImage,
  bannerVideo,
  discountedItems,
  discoverItems,
} from "@/assets/data/links";

import {
  Banner as DiscountBanner,
  Banner as DiscoverBanner,
  Banner as VideoBanner,
  Banner as ImageBanner,
  Banner as SmallDiscountBanner,
} from "@/components/ui";

export default function Home() {
  return (
    <>
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
        {...discoverItems}
        contentPosition="absolute-center w-[90%]"
        titleClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black-200 px-10"
        bannerClassName="h-[300px]"
        linksAlign="justify-center"
      />
      <ImageBanner
        mediaType="image"
        {...bannerImage}
        contentPosition="absolute-center w-[80%]"
        textAlign="text-center"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl  text-white"
        bannerClassName="h-[518px]"
        descriptionClassName="text-white"
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
      />
    </>
  );
}

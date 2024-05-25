import {
  bannerImage,
  bannerVideo,
  discountedItems,
  discoverItems,
} from "@/assets/data/links";
import { nike } from "@/assets/fonts/nike/nike";
import { Banner, DiscountBanner, DiscoverBanner } from "@/components/ui";
import { ArrowButton } from "@/components/ui/buttons/arrow-button/arrow-button";
import { Button } from "@/components/ui/buttons/button/button";

import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <div className={cn("bg-success text-bg-hover-inverse")}>
        <h1 className={`${nike.className} text-9xl w-max`}>ÇA VA CHAUFFER</h1>
        <Button variant="primary" size="medium" isLoading={false} disabled>
          Olympe
        </Button>
        <ArrowButton direction="left" disabled />
      </div>
      <DiscountBanner {...discountedItems} />
      <DiscoverBanner {...discoverItems} />
      <Banner mediaType="image" {...bannerImage} />
      <Banner
        mediaType="video"
        contentPosition="bottom-left"
        textAlign="text-start"
        linksAlign="justify-start"
        variant="secondary"
        {...bannerVideo}
      />
    </>
  );
}

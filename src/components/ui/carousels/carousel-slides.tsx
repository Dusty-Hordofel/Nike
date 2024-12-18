import { cn } from "@/lib/common/utils";
import Image from "next/image";
import CarouselContent from "./carousel-content";
import Link from "next/link";
import { TrendSlidesProps } from "@/@types/common/trends.types";

type CarouselSlidesProps = {
  carouselRef: React.MutableRefObject<HTMLUListElement | null>;
  data?: TrendSlidesProps[];
  slideClassName?: string;
  imageClassName?: string;
  carouselClassName?: string;
  children: (slide: TrendSlidesProps) => React.ReactNode;
};

const CarouselSlides = ({
  carouselRef,
  data,
  slideClassName,
  imageClassName,
  carouselClassName,
  children,
}: CarouselSlidesProps) => {
  return (
    <div className="relative w-full">
      <Link href="#">
        <figure>
          <ul
            ref={carouselRef}
            className={cn(
              "flex overflow-x-auto w-full h-max scroll-smooth max-sm:px-6 px-12 pb-[30px] scrollbar-hidden",
              carouselClassName
            )}
          >
            {data?.map((slide, index) => (
              <li
                key={index}
                className={cn(
                  "flex-shrink-0 w-[458px] mr-3 last:mr-0 relative",
                  slideClassName
                )}
              >
                <div
                  className={cn(
                    "overflow-hidden w-full h-[458px] relative",
                    imageClassName
                  )}
                >
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    quality={100}
                    fill
                    sizes="100vw"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <CarouselContent>{children(slide)}</CarouselContent>
              </li>
            ))}
          </ul>
        </figure>
      </Link>
    </div>
  );
};

export default CarouselSlides;

import { cn } from "@/lib/utils";
import { TrendSlidesProps } from "@/types/types";
import Image from "next/image";
import CarouselContent from "./CarouselContent";
import Link from "next/link";

type CarouselSlidesProps = {
  carouselRef: React.MutableRefObject<HTMLUListElement | null>;
  data?: TrendSlidesProps[];
  exclusive?: any;
  currentSlide?: number;
  crossProduct?: boolean;
  slideClassName?: string;
  imageClassName?: string;
  carouselClassName?: string;
  titleClassName?: string;
  // isContentVisible?: boolean;
  type: "title" | "content";
};

const CarouselSlides = ({
  carouselRef,
  data,
  slideClassName,
  imageClassName,
  carouselClassName,
  titleClassName,
  // isContentVisible,
  type,
}: CarouselSlidesProps) => {
  return (
    <div className="relative w-full">
      <Link href="#">
        <figure>
          <ul
            ref={carouselRef}
            className={cn(
              "flex overflow-x-auto w-full h-[550px] scroll-smooth px-12 pb-[30px]",
              carouselClassName
            )}
          >
            {data?.map((slide, index) => (
              <li
                // style={{ backgroundColor: `hsl(${index * 30}, 100%, 50%)` }}
                key={index}
                className={cn(
                  "flex-shrink-0 h-full  w-[458px] mr-3 last:mr-0",
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
                {/* if it is an exclusive product, show this */}
                {/* {isContentVisible ? ( */}
                <CarouselContent
                  exclusive
                  slide={slide}
                  type={type}
                  titleClassName={titleClassName}
                />
                {/* ) : null} */}
              </li>
            ))}
          </ul>
        </figure>
      </Link>
    </div>
  );
};

export default CarouselSlides;

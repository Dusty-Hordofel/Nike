"use client";
import React, { useEffect, useRef, useState } from "react";
import { TrendSlidesProps } from "@/@types/types";
import CarouselSlides from "./carousel-slides";
import CarouselControls from "./carousel-controls";

interface CarousselProps {
  title?: string;
  data?: TrendSlidesProps[];
  slideClassName?: string;
  imageClassName?: string;
  carouselClassName?: string;
  children: (slide: TrendSlidesProps) => React.ReactNode; //
}

const MediaCarousel = ({
  title,
  data,
  imageClassName,
  slideClassName,
  carouselClassName,

  children,
}: CarousselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const carouselRef = useRef<HTMLUListElement | null>(null);

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -469,
        behavior: "smooth",
      });
    }
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 469, //457+12(slide width + margin right)
        behavior: "smooth",
      });
    }
  };

  // Fonction pour gérer le défilement
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const active = Math.round(scrollLeft / 469);
      setActiveIndex(active);
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft >= maxScrollLeft);
    }
  };

  // Ajouter un écouteur d'événements de défilement
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => {
        carousel.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center   px-12 mb-3 pt-[2px] h-[56.398px]">
        <h2 className="text-2xl font-medium ">{title}</h2>
        <CarouselControls
          isAtStart={isAtStart}
          isAtEnd={isAtEnd}
          goToPreviousSlide={goToPreviousSlide}
          goToNextSlide={goToNextSlide}
        />
      </div>
      <CarouselSlides
        carouselRef={carouselRef}
        data={data}
        slideClassName={slideClassName}
        imageClassName={imageClassName}
        carouselClassName={carouselClassName}
      >
        {children}
      </CarouselSlides>
    </section>
  );
};

export default MediaCarousel;

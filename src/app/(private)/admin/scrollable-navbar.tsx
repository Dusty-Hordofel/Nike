"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/buttons/button/button";
// import { Button } from "@/components/ui/button";

export default function Component() {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    "Accueil",
    "Produits",
    "Services",
    "À propos",
    "Contact",
    "Blog",
    "FAQ",
    "Témoignages",
    "Équipe",
    "Carrières",
    "Partenaires",
    "Support",
  ];

  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth / 2;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  //   <div className="flex">
  //       <div onClick={() => goToPreviousSlide()}>
  //         <ArrowButton direction="left" disabled={isAtStart} />
  //       </div>
  //       <div onClick={() => goToNextSlide()}>
  //         <ArrowButton disabled={isAtEnd} />
  //       </div>
  //     </div>

  return (
    <div className="relative flex items-center bg-background h-12">
      {showLeftArrow && (
        <Button
          variant="outline"
          //   size="icon"
          className="absolute left-0 z-10 h-8 w-8"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto h-full px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        onScroll={() => {
          setShowLeftArrow(scrollContainerRef.current!.scrollLeft > 0);
          setShowRightArrow(
            scrollContainerRef.current!.scrollLeft <
              scrollContainerRef.current!.scrollWidth -
                scrollContainerRef.current!.clientWidth
          );
        }}
      >
        {tabs.map((tab, index) => (
          <Button
            key={index}
            variant="ghost"
            className="flex-shrink-0 px-3 h-8 text-sm"
          >
            {tab}
          </Button>
        ))}
      </div>
      {showRightArrow && (
        <Button
          variant="outline"
          //   size="icon"
          className="absolute right-0 z-10 h-8 w-8"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

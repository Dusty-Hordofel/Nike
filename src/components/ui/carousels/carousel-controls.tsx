import React from "react";
import { ArrowButton } from "../buttons/arrow-button/arrow-button";

interface CarouselControlsProps {
  goToPreviousSlide: () => void;
  goToNextSlide: () => void;
  isAtStart: boolean;
  isAtEnd: boolean;
}
const CarouselControls = ({
  isAtStart,
  goToPreviousSlide,
  isAtEnd,
  goToNextSlide,
}: CarouselControlsProps) => {
  return (
    <div className="min-[960px]:flex hidden">
      <div onClick={() => goToPreviousSlide()}>
        <ArrowButton direction="left" disabled={isAtStart} />
      </div>
      <div onClick={() => goToNextSlide()}>
        <ArrowButton disabled={isAtEnd} />
      </div>
    </div>
  );
};

export default CarouselControls;

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CarouselContentProps {
  children: ReactNode;
  carouselContentClassName?: string;
}

const CarouselContent: React.FC<CarouselContentProps> = ({
  children,
  carouselContentClassName,
}) => {
  return <div className={cn(carouselContentClassName)}>{children}</div>;
};

export default CarouselContent;

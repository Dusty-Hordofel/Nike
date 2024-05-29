import { cn } from "@/lib/utils";
import React from "react";

type CarouselContentProps = {
  exclusive: boolean;
  slide: any;
  type: "title" | "content";
  titleClassName?: string;
};

const CarouselContent = ({
  exclusive,
  slide,
  type,
  titleClassName,
}: CarouselContentProps) => {
  return (
    <>
      <div className="mt-3">
        <div>
          {type === "title" && (
            <h4 className={cn("text-base font-medium", titleClassName)}>
              {slide.title}
            </h4>
          )}
          {type === "content" && (
            <p className="w-full text-gray-500">{slide.type}</p>
          )}
        </div>
        {type === "content" && <p className="pt-2 font-medium">{slide.prix}</p>}
      </div>
    </>
  );
};

export default CarouselContent;

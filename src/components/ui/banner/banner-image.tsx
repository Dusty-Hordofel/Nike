import React from "react";
import { ImageProps } from "./banner";
import { cn } from "@/lib/utils";

type BannerImageProps = Omit<ImageProps, "mediaType">;

const BannerImage = ({
  src,
  alt,
  imageClassName,
  ...imgProps
}: BannerImageProps) => {
  return (
    <picture>
      <img
        src={src}
        alt={alt}
        className={cn(
          "min-h-[518px] w-full h-full object-cover",
          imageClassName
        )}
        {...imgProps}
      />
    </picture>
  );
};

export default BannerImage;

import React from "react";
import { ImageProps } from "./Banner";
import { cn } from "@/lib/utils";

type BannerImageProps = Omit<ImageProps, "mediaType">;

const BannerImage = ({
  src,
  alt,
  className,
  ...imgProps
}: BannerImageProps) => {
  return (
    <picture>
      <img
        src={src}
        alt={alt}
        className={cn("max-h-[518px] w-full h-full object-cover", className)}
        {...imgProps}
      />
    </picture>
  );
};

export default BannerImage;

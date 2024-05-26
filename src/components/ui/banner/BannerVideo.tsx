import React from "react";
import { VideoProps } from "./Banner";
import { cn } from "@/lib/utils";

type BannerVideo = Omit<VideoProps, "mediaType">;

const BannerVideo = ({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  className,
  ...videoProps
}: BannerVideo) => {
  return (
    <video
      className={cn("max-h-[518px] w-full h-full  object-cover", className)}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      {...videoProps}
    />
  );
};

export default BannerVideo;

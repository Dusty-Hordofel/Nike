import React from "react";
import { VideoProps } from "./banner";
import { cn } from "@/lib/utils";

type BannerVideo = Omit<VideoProps, "mediaType">;

const BannerVideo = ({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  videoClassName,
  ...videoProps
}: BannerVideo) => {
  return (
    <video
      className={cn(
        "min-h-[518px] w-full h-full  object-cover",
        videoClassName
      )}
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

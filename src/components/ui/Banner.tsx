import Link from "next/link";
import React from "react";
import BannerContent from "./BannerContent";
import { cn } from "@/lib/utils";

type ImageProps = {
  mediaType: "image";
  src: string;
  alt: string;
};

type VideoProps = {
  mediaType: "video";
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
};

type CommonBannerProps = {
  href: string;
  title?: string;
  description?: string;
  link1?: { label: string; href: string };
  link2?: { label: string; href: string };
  descriptionClassName?: React.CSSProperties;
  titleClassName?: React.CSSProperties;
  bannerClassName?: React.CSSProperties;
  contentPosition?:
    | "absolute-center"
    | "top-left"
    | "bottom-left"
    | "top-right"
    | "top-right"
    | "bottom-right";
  textAlign?: "text-start" | "text-center" | "text-end";
  linksAlign?: "justify-start" | "justify-end" | "justify-center";
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
};

type BannerProps = CommonBannerProps & (ImageProps | VideoProps);

const Banner: React.FC<BannerProps> = (props) => {
  const {
    href,
    title,
    description,
    link1,
    link2,
    mediaType,
    src,
    descriptionClassName,
    bannerClassName,
    titleClassName,
    contentPosition,
    linksAlign,
    textAlign,
    variant,
    size,
  } = props;

  const renderMedia = () => {
    if (mediaType === "image") {
      const { alt } = props as ImageProps;
      return (
        <picture>
          <img
            src={src}
            alt={alt}
            className="max-h-[518px] w-full object-cover"
          />
        </picture>
      );
    } else {
      const {
        poster,
        autoPlay = true,
        loop = true,
        muted = true,
        controls = false,
      } = props as VideoProps;
      return (
        <video
          className="w-full h-full  object-cover"
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
        />
      );
    }
  };

  const hasContent = title && description && link1 && link2;

  return (
    <figure
      className={cn(
        "relative text-white h-[300px] max-h-[518px]",
        bannerClassName
      )}
    >
      <Link href={href}>{renderMedia()}</Link>
      {hasContent && (
        <BannerContent
          title={title}
          description={description}
          link1={link1}
          link2={link2}
          descriptionClassName={descriptionClassName}
          titleClassName={titleClassName}
          contentPosition={contentPosition}
          linksAlign={linksAlign}
          textAlign={textAlign}
          variant={variant}
          size={size}
        />
      )}
    </figure>
  );
};

export default Banner;

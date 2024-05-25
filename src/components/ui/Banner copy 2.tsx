import Link from "next/link";
import React from "react";
import BannerContent from "./BannerContent";

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
};

type BannerProps = CommonBannerProps & (ImageProps | VideoProps);

const Banner: React.FC<BannerProps> = (props) => {
  const { href, title, description, link1, link2, mediaType, src } = props;

  const renderMedia = () => {
    if (mediaType === "image") {
      const { alt } = props as ImageProps;
      return (
        <picture>
          <img src={src} alt={alt} className="h-[518px] w-full object-cover" />
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
          className="w-full h-[518px] object-cover"
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
    <figure className="relative text-white">
      <Link href={href}>{renderMedia()}</Link>
      {hasContent && (
        <BannerContent
          title={title}
          description={description}
          link1={link1}
          link2={link2}
        />
      )}
    </figure>
  );
};

export default Banner;

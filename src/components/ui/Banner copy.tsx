import { nike } from "@/assets/fonts/nike/nike";
import Link from "next/link";
import React from "react";
import BannerLinks from "./LinkList";

interface BannerProps {
  mediaType: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  href: string;
  title?: string;
  description?: string;
  link1?: { label: string; href: string };
  link2?: { label: string; href: string };
}

const Banner: React.FC<BannerProps> = ({
  mediaType,
  src,
  alt,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  href,
  link1,
  link2,
  title,
  description,
}) => {
  return (
    <figure className="relative text-white">
      <Link href={href}>
        {mediaType === "image" ? (
          <picture>
            <img
              src={src}
              alt={alt}
              className="h-[518px] w-full object-cover"
            />
          </picture>
        ) : (
          <video
            className="w-full h-[518px] object-cover"
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            controls={controls}
          />
        )}
      </Link>
      {title && description && link1 && link2 && (
        <div className="absolute left-12  bottom-12 w-max h-max">
          <div className="flex flex-col items-start">
            <figcaption className="text-start">
              <div className={`${nike.className} uppercase`}>
                <h3 className={`${nike.className} text-7xl uppercase`}>
                  {title}
                </h3>
              </div>
              <p className="mt-6">{description}</p>
            </figcaption>
            <BannerLinks links={[link1, link2]} variant="secondary" />
          </div>
        </div>
      )}
    </figure>
  );
};

export default Banner;

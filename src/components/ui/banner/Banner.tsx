import Link from "next/link";
import BannerContent from "./BannerContent";
import { cn } from "@/lib/utils";
import BannerVideo from "./BannerVideo";
import BannerImage from "./BannerImage";

export type ImageProps = {
  mediaType: "image";
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export type VideoProps = {
  mediaType: "video";
  className?: string;
} & React.VideoHTMLAttributes<HTMLVideoElement>;

export type NoMediaProps = {
  mediaType: "none";
};

export type CommonBannerProps = {
  href: string;
  title?: string;
  description?: string;
  links?: { label: string; href: string }[];
  descriptionClassName?: string;
  titleClassName?: string;
  bannerClassName?: string;
  contentPosition?: string;
  textAlign?: "text-start" | "text-center" | "text-end";
  linksAlign?: string;
  linksVariant?: "primary" | "secondary";
  linksSize?: "small" | "medium" | "large";
};

type BannerProps = CommonBannerProps & (ImageProps | VideoProps | NoMediaProps);

const Banner: React.FC<BannerProps> = (props) => {
  const hasContent =
    props.title ||
    (props.title && props.description) ||
    (props.title && props.description && props.links);

  return (
    <figure
      className={cn(
        "relative text-white h-full max-h-[518px]",
        props.bannerClassName
      )}
    >
      {props.mediaType === "image" ? (
        <Link href={props.href}>
          <BannerImage {...(props as ImageProps)} />
        </Link>
      ) : props.mediaType === "video" ? (
        <Link href={props.href}>
          <BannerVideo {...(props as VideoProps)} />
        </Link>
      ) : null}
      {hasContent && (
        <BannerContent
          {...(props as Omit<CommonBannerProps, "href" | "bannerClassName">)}
        />
      )}
    </figure>
  );
};

export default Banner;

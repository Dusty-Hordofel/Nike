import React from "react";
import BannerLinks from "./LinkList";
import { nike } from "@/assets/fonts/nike/nike";
import { cn } from "@/lib/utils";

type BannerContentProps = {
  title: string;
  description: string;
  link1: { label: string; href: string };
  link2: { label: string; href: string };
  descriptionClassName?: React.CSSProperties;
  titleClassName?: React.CSSProperties;
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

const BannerContent = ({
  title,
  description,
  link1,
  link2,
  textAlign = "text-center",
  linksAlign = "justify-center",
  contentPosition = "absolute-center",
  titleClassName,
  descriptionClassName,
  variant,
  size,
}: BannerContentProps) => {
  return (
    <div className={cn(contentPosition)}>
      <div className="flex flex-col items-start">
        <figcaption className={cn(textAlign)}>
          <h3
            className={cn(nike.className, "text-7xl uppercase", titleClassName)}
          >
            {title}
          </h3>
          <p className={cn("mt-6", descriptionClassName)}>{description}</p>
        </figcaption>
        <div className={cn("mt-6 w-full ", linksAlign)}>
          <BannerLinks
            links={[link1, link2]}
            linksAlign={linksAlign}
            size={size}
            variant={variant}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerContent;

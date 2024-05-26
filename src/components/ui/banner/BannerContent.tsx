import React from "react";
import BannerLinks from "../buttons/button-links/buttonLinks";
import { nike } from "@/assets/fonts/nike/nike";
import { cn } from "@/lib/utils";
import { CommonBannerProps } from "./Banner";

type BannerContentProps = Omit<CommonBannerProps, "href" | "bannerClassName">;

const BannerContent = ({
  title,
  description,
  links,
  textAlign = "text-center",
  linksAlign = "justify-center",
  contentPosition,
  // contentPosition = "absolute-center",
  titleClassName,
  descriptionClassName,
  linksVariant,
  linksSize,
}: BannerContentProps) => {
  return (
    <div className={cn(contentPosition)}>
      <div className="flex flex-col w-full">
        {title && (
          <figcaption className={cn(textAlign)}>
            <h3 className={cn(nike.className, "uppercase", titleClassName)}>
              {title}
            </h3>
            {description && (
              <p className={cn("mt-3 text-black-200", descriptionClassName)}>
                {description}
              </p>
            )}
          </figcaption>
        )}
        {links && links.length > 0 ? (
          // <div className={cn(linksAlign)}>
          <BannerLinks
            links={links}
            linksAlign={linksAlign}
            size={linksSize}
            variant={linksVariant}
          />
        ) : // </div>
        null}
      </div>
    </div>
  );
};

export default BannerContent;

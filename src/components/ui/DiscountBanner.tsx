import { nike } from "@/assets/fonts/nike/nike";

import DiscountLinks from "./LinkList";

interface DiscountBannerProps {
  title: string;
  description: string;
  link1: { label: string; href: string };
  link2: { label: string; href: string };
}

const DiscountBanner = ({
  title,
  description,
  link1,
  link2,
}: DiscountBannerProps) => {
  return (
    <figure className="relative">
      <picture>
        <img
          src="https://res.cloudinary.com/dgsc66scx/image/upload/v1695668027/nike-just-do-it_recpck.webp"
          alt="Elephant at sunset"
        />
      </picture>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <figcaption className="text-center">
            <div className={`${nike.className} mb-2 uppercase`}>
              <h1 className="text-[40px] text-black-200 min-[960px]:text-5xl">
                {title}
              </h1>
            </div>
            <p>{description}</p>
          </figcaption>
          <DiscountLinks links={[link1, link2]} />
        </div>
      </div>
    </figure>
  );
};

export default DiscountBanner;

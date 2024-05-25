import { nike } from "@/assets/fonts/nike/nike";
import DiscoverLinks from "./LinkList";

interface DiscountBannerProps {
  title: string;
  description: string;
  link1: { label: string; href: string };
  link2: { label: string; href: string };
}

const DiscoverBanner = ({
  title,
  description,
  link1,
  link2,
}: DiscountBannerProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center pt-6 bg-white"
      data-testid="discover-banner"
    >
      <h3 className={`${nike.className} text-7xl uppercase`}>{title}</h3>
      <div>
        <p className="text-base font-normal mt-3">{description}</p>
        <div className="mt-6 mb-12">
          <DiscoverLinks links={[link1, link2]} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverBanner;

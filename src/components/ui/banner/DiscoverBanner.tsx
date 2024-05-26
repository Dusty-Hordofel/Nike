import { nike } from "@/assets/fonts/nike/nike";
import DiscoverLinks from "../buttons/button-links/buttonLinks";

interface DiscountBannerProps {
  title: string;
  description: string;
  links: { label: string; href: string }[];
}

const DiscoverBanner = ({ title, description, links }: DiscountBannerProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center pt-6 bg-white"
      data-testid="discover-banner"
    >
      <h3 className={`${nike.className} text-7xl uppercase`}>{title}</h3>
      <div>
        <p className="text-base font-normal mt-3">{description}</p>
        <div className="mt-6 mb-12">
          <DiscoverLinks links={links} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverBanner;

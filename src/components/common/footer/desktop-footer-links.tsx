import { FooterLinksProps } from "@/@types/common/footer.types";
import Link from "next/link";
import FooterLocation from "./footer-location";

const DesktopFooterLinks = ({ footerLinks }: FooterLinksProps) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-4">
        <ul className="min-[960px]:grid min-[960px]:grid-cols-4 hidden">
          {footerLinks.map(({ title, links }: any, index: number) => (
            <li key={index}>
              <h4 className="font-medium mb-6">{title}</h4>
              <ul className="gap-3 flex flex-col">
                {links.map(({ label, href, ariaLabel }: any) => (
                  <li
                    className=" text-gray-500 hover:text-black-200"
                    key={label}
                    aria-label={ariaLabel}
                  >
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden min-[960px]:block col-span-1 ">
        <div className="flex justify-end">
          <FooterLocation />
        </div>
      </div>
    </div>
  );
};

export default DesktopFooterLinks;

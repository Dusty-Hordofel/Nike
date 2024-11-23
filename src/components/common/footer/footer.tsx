import { FooterLinksProps } from "@/@types/common/footer.types";
import NikeTerms from "@/app/nike-terms";

import React from "react";
import MobileFooterLinks from "./mobile-footer-links";
import DesktopFooterLinks from "./desktop-footer-links";

const Footer = ({ footerLinks }: FooterLinksProps) => {
  return (
    <footer className="max-[960px]:py-12 max-[960px]:px-6 min-[960px]:p-12   text-sm">
      <div className="min-[960px]:mb-[60px] mb-[36px] border-[#E5E5E5] border-t"></div>
      <div className=""></div>

      <MobileFooterLinks footerLinks={footerLinks} />
      <DesktopFooterLinks footerLinks={footerLinks} />
      <div className="min-[960px]:mb-[72px] mb-6"></div>
      <NikeTerms />
    </footer>
  );
};

export default Footer;

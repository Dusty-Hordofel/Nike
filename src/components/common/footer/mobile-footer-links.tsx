"use client";
import { FooterLinksProps } from "@/@types/common/footer.types";
import { cn } from "@/lib/common/utils";
import Link from "next/link";
import React, { useState } from "react";
import FooterLocation from "./footer-location";

const MobileFooterLinks = ({ footerLinks }: FooterLinksProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Keep track of open element

  const handleToggle = (index: number, e: any) => {
    e.preventDefault(); // Prevent native <details> behavior
    setOpenIndex(openIndex === index ? null : index); // Closes or opens the element depending on its state
  };

  return (
    <div className="mobile-footer-menu hidden max-[960px]:block">
      <div className="mobile-footer-accordion hidden max-[960px]:block">
        {footerLinks.map((footerLink, index) => (
          <details
            className="details is-animated is-open border-b border-[#E5E5E5]"
            id={`mobile-footer-accordion__accordion-panel-${index}`}
            open={openIndex === index}
            key={index}
            onClick={(e) => handleToggle(index, e)}
          >
            <summary className="details__summary py-6 flex justify-between items-center">
              <p className="details__summary-title">{footerLink.title}</p>
              <span className="details__summary-icon">
                <svg
                  aria-hidden="true"
                  className="nds-summary-control"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    d="M18.966 8.476L12 15.443 5.033 8.476"
                  ></path>
                </svg>
              </span>
            </summary>

            <div
              className={cn(
                "details__content text-gray-500 mb-[30px] gap-3 flex flex-col"
              )}
            >
              {footerLink.links.map((link, idx) => (
                <Link key={idx} href={link.href}>
                  <p>{link.label}</p>
                </Link>
              ))}
            </div>
          </details>
        ))}
      </div>
      <div className="mobile-footer-accordion hidden max-[960px]:block">
        <FooterLocation />
      </div>
    </div>
  );
};

export default MobileFooterLinks;

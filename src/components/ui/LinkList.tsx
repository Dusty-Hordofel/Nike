import Link from "next/link";
import React from "react";
import { buttonVariants } from "./buttons/button/button";
import { cn } from "@/lib/utils";

type LinkProps = {
  links: { label: string; href: string }[];
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  linksAlign?: "justify-start" | "justify-end" | "justify-center";
};

const LinkList = ({
  links,
  variant = "primary",
  size = "small",
  linksAlign = "justify-start",
}: LinkProps) => {
  return (
    <div className={cn("flex items-center", linksAlign)}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          data-button-type="button"
          aria-label={link.label}
          className={cn(buttonVariants({ variant, size }), "font-medium")}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default LinkList;

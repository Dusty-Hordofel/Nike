import Link from "next/link";
import { buttonVariants } from "../button/button";
import { cn } from "@/lib/utils";

type ButtonLinkListProps = {
  links?: { label: string; href: string }[];
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  linksAlign?: string;
};

const ButtonLinks = ({
  links,
  variant = "primary",
  size = "small",
  linksAlign = "justify-start",
}: ButtonLinkListProps) => {
  return (
    <div className={cn("flex items-center mt-[18px]", linksAlign)}>
      {links?.map((link, index) => (
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

export default ButtonLinks;

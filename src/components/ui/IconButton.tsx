import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

// interface IconLinkProps
//   extends  React.AnchorHTMLAttributes<HTMLAnchorElement> {
//   icon: React.ReactNode;
//   href:string
// }

// interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, LinkProps {
//   icon: React.ReactNode;
// }

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={cn("rounded-full p-[6px] hover:bg-gray-200", className)}
      {...props}
    >
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default IconButton;

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type NavLinkProps = {
  name: string;
  submenu?: boolean; //juste mis pour échaper a l'erreur des tests
} & React.HTMLAttributes<HTMLDivElement>;
const NavLink = ({ name, submenu, className, ...props }: NavLinkProps) => {
  return (
    <>
      <Link
        href="/"
        className="relative"
        // className={cn("block bg-olive relative")}
        // data-submenu={submenu ? submenu : false}
      >
        <span className="bg-blue-300 py-3   after:content-[''] after:absolute after:w-0 after:hover:w-full after:h-[2px] after:bg-black-200 after:-bottom-[6px] after:left-0 font-medium">
          {name}
        </span>
      </Link>
    </>
  );
};

export default NavLink;

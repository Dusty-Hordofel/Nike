import React, { Fragment } from "react";
import NavLink from "./NavLink";
import { cn } from "@/lib/utils";
// import cn from "cn";
import NavSubLinks from "./NavSubLinks";

interface SubLink {
  Head: string;
  sublink: { name: string; link: string }[];
}

interface NavLinksProps {
  name: string;
  sublinks: SubLink[];
  submenu: boolean;
}

interface MenuLinksProps {
  menuLinks: NavLinksProps[];
  onList?: boolean;
  handleMouseLeave: () => void;
  handleMouseOver: () => void;
}

const NavLinks = ({
  menuLinks,
  // handleMouseLeave,
  // handleMouseOver,
}: any) => {
  // h-full
  return (
    <ul
      className="flex justify-center items-center menu bg-white flex-wrap w-[calc(100%-426px)] max-w-[1255px] mx-auto "
      // className={cn(
      //   " mx-auto flex items-center justify-center min-3xl:w-[calc(100%-680px)] max-3xl:w-[calc(100%-690px)] menu bg-white h-[60px] DesktopMenu overflow-hidden"
      // )}
      role="menubar"
      data-menu="DesktopMenu"
    >
      {menuLinks.map((link: any, index: any) => {
        const { name, sublinks, submenu } = link;
        return (
          <>
            <li
              className="bg-yellow-700 h-16 px-3 flex items-center justify-center"
              // className={cn(
              //   "bg-white h-full max-h-[100%] menu__link transition-all overflow-hidden inline-block group"
              // )}
              key={index}
              // data-testid={`link-item-${index}`}
              // onMouseOver={handleMouseOver}
              // onMouseLeave={handleMouseLeave}
            >
              <NavLink name={name} submenu={submenu} />
              {/* <NavSubLinks
                sublinks={sublinks}
                handleMouseOver={handleMouseOver}
                handleMouseLeave={handleMouseLeave}
              /> */}
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default NavLinks;

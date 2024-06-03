import React, { Fragment } from "react";
import NavLink from "./NavLink";

interface SubLink {
  Head: string;
  sublink: { name: string; link: string }[];
}

interface NavLinksProps {
  name: string;
  sublinks: SubLink[];
  submenu: boolean;
}

interface NavLinksProps {
  menuLinks: NavLinksProps[];
}

const NavLinks = ({ menuLinks }: NavLinksProps) => {
  return (
    <ul
      className="flex justify-center items-center menu bg-white flex-wrap w-[calc(100%-426px)] max-w-[1255px] mx-auto "
      role="menubar"
      data-menu="DesktopMenu"
    >
      {menuLinks.map((link: any, index: any) => {
        const { name, sublinks, submenu } = link;
        return (
          <>
            <li
              className="bg-yellow-700 h-16 px-3 flex items-center justify-center"
              key={index}
            >
              <NavLink name={name} submenu={submenu} />
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default NavLinks;

"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowButton } from "@/components/ui/buttons/arrow-button/arrow-button";

export type NavLink = {
  name: string;
  href: string;
};

const AdminNavigation = ({ navLinks }: { navLinks: NavLink[] }) => {
  return (
    <>
      <AdminDesktopNavbar navLinks={navLinks} />
      {/* <MobileNavbar navLinks={navLinks} /> */}
    </>
  );
};

export default AdminNavigation;
export const AdminDesktopNavbar = ({ navLinks }: { navLinks: NavLink[] }) => {
  const pathname = usePathname();
  const activePage = pathname.split("/")[2];

  return (
    <header className="my-12">
      <nav>
        <div className="flex flex-col w-full overflow-hidden ">
          <div className="flex self-end">
            <ArrowButton direction="left" />
            <ArrowButton />
          </div>
          <div className="flex bg-success h-16 items-center gap-x-4">
            <div className="w-1/4 mr-4">
              <h1 className="text-2xl font-medium">
                {activePage.slice(0, 1).toUpperCase() + activePage.slice(1)}
              </h1>
            </div>
            <NavbarLinks navLinks={navLinks} pathname={pathname} />
          </div>
          {/* <br /> */}
          <hr />
        </div>
      </nav>
    </header>
  );
};

const NavbarLinks = ({
  navLinks,
  pathname,
}: {
  navLinks: NavLink[];
  pathname: string;
}) => {
  return (
    <ul className="flex items-centergap-x-4 bg-warning overflow-x-scroll">
      {navLinks.map((navLink, index) => (
        <NavBarLink key={index} link={navLink} pathname={pathname} />
      ))}
    </ul>
  );
};

export const NavBarLink = ({
  link,
  pathname,
}: {
  link: NavLink;
  pathname: string;
}) => {
  const isActive = pathname === link.href;

  return (
    <li
      className={`${
        isActive ? "text-black-200 " : "text-gray-500"
      }  hover:text-black capitalize block cursor-pointer p-2 font-medium`}
    >
      <Link href={link.href} scroll={false}>
        <span className="block w-max">{link.name}</span>
      </Link>
    </li>
  );
};

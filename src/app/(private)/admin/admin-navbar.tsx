"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/common/utils";
import { ArrowButton } from "@/components/ui/buttons/arrow-button/arrow-button";

export type NavLink = {
  name: string;
  href: string;
  isActiveLink: boolean;
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
        {/* flex-col min-[960px]:flex-row  */}
        <div className="flex flex-col w-full overflow-hidden ">
          <div className=" hidden min-[960px]:flex min-[960px]:self-end">
            <ArrowButton direction="left" />
            <ArrowButton />
          </div>
          <div className="flex flex-col min-[960px]:flex-row  min-h-16  min-[960px]:gap-x-4 ">
            <div className="min-[960px]:w-1/4 min-[960px]:mr-4 max-[960px]:mb-2  flex items-center max-[960px]:justify-center">
              <h1 className="text-2xl font-medium text-center">
                {activePage.slice(0, 1).toUpperCase() + activePage.slice(1)}
              </h1>
            </div>
            <NavbarLinks navLinks={navLinks} pathname={pathname} />
          </div>

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
    <ul className="flex items-center gap-x-4 overflow-x-scroll max-[960px]:h-14">
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
  const isActivePathname = pathname === link.href;

  return (
    <li
      className={`${isActivePathname ? "text-black-200 " : "text-gray-500"} ${
        !link.isActiveLink && "line-through"
      }  hover:text-black capitalize block cursor-pointer p-2 font-medium`}
    >
      <Link href={link.href} scroll={false}>
        <span className="block w-max">{link.name}</span>
      </Link>
    </li>
  );
};

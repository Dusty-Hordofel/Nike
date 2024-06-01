"use client";
import { menuLinks } from "@/assets/data/menuLinks";

import {
  CartIcon,
  FavorisIcon,
  LoginIcon,
  MobileMenu,
  NikeIcon,
} from "@/assets/icons";
import React, { useState } from "react";
import NavLinks from "./navigation/NavLinks";
import IconButton from "../ui/IconButton";
import SearchInput from "./search/SearchInput";
import { cn } from "@/lib/utils";

type Props = {};

const Navbar = (props: Props) => {
  const [expand, setExpand] = useState(false);
  console.log("🚀 ~ Navbar ~ expand:", expand);
  const [isFixed, setIsFixed] = useState(false);
  const [onList, setOnList] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleSearchInput = () => {
    setExpand((prev) => !prev);
  };

  const handleMouseOver = () => {
    setOnList(true);
  };

  const handleMouseLeave = () => {
    setOnList(false);
  };

  console.log("🚀 ~ menuLinks:", menuLinks);
  return (
    <header className="relative max-w-[1920px] h-16 bg-warning">
      <div className="px-12 bg-success h-full flex">
        {/* Nike logo */}
        <div
          className="bg-yellow-300 w-max z-10"
          // className={cn("nike__logo ", expand ? "hide-logo" : "")}
        >
          <span className="sr-only">Page d&lsquo;accueil Nike</span>
          <NikeIcon className="cursor-pointer hover:opacity-70 w-[59px] h-[60px] font-medium scale-125 " />
        </div>
        {/* Navigation */}
        <div className="bg-orange-50 h-full flex-grow">
          <nav className="desktop-menu absolute w-full h-16 inset-x-0 bg-green-500 pt-1">
            <NavLinks
              menuLinks={menuLinks}
              //   handleMouseOver={handleMouseOver}
              //   handleMouseLeave={handleMouseLeave}
            />
          </nav>
          <div className="bg-blue-500 pl-4 pr-5 h-full">
            <SearchInput
              handleSearchInput={handleSearchInput}
              expand={expand}
            />
          </div>
        </div>
        {/* Icons */}
        {!expand && (
          <div
            className="bg-blue-200 pt-3 z-10"
            // className={cn(
            //   " pt-3 text-right inline-block flex-grow-0 btn-group z-[10]"
            // )}
          >
            <IconButton
              icon={<FavorisIcon />}
              aria-label="Favoris"
              title="Favoris"
              className="mr-3 favoriteIcon"
            />
            <IconButton
              icon={<CartIcon />}
              aria-label="Articles du panier: 0"
              title="Articles du panier: 0"
              rel="nofollow"
              className="cartIcon"
            />
            {/* <IconButton
              icon={<LoginIcon />}
              aria-label="Articles du panier: 0"
              title="Articles du panier: 0"
              rel="nofollow"
              className="loginIcon hidden mr-2"
            />
            <IconButton
              icon={<MobileMenu />}
              aria-label="menu"
              title="menu"
              rel="nofollow"
              aria-haspopup="true"
              aria-expanded={expand}
              id="MobileMenuButton"
              className="hidden transition-all p-2"
            /> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

"use client";
import { menuLinks } from "@/assets/data/menuLinks";

import { CartIcon, FavorisIcon, NikeIcon } from "@/assets/icons";
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
    <header>
      <div className="relative">
        <div className="px-12 grid grid-cols-12">
          <div className="col-span-2 h-[60px] bg-warning z-10">
            <span className="sr-only">Page d&lsquo;accueil Nike</span>
            <NikeIcon className="cursor-pointer hover:opacity-70 w-[59px] h-[59px] font-medium my-[1px]" />
          </div>
          <div className="col-span-7 h-[60px] bg-orange">
            <nav
              className="absolute inset-x-0 bg-success h-full"
              aria-label="Navigation principale "
              data-testid="desktop-menu-container"
            >
              <NavLinks menuLinks={menuLinks} />
            </nav>
          </div>
          <div className="col-span-3 bg-red h-[60px] z-10 py-3">
            <div
              className="flex float-right gap-1"
              // className={cn(expand ? "" : "float-right gap-1 flex")}
            >
              <SearchInput
                handleSearchInput={handleSearchInput}
                expand={expand}
              />

              {/* {!expand && ( */}
              <>
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
              </>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

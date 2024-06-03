"use client";
import { CartIcon, FavorisIcon, NikeIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import IconButton from "../ui/IconButton";
import SearchInput from "./search/SearchInput";

type Props = {};

const Navbar = (props: Props) => {
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [onList, setOnList] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleSearchInput = () => {
    setExpand((prev) => !prev);
  };
  return (
    <header className="relative z-20 max-w-[1920px]">
      <div className="grid grid-cols-12 px-12 h-[60px] items-center overflow-hidden">
        {/* Nike */}
        <div className="col-span-2 h-full z-10">
          <span className="sr-only">Page d&lsquo;accueil Nike</span>
          <NikeIcon className="cursor-pointer hover:opacity-70 w-[60px] h-[60px]  scale-125 " />
        </div>
        {/* navbar */}
        <div className="col-span-7 h-full">
          <nav className="absolute inset-x-0 h-full">
            <ul className="flex justify-center items-center space-x-2 h-full max-w-[1255px] w-[calc(100%-426px)] mx-auto desktop-category">
              <li>testako</li>
              <li>testako</li>
              <li>testako</li>
              <li>testako</li>
              <li>testako</li>
              <li onClick={handleSearchInput}>testako</li>
            </ul>
          </nav>
        </div>
        <div className="col-span-3 bg-white h-full z-10 pt-3">
          <div className="float-right gap-1 flex h-[36px]">
            <search aria-label="Rechercher des articles Nikes">
              <SearchInput />
            </search>
            {!expand && (
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// quand expand est true , on remarque que  grid-cols-[20%_60%_20%],  au depart  c'est sur 180px , mais avec expand , je veux que

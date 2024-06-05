"use client";
import { CartIcon, FavorisIcon, NikeIcon } from "@/assets/icons";
import React, { useState } from "react";
import SearchInput from "./search/SearchInput";
import NavLinks from "./navigation/NavLinks";
import { menuLinks } from "@/assets/data/menuLinks";
import Link from "next/link";

const Navbar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <header className="relative z-10 max-w-[1920px] h-16 bg-white">
      <div className="grid grid-cols-12 px-12 h-full items-center overflow-hidden">
        <div className="col-span-2 h-full z-10">
          <span className="sr-only">Page d&lsquo;accueil Nike</span>
          <NikeIcon className="cursor-pointer hover:opacity-70 w-[60px] h-[60px]  scale-125 " />
        </div>

        <div className="col-span-7 h-full">
          <nav className="absolute inset-x-0 h-full ">
            <NavLinks menuLinks={menuLinks} />
          </nav>
        </div>
        <div className="col-span-3 h-full z-10 pt-3">
          <div className="float-right gap-1 flex h-[36px]">
            <search aria-label="Rechercher des articles Nikes">
              <SearchInput />
            </search>

            {!expand && (
              <>
                <Link className="link-icon-hover" href="#">
                  <FavorisIcon aria-label="Favoris" />
                </Link>
                <Link className="link-icon-hover" href="#">
                  <CartIcon aria-label="Articles du panier: 0" />
                </Link>
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

"use client";
import { CartIcon, FavorisIcon, NikeIcon } from "@/assets/icons";
import React, { useState } from "react";
import SearchInput from "./search/SearchInput";
import NavLinks from "./navigation/NavLinks";
import { menuLinks } from "@/assets/data/menu-links";
import Link from "next/link";
import { useCart } from "@/context/cart/cart.context";

const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const { state: cartState } = useCart();

  return (
    <header className="relative z-10 max-w-[1920px] h-16 bg-white">
      <div className="grid grid-cols-12 px-12 h-full items-center overflow-hidden">
        <div className="col-span-2 h-full z-10">
          <span className="sr-only">Page d&lsquo;accueil Nike</span>
          <Link href="/">
            <NikeIcon className="cursor-pointer hover:opacity-70 w-[60px] h-[60px]  scale-125 " />
          </Link>
        </div>

        <div className="col-span-7 h-full">
          <nav className="absolute inset-x-0 h-full bg-yellow-100">
            <NavLinks menuLinks={menuLinks} />
          </nav>
        </div>
        <div className="col-span-3 h-full z-10 pt-3">
          <div className="float-right gap-1 flex h-[36px]">
            <search aria-label="Rechercher des articles Nikes ">
              <SearchInput />
            </search>

            {!expand && (
              <>
                <Link
                  className="link-icon-hover"
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/cart`}
                  // href={`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist`}
                >
                  <FavorisIcon aria-label="Favoris" />
                </Link>
                <Link
                  className="link-icon-hover  relative"
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/cart`}
                >
                  <CartIcon aria-label="Articles du panier: 0" />
                  <span className="absolute z-10  top-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-[8px]">
                    {cartState.numItemsInCart > 9
                      ? "9+"
                      : cartState.numItemsInCart}
                  </span>
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

import { CartIcon, FavorisIcon, NikeIcon } from "@/assets/icons";
import React, { useState } from "react";
import SearchInput from "./search/SearchInput";
import NavLinks from "./navigation/nav-links";
import { menuLinks } from "@/assets/data/menu-links";
import Link from "next/link";
import { useCart } from "@/context/cart/cart.context";
import { CartState } from "@/context/cart/cart.reducer";

interface MobileNavbarProps {
  cartState: CartState;
}
const MobileNavbar = ({ cartState }: MobileNavbarProps) => {
  return (
    <header className="relative z-10 max-w-[1920px] h-16 bg-white hidden max-[960px]:block px-6">
      <nav className="flex items-center bg-white justify-between">
        <div>
          <span className="sr-only">Page d&lsquo;accueil Nike</span>
          <Link href="/">
            <NikeIcon className="cursor-pointer hover:opacity-70 w-[60px] h-[60px]  scale-125 " />
          </Link>
        </div>
        <div>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/products`}>
            All Products
          </Link>
        </div>

        <div className="flex gap-1">
          <Link
            className="rounded-full p-[6px] hover:bg-gray-200 "
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
            >
              <path
                stroke="currentColor"
                stroke-width="1.5"
                d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3M12 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
              ></path>
            </svg>
          </Link>
          <Link
            className="rounded-full p-[6px] hover:bg-gray-200 "
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/favourites`}
          >
            <FavorisIcon aria-label="Favoris" />
          </Link>
          <Link
            className="rounded-full p-[6px] hover:bg-gray-200  relative size-9"
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/cart`}
          >
            <CartIcon aria-label="Articles du panier: 0" />
            <span className="absolute z-10  top-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-[8px]">
              {cartState.numItemsInCart > 9 ? "9+" : cartState.numItemsInCart}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default MobileNavbar;

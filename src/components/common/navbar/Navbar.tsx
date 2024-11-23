"use client";
import React, { useState } from "react";
import { useCart } from "@/context/cart/cart.context";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";
import { usePathname } from "next/navigation";
import { disableNavAndFooter } from "@/components/common/disable-nav-and-footer";

const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const { state: cartState } = useCart();

  const pathname = usePathname();

  return (
    <>
      {!disableNavAndFooter.includes(pathname) && (
        <>
          <DesktopNavbar expand={expand} cartState={cartState} />
          <MobileNavbar cartState={cartState} />
        </>
      )}
    </>
  );
};

export default Navbar;

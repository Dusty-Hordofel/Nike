"use client";
import React, { useState } from "react";
import { useCart } from "@/context/cart/cart.context";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const { state: cartState } = useCart();

  return (
    <>
      <DesktopNavbar expand={expand} cartState={cartState} />
      <MobileNavbar cartState={cartState} />
    </>
  );
};

export default Navbar;

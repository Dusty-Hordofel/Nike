"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

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
      <div className="grid grid-cols-12 px-12 bg-warning h-[60px] items-center overflow-hidden">
        {/* Nike */}
        <div className="swoosh css-15dknis e4lt99o0 nds-grid-item col-span-2 bg-success h-full z-10">
          <div className="w-[60px] h-[60px] bg-black-100 text-white">Nike</div>
        </div>
        {/* navbar */}
        <div className="col-span-7 bg-blue-200 h-full">
          <nav className="absolute inset-x-0 bg-green-800 h-full">
            <ul className="flex justify-center items-center space-x-2 bg-orange h-full max-w-[1255px] w-[calc(100%-426px)] mx-auto desktop-category">
              <li>testako</li>
              <li>testako</li>
              <li>testako</li>
              <li>testako</li>
              <li>testako</li>
              <li onClick={handleSearchInput}>testako</li>
            </ul>
          </nav>
        </div>
        <div className="col-span-3 bg-green-200 h-full z-10">
          <div className="float-right gap-[4px] flex bg-green-500 pt-3">
            {/* <div className="w-[180px] h-[36px]"> */}
            <search aria-label="Rechercher des articles Nikes">
              <form action="">
                <div
                  // fixed inset-x-0
                  className={cn(
                    expand
                      ? " bg-yellow-100  grid-cols-[20%_60%_20%]"
                      : "grid-cols-[0px_180px_0px]",
                    "transition-all grid "
                  )}
                  //   className={cn(
                  //     expand
                  //       ? "bg bg-yellow-100  grid-cols-[20%_60%_20%] fixed inset-x-0 "
                  //       : "grid-cols-[0px_180px_0px] float-right flex",
                  //     "transition-all grid"
                  //   )}
                  //   className={cn(
                  //     "grid transition-all w-full",
                  //     expand
                  //       ? "grid-cols-[20%_60%_20%] fixed inset-x-0  pt-3 z-30 "
                  //       : "grid-cols-[0px_180px_0px] search-bar-container"
                  //   )}
                >
                  <p>MALA</p>
                  {/* <p className="bg-blue-200">MALA</p>
                  <p>MALA</p> */}
                  {/* <div
                    className={cn(
                      "bar-swoosh-container hidden opacity-0 h-0 w-0 text-[0]"
                    )}
                  >
                    Olingo
                  </div>
                  <div
                    className={cn(
                      "bar-input-container bg-blue-300 h-[36px] col-span-2"
                    )}
                  >
                    Loko
                  </div>
                  <div
                    className={cn(
                      "bar-cancel-container hidden opacity-0 h-0 w-0 text-[0]"
                    )}
                  >
                    <p>Mayela</p>
                  </div> */}
                  <div className="bar-search-results-tray"></div>
                  <div className="search-scrim"></div>
                </div>
              </form>
            </search>
            {/* </div> */}
            {!expand && (
              <>
                <p className="w-[36px] h-[36px] bg-orange text-center">
                  <span>Olo</span>
                </p>
                <p className="w-[36px] h-[36px] bg-blue-200">
                  <span>Lio</span>
                </p>
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

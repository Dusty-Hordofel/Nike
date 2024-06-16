"use client";
import SendResetPasswordEmail from "@/emails/send-reset-password-email";
import React, { useState } from "react";
import Nava from "./navbar/Navbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttons/button/button";

const LoloPage = () => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <header className="relative z-10 max-w-[1920px] h-16 bg-white">
        <div className="grid grid-cols-12 px-12 h-full items-center overflow-hidden">
          <div className="col-span-2 h-full z-10 bg-orange">
            {/* <span className="sr-only">Page d&lsquo;accueil Nike</span>
          <NikeIcon className="cursor-pointer hover:opacity-70 w-[60px] h-[60px]  scale-125 " /> */}
          </div>

          <div className="col-span-7 h-full bg-warning">
            {/* <nav className="absolute inset-x-0 h-full ">
            <NavLinks menuLinks={menuLinks} />
          </nav> */}
          </div>
          <div className="col-span-3 h-full z-10 pt-3 bg-blue-100">
            <div className="float-right gap-1 flex h-[36px] bg-blue-200 w-40">
              <div
                className={cn(
                  "bg-warning w-full h-full",
                  expand && "fixed inset-0 h-[60px]"
                )}
              >
                <div
                  className={cn(
                    expand ? "grid grid-cols-12" : "grid grid-cols-3"
                  )}
                >
                  <div className={cn(expand && "col-span-3 bg-blue-500")}></div>
                  <div
                    className={cn(
                      " bg-success relative",
                      expand ? "col-span-6 h-[60px] " : "col-span-3 h-[36px] "
                    )}
                  >
                    <div
                      className={cn(
                        expand ? "w-full" : "w-40",
                        "transition-all bg-green-800 absolute right-0 duration-700"
                      )}
                    >
                      <h1>Makambo</h1>
                    </div>
                  </div>
                  <div
                    className={cn(expand && "col-span-3 bg-green-400")}
                  ></div>
                </div>
              </div>
              {/* <search aria-label="Rechercher des articles Nikes">
              
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
            )} */}
            </div>
          </div>
        </div>
      </header>
      <Button onClick={() => setExpand(!expand)}>Meka</Button>
    </>
  );

  // <SendResetPasswordEmail resetPasswordCode={17277163} />;
};

export default LoloPage;

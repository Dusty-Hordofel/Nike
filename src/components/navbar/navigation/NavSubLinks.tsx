import { cn } from "@/lib/utils";
import React from "react";

interface NavSubLinksProps {
  sublinks: { Head: string; sublink: { name: string; link: string }[] }[];
  handleMouseOver: () => void;
  handleMouseLeave: () => void;
}
const NavSubLinks = ({
  sublinks,
  handleMouseOver,
  handleMouseLeave,
}: NavSubLinksProps) => {
  return (
    <div
      className={cn(
        "bg-white absolute top-[64px] left-0 w-full justify-center px-10 pt-4 pb-10 group-hover:flex hidden"
      )}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="flex bg-white w-full h-full mx-[12.5px] pb-[15px] justify-center">
        {sublinks &&
          sublinks.map(({ Head, sublink }, sectionIndex) => (
            <div
              className="w-full max-w-[224px] bg-white font-medium px-[6px] pt-4"
              key={sectionIndex}
            >
              <div className="bg-white">
                <h1>{Head}</h1>
              </div>
              <ul className="bg-white w-full">
                {sublink.map((item, itemIndex) => (
                  <li
                    className="text-sm leading-6 text-[rgb(117,117,117)] font-medium cursor-pointer hover:text-black hover:transition mb-[6px]"
                    key={itemIndex}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default NavSubLinks;

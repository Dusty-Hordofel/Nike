import Link from "next/link";
import React from "react";

type DesktopFooterLinks = {};

const DesktopFooterLinks = ({ footerMenu }: any) => {
  return (
    <ul className="min-[960px]:grid min-[960px]:grid-cols-4 hidden">
      {footerMenu.map(({ name, content }: any, index: number) => (
        <li key={index}>
          <h4 className="font-medium mb-6">{name}</h4>
          <ul className="gap-3 flex flex-col">
            {content.map(({ text, url }: any) => (
              <li className=" text-gray-500 hover:text-black-200" key={name}>
                <Link href={url} className="">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default DesktopFooterLinks;

import { JordanIcon, NikeIcon } from "@/assets/icons";
import Link from "next/link";
import React from "react";

type HeaderFormProps = {
  title?: string;
  ariaLabel: string;
};

const UserAuthHeaderForm = ({ title, ariaLabel }: HeaderFormProps) => {
  return (
    <header tabIndex={0} aria-label={`${ariaLabel} group`}>
      <div className="flex items-center gap-4 w-[460px] h-[100px]">
        <div className="w-max h-full flex items-center justify-center">
          <Link href="/">
            <NikeIcon className="cursor-pointer hover:opacity-70 w-12 h-[60px] font-medium scale-125 " />
          </Link>
        </div>
        <div className="w-max h-full flex items-center justify-center">
          <JordanIcon
            className="hover:opacity-60 cursor-pointer h-12 w-12"
            data-testid="jordan-icon"
          />
        </div>
      </div>

      <h1 aria-label={ariaLabel} className="text-3xl pb-3 leading-8">
        {title}
      </h1>
    </header>
  );
};

export default UserAuthHeaderForm;

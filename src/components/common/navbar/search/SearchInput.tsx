"use client";
import SearchIcon from "@/assets/icons/search/SearchIcon";
import IconButton from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SearchInput = () => {
  const [isIconHovered, setIsIconHovered] = useState(false);

  return (
    <div
      className={cn(
        "w-[168px] mr-3  h-full   rounded-full overflow-hidden relative group max-[960px]:hidden "
      )}
    >
      <IconButton
        className={cn(
          "overflow-hidden absolute ",
          isIconHovered ? "hover:bg-gray-300" : "group-hover:bg-gray-100"
        )}
        icon={<SearchIcon />}
        type="button"
        aria-label="Ouvrir la recherche modale"
        tabIndex={0}
        data-search-closed-label="Rechercher"
        data-search-open-label="Ouvrir la recherche modale"
        onMouseEnter={() => setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
      />

      <input
        type="text"
        placeholder="Rechercher"
        className={cn(
          "h-full w-full hover:bg-gray-200 bg-gray-100 pl-[38px] pr-[2px] outline-none",
          isIconHovered ? "bg-gray-200" : "hover:bg-gray-200"
        )}
        name="search"
        autoComplete="off"
        aria-label="Rechercher des produits"
        aria-controls="search"
      />
    </div>
  );
};

export default SearchInput;

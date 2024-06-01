"use client";
import SearchIcon from "@/assets/icons/search/SearchIcon";
import IconButton from "../../ui/IconButton";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SearchInputProps = {
  expand?: boolean;
  handleSearchInput: () => void;
  // type?: "search";
};

// onMouseEnter={() => setIsIconHovered(true)}
//           onMouseLeave={() => setIsIconHovered(false)}
//           onClick={handleSearchInput}
const SearchInput = ({ expand, handleSearchInput }: SearchInputProps) => {
  const [isIconHovered, setIsIconHovered] = useState(false);

  return (
    <div
      className={cn(
        "w-[168px]   rounded-full overflow-hidden relative group",
        expand ? "search__input__box__expand" : " search__input__box"
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
        // role="combobox"
        aria-controls="search"
        // aria-expanded={expand}
      />
    </div>
  );
};

export default SearchInput;

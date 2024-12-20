"use client";
import { useEffect, useRef } from "react";
import SortDropdownMenu from "./sort-dropdown-menu";
import SortButton from "./sort-button";

const ProductSorterButton = ({
  showDropdown,
  setShowDropdown,
  filters,
  handleSorterChange,
  isLargeScreen,
}: any) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Ajoute l'écouteur d'événements
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Nettoie l'écouteur d'événements lors du démontage du composant
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <SortButton
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        ref={buttonRef}
        filters={filters}
      />
      <SortDropdownMenu
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        ref={dropdownRef}
        filters={filters}
        handleSorterChange={handleSorterChange}
        isLargeScreen={isLargeScreen}
      />
    </>
  );
};

export default ProductSorterButton;

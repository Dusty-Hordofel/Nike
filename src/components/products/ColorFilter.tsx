"use client";
import classNames from "classnames";
import React, { useState, ChangeEvent } from "react";

type ColorFilterProps = {
  colors: string[];
  onFilterChange: (selectedColors: string[]) => void;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  selectedColors: string[];
  setSelectedColors: (selectedColors: string[]) => void;
};

const ColorFilter = ({
  colors,
  onFilterChange,
  isChecked,
  setIsChecked,
  selectedColors,
  setSelectedColors,
}: ColorFilterProps) => {
  const handleColorChange = (
    color: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(event.target.checked);
    // console.log("🚀 ~ file: ColorFilter.tsx:16 ~ isChecked:", event.target.checked)

    if (selectedColors.includes(color)) {
      // Si la couleur est déjà sélectionnée, on la supprime de la liste des couleurs sélectionnées.
      setSelectedColors(
        selectedColors.filter((selectedColor) => selectedColor !== color)
      );
    } else {
      // Si la couleur n'est pas encore sélectionnée, on l'ajoute à la liste des couleurs sélectionnées.
      setSelectedColors([...selectedColors, color]);
    }
  };

  React.useEffect(() => {
    onFilterChange(selectedColors);
  }, [selectedColors]);

  return (
    <div>
      <div className="grid grid-cols-3">
        {colors.map((color) => (
          <label
            key={color}
            className="flex flex-col cursor-pointer place-items-center"
          >
            <div
              className={classNames(
                "relative inline-block text-center rounded-full w-7 h-7 mb-1",
                color === "green"
                  ? "bg-primary"
                  : color === "red"
                  ? "bg-red"
                  : color === "blue"
                  ? "bg-blue-200"
                  : color === "red-green"
                  ? "bg-olive"
                  : "bg-gray-500"
              )}
            >
              <input
                className={`mr-1 ${color} ${
                  selectedColors.includes(color) ? `${color}-line` : ""
                } color`}
                type="checkbox"
                value={color}
                checked={selectedColors.includes(color)}
                onChange={(event) => handleColorChange(color, event)}
              />
            </div>
            <span className="block pb-6">{color}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;

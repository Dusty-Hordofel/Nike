import React, { useState } from "react";

function ShoeSizeSelector() {
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  console.log(
    "🚀 ~ file: ShoeSizeSelector.tsx:5 ~ ShoeSizeSelector ~ selectedSizes:",
    selectedSizes
  );

  const shoeSizes = [];
  for (let size = 38.5; size <= 49.5; size += 0.5) {
    shoeSizes.push(size);
  }

  const handleSizeChange = (size: number) => {
    if (selectedSizes.includes(size)) {
      // Si la taille est déjà sélectionnée, la retirer du tableau
      setSelectedSizes(
        selectedSizes.filter((selectedSize) => selectedSize !== size)
      );
    } else {
      // Sinon, l'ajouter au tableau
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <div>
      {/* <h2>Sélectionner la pointure de basket :</h2> */}
      <div className="max-w-[202px] w-full grid grid-cols-3 place-items-center gap-2">
        {shoeSizes.map((size) => (
          <label key={size} className="cursor-pointer">
            <input
              type="radio"
              name="shoeSize"
              value={size}
              onChange={() => handleSizeChange(size)}
              checked={selectedSizes.includes(size)}
              className="hidden"
            />
            <div
              className={`w-[55.336px] h-[34px] border rounded-md flex items-center justify-center cursor-pointer ${
                selectedSizes.includes(size)
                  ? "border-black-200"
                  : "border-gray-300"
              } ${
                selectedSizes.includes(size) ? "bg-black-200 text-white" : ""
              }`}
            >
              {size}
            </div>
          </label>
        ))}
      </div>

      {/* <div className="mt-4">
                Tailles sélectionnées : {selectedSizes.length > 0 ? selectedSizes.join(", ") : "Aucune sélection"}
            </div> */}
    </div>
  );
}

export default ShoeSizeSelector;

"use client";
import { countryNames } from "@/assets/data/countries";
import React, { useState } from "react";

const UserSelectCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState("FR");

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="h-10 w-max flex mb-4 items-center">
      <span data-testid="selected-country-label">
        {countryNames[selectedCountry]}
      </span>
      <div className=" mx-[10px] relative w-max text-nowrap">
        <label
          htmlFor="country"
          className="underline inline-block text-gray-500"
        >
          Modifier
        </label>
        <select
          name="country"
          id="country"
          autoComplete="off"
          aria-label="Change country"
          className="cursor-pointer opacity-0 absolute bg-blue-200 inset-0"
          value={selectedCountry}
          onChange={handleSelectChange}
        >
          <option value="">Select a country</option>
          {Object.entries(countryNames).map(([abbr, name]) => (
            <option key={abbr} value={abbr}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserSelectCountry;

"use client";
import React, { ChangeEventHandler, useState } from "react";
import "./input.css";

const CustomRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="option1"
          name="radioGroup"
          value="Option 1"
          checked={selectedOption === "Option 1"}
          onChange={handleOptionChange}
          className="custom-radio"
        />
        <label htmlFor="option1" className="ml-2">
          Option 1
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="option2"
          name="radioGroup"
          value="Option 2"
          checked={selectedOption === "Option 2"}
          onChange={handleOptionChange}
          className="custom-radio"
        />
        <label htmlFor="option2" className="ml-2">
          Option 2
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="option3"
          name="radioGroup"
          value="Option 3"
          checked={selectedOption === "Option 3"}
          onChange={handleOptionChange}
          className="custom-radio"
        />
        <label htmlFor="option3" className="ml-2">
          Option 3
        </label>
      </div>

      <div className="mt-4">
        <p>Selected Option: {selectedOption}</p>
      </div>
    </div>
  );
};

export default CustomRadioButton;

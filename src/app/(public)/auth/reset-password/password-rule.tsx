import React from "react";
import { FieldError } from "react-hook-form";

const PasswordRule = ({
  rule,
  fieldError,
}: {
  rule: string;
  fieldError?: FieldError;
}) => {
  const color = fieldError ?? false ? "#d30005" : "#757575";

  return (
    <div
      color="lightGrey"
      className={`flex items-center text-xs text-[${color}] h-5 my-2`}
    >
      <svg
        aria-label="Erreur. Ton mot de passe doit contenir&nbsp;:"
        tabIndex={0}
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.351562 1.35156L9.64823 10.6482" stroke={color}></path>
        <path d="M9.64823 1.35156L0.351562 10.6482" stroke={color}></path>
      </svg>
      <p
        tabIndex={0}
        className={`mx-[5px] text-center ${color ? `text-[${color}]` : `text-[${color}]`}`}
      >
        {rule}
      </p>
    </div>
  );
};

export default PasswordRule;

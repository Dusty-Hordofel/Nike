import { X } from "lucide-react";
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
      <X size={17} strokeWidth={1.5} color={color} />
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

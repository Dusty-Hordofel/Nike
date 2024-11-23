import { cn } from "@/lib/common/utils";
import React, { Fragment } from "react";

type ShoppingPreferenceProps = {
  label?: string;
  name: string;
  register?: any;
  errors?: any;
  isReactHookForm?: boolean;
  className?: string;
  type?: string | number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ShoppingPreference = ({
  register,
  name,
  errors,
}: ShoppingPreferenceProps) => {
  return (
    <div className="flex flex-col">
      <div className="w-full py-4 pr-4 pl-3 rounded-lg border-default border focus:outline-none transition-all flex justify-between relative ">
        <select
          {...register(name)}
          id={name}
          name={name}
          autoComplete="off"
          style={{ appearance: "none" }}
          className="w-full bg-clear z-10 focus:outline-none "
          aria-invalid="true"
          aria-required="false"
          aria-describedby="shopping-preference-select-aria-description"
        >
          <option value="preference" style={{ display: "none" }}>
            Préférence d&apos;achat
          </option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
        {/* <div className="absolute right-10  z-[1]" aria-hidden="true">
          <span data-testid="dropdown-value-display"></span>
          <ChevronDown strokeWidth={1.5} />
          <ChevronDown color="#b64343" strokeWidth={1.5} />
        </div> */}
      </div>

      <div className="h-6">
        {errors[name] ? (
          <p
            className={cn(
              "text-destructive text-xs transition-all ease px-4 text-red-600",
              errors[name] ? "px-4 h-[18px] pt-[6px]" : "h-0"
            )}
          >
            {errors[name]?.message}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ShoppingPreference;

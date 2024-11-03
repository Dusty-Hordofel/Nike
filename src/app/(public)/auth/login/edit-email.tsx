import { cn } from "@/lib/utils";
import React, { SetStateAction } from "react";

type Props = {
  formCurrentStep: number;
  setFormCurrentStep: (value: SetStateAction<number>) => void;
  email: string;
};

const EditEmail = ({ formCurrentStep, email, setFormCurrentStep }: Props) => {
  return (
    <div
      className={cn(
        "text-black-100 pb-6",
        {
          hidden: formCurrentStep === 1,
        },
        "min-h-[40px] pb-8"
      )}
    >
      <span className="pr-[5px]">{email}</span>
      <button
        className="text-gray-500 underline"
        onClick={() => setFormCurrentStep(1)}
      >
        Modifier
      </button>
    </div>
  );
};

export default EditEmail;

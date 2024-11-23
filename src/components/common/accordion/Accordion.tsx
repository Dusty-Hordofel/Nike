"use client";
import Chevron from "@/assets/icons/chevron/Chevron";
import { cn } from "@/lib/common/utils";
import { useCallback, useState } from "react";
import React from "react";

interface objetProps {
  key: string;
  value: string;
  plus?: string;
}

interface AccordionProps {
  data: objetProps[];
}

const Accordion = ({ data }: AccordionProps) => {
  const [isClicked, setIsClicked] = useState<number | null>(null);

  const revealAnswer = useCallback(
    (index: number) => {
      if (index === isClicked) {
        return setIsClicked(null);
      }
      setIsClicked(index);
    },
    [isClicked]
  );

  return (
    <div className="border-t border-b  border-gray-200">
      <ul>
        {data.map((item, index) => (
          <li
            className={cn(
              "border-b border-gray-200 last:border-none",
              isClicked === index ? "pb-8" : ""
            )}
            key={index}
          >
            <div
              className="text-xl py-7 flex items-center justify-between"
              onClick={() => revealAnswer(index)}
            >
              <h3>{item.key}</h3>
              <span>
                <Chevron
                  className={cn(
                    "w-4 h-4 transition-all duration-300 ease-in-out",
                    isClicked === index ? "-rotate-90" : "rotate-90"
                  )}
                />
              </span>
            </div>
            <div
              className={cn(
                "text-base font-normal transition-all duration-300 ease-in-out",
                isClicked === index ? "block" : "hidden"
              )}
            >
              <p>{item.value}</p>
              <p className="ml-[16px] ">{item?.plus}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordion;

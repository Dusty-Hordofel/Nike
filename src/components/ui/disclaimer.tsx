"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import useWindowSize from "@/hooks/common/use-window-size";

interface DisclaimerProps {
  text: string;
  limit: number;
}

const Disclaimer = ({ text, limit }: DisclaimerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLargeScreen = useWindowSize(960);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const displayText = isLargeScreen
    ? text
    : isExpanded && !isLargeScreen
    ? text
    : text.slice(0, limit) + "...";

  return (
    <div className="bg-black-200 text-white px-7 py-3 min-[960px]:px-[50px] min-[960px]:py-5">
      <p>
        <AnimatePresence initial={false}>
          <motion.span
            key={isExpanded ? "expanded" : "collapsed"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {displayText}
          </motion.span>
        </AnimatePresence>
        {!isLargeScreen && (
          <span
            className="text-gray-400  cursor-pointer"
            onClick={toggleExpand}
          >
            {!isExpanded ? " - Read more" : " - Read less"}
          </span>
        )}
      </p>
    </div>
  );
};

export default Disclaimer;

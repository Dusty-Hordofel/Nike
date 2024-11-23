import { useState, useEffect } from "react";

const useWindowSize = (breakpoint: number = 960) => {
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.innerWidth >= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= breakpoint);
    };

    window.addEventListener("resize", handleResize);

    // Initial check when the component mounts
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isLargeScreen;
};

export default useWindowSize;

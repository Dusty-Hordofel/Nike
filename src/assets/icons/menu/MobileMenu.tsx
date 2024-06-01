import { SVGProps } from "react";

const MobileMenu: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      {...props}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      role="img"
      width="24px"
      height="24px"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M21 5.25H3M21 12H3m18 6.75H3"
      ></path>
    </svg>
  );
};

export default MobileMenu;

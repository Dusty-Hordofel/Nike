import { SVGAttributes } from "react";

const ChevronRight = ({
  height = "24px",
  width = "24px",
  ...props
}: SVGAttributes<HTMLOrSVGElement>) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    role="img"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      d="M8.474 18.966L15.44 12 8.474 5.033"
    ></path>
  </svg>
);
export default ChevronRight;

import { SVGProps } from "react";

const Eye: React.FC<SVGProps<SVGSVGElement>> = ({
  stroke = "black",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    role="img"
    width="24"
    height="24"
    fill="none"
    {...props}
  >
    <path
      stroke={stroke}
      strokeWidth="1.5px"
      d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      clipRule="evenodd"
      fill="none"
    ></path>
    <path
      stroke={stroke}
      strokeWidth="1.5px"
      d="M21.602 11.566a.74.74 0 010 .867C20.54 13.924 16.73 18.75 12 18.75s-8.532-4.828-9.593-6.318a.74.74 0 010-.864C3.468 10.078 7.27 5.25 12 5.25c4.73 0 8.54 4.826 9.602 6.316z"
      clipRule="evenodd"
      fill="none"
    ></path>
  </svg>
);

export default Eye;

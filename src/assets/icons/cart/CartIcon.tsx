import { SVGProps } from "react";

const CartIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24px"
      role="img"
      viewBox="0 0 24 24"
      width="24px"
      className="w-6 h-6"
      {...props}
    >
      <path
        d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default CartIcon;

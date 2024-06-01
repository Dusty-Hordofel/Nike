import React from "react";

type Props = {
  className?: string;
};

const LoginIcon = (props: Props) => {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...props}>
      <path
        stroke="#111111"
        strokeWidth="2px"
        d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3"
        fill="none"
      ></path>
      <path
        stroke="#111111"
        strokeWidth="1.5"
        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
        fill="none"
      ></path>
    </svg>
  );
};

export default LoginIcon;

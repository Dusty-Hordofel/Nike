import React from "react";

const CheckoutLoader = () => {
  return (
    <div
      className=""
      style={{
        height: "32px",
        margin: "0px auto",
        width: "32px",
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 80 80"
        preserveAspectRatio="xMidYMid"
      >
        <rect x="0" y="0" width="80" height="80" fill="none"></rect>
        <circle
          cx="40"
          cy="40"
          r="32"
          stroke-dasharray="160 40"
          stroke="#000"
          fill="none"
          stroke-width="5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 40 40;180 40 40;360 40 40;"
            keyTimes="0;0.5;1"
            dur="1500ms"
            repeatCount="indefinite"
            begin="0s"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default CheckoutLoader;

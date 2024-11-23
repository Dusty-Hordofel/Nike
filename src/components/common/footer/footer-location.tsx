import React from "react";

const FooterLocation = () => {
  return (
    <button
      aria-label="Selected location: United States"
      className="flex gap-x-1 items-center max-[960px]:py-6"
      type="submit"
      title={`Selected location: United States`}
    >
      <span className="btn-icon-wrapper ">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          role="img"
          width="24px"
          height="24px"
          fill="none"
          className="text-gray-500"
        >
          <path
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M21.75 12A9.75 9.75 0 0112 21.75M21.75 12A9.75 9.75 0 0012 2.25M21.75 12c0 2.071-4.365 3.75-9.75 3.75S2.25 14.071 2.25 12m19.5 0c0-2.071-4.365-3.75-9.75-3.75S2.25 9.929 2.25 12M12 21.75A9.75 9.75 0 012.25 12M12 21.75c2.9 0 5.25-4.365 5.25-9.75S14.9 2.25 12 2.25m0 19.5c-2.9 0-5.25-4.365-5.25-9.75S9.1 2.25 12 2.25M2.25 12A9.75 9.75 0 0112 2.25"
          ></path>
        </svg>
      </span>
      <span className="text-gray-500">United States</span>
    </button>
  );
};

export default FooterLocation;
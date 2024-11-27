import React from "react";

export enum DeliveryMode {
  Shipping = "SHIPPING",
  Pickup = "PICKUP",
}

interface DeliveryModeSelectorProps {
  selectedMode: DeliveryMode;
  onSelectMode: (mode: DeliveryMode) => void;
}

const DeliveryModeSelector: React.FC<DeliveryModeSelectorProps> = ({
  selectedMode,
  onSelectMode,
}) => {
  return (
    <div role="radiogroup" className="flex gap-x-4 px-5">
      <div
        role="radio"
        aria-checked={selectedMode === DeliveryMode.Shipping}
        className={`w-full px-5 py-4  rounded-lg ${
          selectedMode === DeliveryMode.Shipping
            ? "border-black-200 border-2"
            : "border-gray-500 border"
        } cursor-pointer`}
        tabIndex={0}
        onClick={() => onSelectMode(DeliveryMode.Shipping)}
      >
        <h3 className="flex items-center justify-center h-full">
          <svg
            aria-hidden="true"
            className="mr-3"
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
              d="M15.75 16.565H8.5M.75 11.5V14A2.25 2.25 0 003 16.25h.25m16.25-6.5H3A2.25 2.25 0 01.75 7.5V5.25h17.189c.2 0 .39.079.531.22l4.56 4.56a.75.75 0 01.22.531v3.689A2.25 2.25 0 0121 16.5h-.75m-12 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm12 .033a2.25 2.25 0 11-4.502-.001 2.25 2.25 0 014.502.001z"
            ></path>
          </svg>
          <span className="h-full flex items-center ">Ship</span>
        </h3>
      </div>
      <div
        role="radio"
        aria-checked={selectedMode === DeliveryMode.Pickup}
        className={`w-full px-5 py-3 border rounded-lg ${
          selectedMode === DeliveryMode.Pickup
            ? "border-black-200 border-2"
            : "border-gray-500 border"
        } cursor-pointer`}
        tabIndex={0}
        onClick={() => onSelectMode(DeliveryMode.Pickup)}
      >
        <h3 className="flex items-center justify-center h-full">
          <svg
            aria-hidden="true"
            className="mr-2 "
            focusable="false"
            viewBox="0 0 24 24"
            role="img"
            width="24px"
            height="24px"
            fill="none"
          >
            <path
              fill="currentColor"
              d="M12 21.747l-.468.586a.75.75 0 00.936 0L12 21.747zM18 9c0 .92-.303 2.081-.824 3.362-.515 1.269-1.222 2.6-1.974 3.843a38.411 38.411 0 01-2.217 3.274c-.695.914-1.223 1.498-1.453 1.682l.936 1.172c.395-.314 1.023-1.042 1.711-1.947a39.904 39.904 0 002.306-3.404c.78-1.288 1.526-2.691 2.08-4.055.55-1.352.935-2.723.935-3.927H18zm-5.532 12.16c-.23-.183-.758-.767-1.453-1.681a38.41 38.41 0 01-2.217-3.274c-.752-1.243-1.458-2.574-1.974-3.843C6.303 11.081 6 9.921 6 9H4.5c0 1.204.385 2.575.934 3.927.555 1.364 1.302 2.767 2.08 4.055.78 1.288 1.6 2.474 2.307 3.404.688.905 1.316 1.633 1.711 1.947l.936-1.172zM6 9a6 6 0 016-6V1.5A7.5 7.5 0 004.5 9H6zm6-6a6 6 0 016 6h1.5A7.5 7.5 0 0012 1.5V3zm2.5 6a2.5 2.5 0 01-2.5 2.5V13a4 4 0 004-4h-1.5zM12 11.5A2.5 2.5 0 019.5 9H8a4 4 0 004 4v-1.5zM9.5 9A2.5 2.5 0 0112 6.5V5a4 4 0 00-4 4h1.5zM12 6.5A2.5 2.5 0 0114.5 9H16a4 4 0 00-4-4v1.5z"
            ></path>
          </svg>
          <span className="h-full flex items-center ">Pick Up</span>
        </h3>
      </div>
    </div>
  );
};

export default DeliveryModeSelector;

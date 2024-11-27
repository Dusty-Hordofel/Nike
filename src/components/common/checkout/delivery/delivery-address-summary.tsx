"use client";

import React, { Dispatch, SetStateAction } from "react";
import ActiveDeliveryAddress from "./active-delivery-address";
import DeliveryAddresses from "./delivery-addresses";
import { UseFormReset } from "react-hook-form";

interface DeliveryAddressSummaryProps {
  activeDeliveryAddress: any;
  deliveryAddresses: any;
  deliveryStep: number;
  onDeliveryStep: Dispatch<SetStateAction<number | null>>;
  onAddressId: Dispatch<SetStateAction<string | undefined>>;
  handleSetActiveAddress: any;
  handleAddNewAddress: () => void;
  onActiveSection: Dispatch<SetStateAction<"address" | "payment" | "summary">>;
  reset: UseFormReset<{
    address: string;
    lastName: string;
    firstName: string;
    city: string;
    postalCode: string;
    email: string;
    phoneNumber: string;
    country: string;
    _id?: string | undefined;
    companyInfo?: string | undefined;
  }>;
}

const DeliveryAddressSummary = ({
  onAddressId,
  deliveryAddresses,
  activeDeliveryAddress,
  deliveryStep,
  onDeliveryStep,
  onActiveSection,
  handleAddNewAddress,
  handleSetActiveAddress,
  reset,
}: DeliveryAddressSummaryProps) => {
  const {
    activeAddress: {
      address,
      city,
      companyInfo,
      country,
      email,
      firstName,
      lastName,
      phoneNumber,
      postalCode,
    },
  } = activeDeliveryAddress;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // pour un scroll fluide
    });
  };

  return (
    <div className={`${deliveryStep === 2 ? "py-5" : "pt-5"} px-5`}>
      <div data-attr="shippingPreviewContainer">
        <div
          className={`${deliveryStep === 3 && "mb-4"}`}
          data-attr="addressPreview"
        >
          <h3
            className={`shippingContainer ${
              deliveryStep === 3 ? "block text-black-200" : "hidden"
            }`}
          >
            Shipping Address
          </h3>
          <div className="space-y-2">
            {deliveryStep === 2 && (
              <DeliveryAddresses
                deliveryAddresses={deliveryAddresses.data.addresses}
                handleScrollToTop={handleScrollToTop}
                handleSetActiveAddress={handleSetActiveAddress}
                onDeliveryStep={onDeliveryStep}
                onActiveSection={onActiveSection}
                onAddressId={onAddressId}
                reset={reset}
              />
            )}
            {deliveryStep === 3 && (
              <ActiveDeliveryAddress
                lastName={lastName}
                firstName={firstName}
                address={address}
                city={city}
                postalCode={postalCode}
                email={email}
                phoneNumber={phoneNumber}
              />
            )}
          </div>
        </div>
      </div>

      {deliveryStep === 2 && (
        <div className="pt-2 px-[6px] flex justify-end bg-warning items-center underline font-medium">
          <button
            className="text-xs"
            type="button"
            onClick={handleAddNewAddress}
          >
            Add a new address
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddressSummary;

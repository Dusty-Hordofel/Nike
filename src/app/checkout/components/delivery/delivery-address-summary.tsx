"use client";

import React, { Dispatch, SetStateAction } from "react";

interface DeliveryAddressSummaryProps {
  userActiveAddress: any;
  userDeliveryAddresses: any;
  deliveryStep: number;
  onDeliveryStep: Dispatch<SetStateAction<number>>;
  setAddressId: Dispatch<SetStateAction<string | undefined>>;
  handleChangeActiveAddress: any;
  handleAddNewAddress: () => void;
  onActiveSection: Dispatch<SetStateAction<"address" | "payment" | "summary">>;
}
const DeliveryAddressSummary = ({
  setAddressId,
  userDeliveryAddresses,
  userActiveAddress,
  deliveryStep,
  onDeliveryStep,
  onActiveSection,
  handleAddNewAddress,
  handleChangeActiveAddress,
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
  } = userActiveAddress;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // pour un scroll fluide
    });
  };

  return (
    <div className={`${deliveryStep === 2 ? "py-5" : "pt-5"} bg-warning px-5`}>
      <div data-attr="shippingPreviewContainer">
        <div
          className={`${deliveryStep === 3 && "mb-4"}`}
          data-attr="addressPreview"
        >
          <h3
            className={`shippingContainer ${deliveryStep === 3 ? "block text-black-200" : "hidden"}`}
          >
            Adresse de livraison
          </h3>
          <div className="space-y-2">
            {deliveryStep === 2 &&
              userDeliveryAddresses.data.addresses.map((address: any) => (
                <div
                  className={` ${address.active ? "border-2 border-black-200" : "border-[1px] border-gray-500"}  rounded-lg  text-black-200 p-4 bg-blue-100 relative hover:border-black-200`}
                  onClick={() => handleChangeActiveAddress(address._id)}
                >
                  <div className="css-7ym3jb">
                    <p data-attr="address-preview-fullName">
                      {address.lastName} {address.firstName}
                    </p>
                    <p>
                      <span data-attr="address-preview-address1">
                        {address.address}
                      </span>
                    </p>
                    <div className="ncss-row">
                      <div className="ncss-col-sm-12">
                        <p data-attr="address-preview-city">
                          {address.city}, {address.postalCode}
                        </p>
                      </div>
                    </div>
                    <p data-attr="address-preview-email">{address.email}</p>
                    <p data-attr="address-preview-phoneNumber">
                      {address.phoneNumber}
                    </p>
                  </div>
                  <button
                    // ${deliveryStep === 0 ? "block" : "hidden"}
                    aria-label="Modifier,Adresse de livraison"
                    className={`absolute right-5 top-5 underline
          
          `}
                    type="button"
                    onClick={() => {
                      onDeliveryStep(1);
                      onActiveSection("address");
                      handleScrollToTop();
                      setAddressId(address._id);
                    }}
                  >
                    Modifier<span className="ripple"></span>
                  </button>
                </div>
              ))}
            {deliveryStep === 3 && (
              <div className="text-gray-500  border-black-200 py-1  bg-blue-100 relative ">
                <div className="css-7ym3jb">
                  <p data-attr="address-preview-fullName">
                    {lastName} {firstName}
                  </p>
                  <p>
                    <span data-attr="address-preview-address1">{address}</span>
                  </p>
                  <div className="ncss-row">
                    <div className="ncss-col-sm-12">
                      <p data-attr="address-preview-city">
                        {city}, {postalCode}
                      </p>
                    </div>
                  </div>
                  <p data-attr="address-preview-email">{email}</p>
                  <p data-attr="address-preview-phoneNumber">{phoneNumber}</p>
                </div>
              </div>
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
            {" "}
            Ajouter une nouvelle adresse<span className="ripple"></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddressSummary;

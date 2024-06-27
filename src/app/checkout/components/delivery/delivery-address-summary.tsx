"use client";
import React, { Dispatch, SetStateAction } from "react";

interface DeliveryAddressSummaryProps {
  deliveryAddress: any;
  deliveryStep: number;
  onDeliveryStep: Dispatch<SetStateAction<number>>;
  handleAddNewAddress: () => void;
}
const DeliveryAddressSummary = async ({
  deliveryAddress,
  deliveryStep,
  onDeliveryStep,
  handleAddNewAddress,
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
  } = deliveryAddress;
  return (
    <div className="p-5 bg-warning">
      <div
        // className="p-5 text-gray-500  bg-blue-100"
        className={`${deliveryStep === 3 ? "text-gray-500" : "border-2 rounded-lg border-black-200 text-black-200 p-4"}  bg-blue-100 relative `}
      >
        {/* className="px-2" */}
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
        </div>

        <button
          // ${deliveryStep === 0 ? "block" : "hidden"}
          aria-label="Modifier,Adresse de livraison"
          className={`absolute right-5 top-5 underline
          
          `}
          type="button"
          onClick={() => {
            onDeliveryStep(1);
          }}
        >
          Modifier<span className="ripple"></span>
        </button>
      </div>
      <div className="pt-2 px-[6px] flex justify-end bg-warning items-center underline font-medium">
        <button className="text-xs" type="button" onClick={handleAddNewAddress}>
          {" "}
          Ajouter une nouvelle adresse<span className="ripple"></span>
        </button>
      </div>
    </div>
  );
};

export default DeliveryAddressSummary;

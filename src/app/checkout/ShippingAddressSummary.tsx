"use client";
import React, { Dispatch, SetStateAction } from "react";

interface ShippingAddressSummaryProps {
  shippingAddress: any;
  formStep: number;
  setFormStep: Dispatch<SetStateAction<number>>;
}
const ShippingAddressSummary = async ({
  shippingAddress,
  formStep,
  setFormStep,
}: ShippingAddressSummaryProps) => {
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
  } = shippingAddress;
  return (
    <>
      <div
        // className="p-5 text-gray-500  bg-blue-100"
        className={`${formStep === 3 ? "text-gray-500" : "border-2 rounded-lg border-black-200 text-black-200"}  bg-blue-100 relative `}
      >
        {/* className="px-2" */}
        <div data-attr="shippingPreviewContainer">
          <div
            className={`${formStep === 3 && "mb-4"}`}
            data-attr="addressPreview"
          >
            <h3
              className={`shippingContainer ${formStep === 3 ? "block text-black-200" : "hidden"}`}
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
          {/* <div
            data-attr="shippingContainer"
            className={`shippingContainer ${formStep === 2 ? "block" : "hidden"} border-2 rounded-lg border-black-200 text-black-200 `}
          >
            <h3 className="text-black-200">Délai de livraison</h3>
            <p data-attr="shipping-preview-method">
              Gratuit
              <br />
              <span>Livraison d'ici le&nbsp;mer. 26 juin</span>
            </p>
          </div> */}
        </div>

        <button
          // ${formStep === 0 ? "block" : "hidden"}
          aria-label="Modifier,Adresse de livraison"
          className={`absolute right-5 top-5 underline
          
          `}
          type="button"
          onClick={() => {
            setFormStep(1);
          }}
        >
          Modifier<span className="ripple"></span>
        </button>
      </div>
    </>
  );
};

export default ShippingAddressSummary;

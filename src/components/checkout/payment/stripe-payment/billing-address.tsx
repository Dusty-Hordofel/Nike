import React from "react";
import { ActiveDeliveryAddress } from "../../delivery";
import SameBillingAsShippingCheckbox from "./same-billing-as-shipping-checkbox";

type BillingAddressProps = {};

const BillingAddress = ({ activeDeliveryAddress, paymentStep }: any) => {
  console.log("🚀 ~ BillingAddress ~ paymentStep:BILLING", paymentStep);
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

  return (
    <>
      {/* 5  Recapitulatif*/}
      <div>
        {paymentStep === 1 && (
          <div className="mb-3">
            <SameBillingAsShippingCheckbox />
          </div>
        )}
        {paymentStep !== null && paymentStep === 3 && (
          <ActiveDeliveryAddress
            lastName={lastName}
            firstName={firstName}
            address={address}
            city={city}
            postalCode={postalCode}
          />
        )}
      </div>
    </>
  );
};

export default BillingAddress;

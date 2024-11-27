import React, { Dispatch, SetStateAction } from "react";
import DeliveryAddress from "./delivery-address";
import { UseFormReset } from "react-hook-form";

type DeliveryAddressesProps = {
  deliveryAddresses: any;
  onDeliveryStep: Dispatch<SetStateAction<number | null>>;
  onAddressId: Dispatch<SetStateAction<string | undefined>>;
  handleSetActiveAddress: any;
  onActiveSection: Dispatch<SetStateAction<"address" | "payment" | "summary">>;
  handleScrollToTop: () => void;
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
};

const DeliveryAddresses = ({
  deliveryAddresses,
  handleScrollToTop,
  handleSetActiveAddress,
  onDeliveryStep,
  onActiveSection,
  onAddressId,
  reset,
}: any) => {
  return deliveryAddresses.map(
    (address: DeliveryAddressesProps, index: number) => (
      <DeliveryAddress
        key={index}
        address={address}
        handleScrollToTop={handleScrollToTop}
        handleSetActiveAddress={handleSetActiveAddress}
        onDeliveryStep={onDeliveryStep}
        onActiveSection={onActiveSection}
        onAddressId={onAddressId}
        reset={reset}
      />
    )
  );
};

export default DeliveryAddresses;

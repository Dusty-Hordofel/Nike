import React, { Dispatch, SetStateAction } from "react";
import DeliveryAddress from "./delivery-address";

type DeliveryAddressesProps = {
  deliveryAddresses: any;
  onDeliveryStep: Dispatch<SetStateAction<number | null>>;
  onAddressId: Dispatch<SetStateAction<string | undefined>>;
  handleSetActiveAddress: any;
  onActiveSection: Dispatch<SetStateAction<"address" | "payment" | "summary">>;
  handleScrollToTop: () => void;
};

const DeliveryAddresses = ({
  deliveryAddresses,
  handleScrollToTop,
  handleSetActiveAddress,
  onDeliveryStep,
  onActiveSection,
  onAddressId,
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
      />
    )
  );
};

export default DeliveryAddresses;

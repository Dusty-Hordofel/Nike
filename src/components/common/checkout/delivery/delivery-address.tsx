import React, { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";

type DeliveryAddressProps = {
  address: any;
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

const DeliveryAddress = ({
  address,
  handleSetActiveAddress,
  onDeliveryStep,
  onActiveSection,
  handleScrollToTop,
  onAddressId,
  reset,
}: DeliveryAddressProps) => {
  return (
    <div
      className={` ${
        address.active
          ? "border-2 border-black-200"
          : "border-[1px] border-gray-500"
      }  rounded-lg  text-black-200 p-4 bg-white relative hover:border-black-200 cursor-pointer`}
      onClick={(e) => {
        handleSetActiveAddress(address._id);
      }}
    >
      <div className="css-7ym3jb">
        <p data-attr="address-preview-fullName">
          {address.lastName} {address.firstName}
        </p>
        <p>
          <span data-attr="address-preview-address1">{address.address}</span>
        </p>
        <div className="ncss-row">
          <div className="ncss-col-sm-12">
            <p data-attr="address-preview-city">
              {address.city}, {address.postalCode}
            </p>
          </div>
        </div>
        <p data-attr="address-preview-email">{address.email}</p>
        <p data-attr="address-preview-phoneNumber">{address.phoneNumber}</p>
      </div>
      <button
        aria-label="Edit,Delivery address"
        className={`absolute right-5 top-5 underline`}
        type="button"
        onClick={(e) => {
          reset(address);
          e.stopPropagation();
          onDeliveryStep(1);
          onActiveSection("address");
          handleScrollToTop();
          onAddressId(address._id);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default DeliveryAddress;

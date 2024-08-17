import React, { Dispatch, SetStateAction } from "react";

type DeliveryAddressProps = {
  address: any;
  onDeliveryStep: Dispatch<SetStateAction<number>>;
  onAddressId: Dispatch<SetStateAction<string | undefined>>;
  handleSetActiveAddress: any;
  onActiveSection: Dispatch<SetStateAction<"address" | "payment" | "summary">>;
  handleScrollToTop: () => void;
};

const DeliveryAddress = ({
  address: {
    lastName,
    firstName,
    active,
    address,
    _id,
    city,
    postalCode,
    email,
    phoneNumber,
  },
  handleSetActiveAddress,
  onDeliveryStep,
  onActiveSection,
  handleScrollToTop,
  onAddressId,
}: DeliveryAddressProps) => {
  return (
    <div
      className={` ${active ? "border-2 border-black-200" : "border-[1px] border-gray-500"}  rounded-lg  text-black-200 p-4 bg-blue-100 relative hover:border-black-200 cursor-pointer`}
      onClick={() => handleSetActiveAddress(_id)}
    >
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
      <button
        // ${deliveryStep === 0 ? "block" : "hidden"}
        aria-label="Modifier,Adresse de livraison"
        className={`absolute right-5 top-5 underline`}
        type="button"
        onClick={() => {
          onDeliveryStep(1);
          onActiveSection("address");
          handleScrollToTop();
          onAddressId(_id);
        }}
      >
        Modifier<span className="ripple"></span>
      </button>
    </div>
  );
};

export default DeliveryAddress;

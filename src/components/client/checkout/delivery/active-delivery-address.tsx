import React from "react";

const ActiveDeliveryAddress = ({
  lastName,
  firstName,
  address,
  city,
  postalCode,
  email,
  phoneNumber,
}: any) => {
  return (
    <section className="text-gray-500  border-black-200 py-1  bg-blue-100 relative ">
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
    </section>
  );
};

export default ActiveDeliveryAddress;

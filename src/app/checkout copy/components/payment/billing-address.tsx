import React from "react";

type BillingAddressProps = {};

const BillingAddress = ({ activeDeliveryAddress }: any) => {
  return (
    <>
      {/* 5  Recapitulatif*/}
      <div>
        <div className="mb-3">
          <div className="uikit-checkbox-toggler">
            <div className=" flex">
              <input
                type="checkbox"
                className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 "
                name="billingAddress"
                id="billingAddress"
                aria-describedby="a11y-label-details-billingAddress"
                value=""
                checked={activeDeliveryAddress?.success}
              />
              <div className="nds-checkbox-icon">
                <span aria-hidden="true" className="checkbox-box circle"></span>
                <span aria-hidden="true" className="checkbox-box"></span>
                <span
                  aria-hidden="true"
                  className="checkbox-box-icon-container"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="24px"
                    height="24px"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g transform="translate(2.000000, 2.000000)">
                        <rect x="0" y="0" width="20" height="20" rx="10"></rect>
                        <rect
                          className="checkicon-fill"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          rx="5"
                        ></rect>
                        <path
                          className="checkicon-check"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.00134645 9.81868355 9.12119517 13.003429 14.9964286 7"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </span>
              </div>
              <label htmlFor="billingAddress" className="nds-checkbox-label">
                Adresse de facturation identique à l'adresse de livraison
              </label>
            </div>
            <div className="d-sm-h"></div>
          </div>
        </div>
        <div className="text-gray-500">
          <h3 className="text-black-200">Adresse de livraison</h3>
          <div className="css-7ym3jb">
            <p>Lionelle Berlone BASSOLA MOUKOURI</p>
            <p>
              <span>98 Rue Heron</span>
            </p>
            <div className="ncss-row">
              <div className="ncss-col-sm-12">
                <p data-attr="address-preview-city">Bordeaux, 33000, FR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingAddress;

// src/components/PaymentHeader.tsx
import React from "react";

interface PaymentHeaderProps {
  country: string;
  onEdit: () => void;
}

const BillingCountry: React.FC<PaymentHeaderProps> = ({ country, onEdit }) => {
  return (
    <div>
      <h3 className=" flex items-center">
        Billing Country/Region
        <span id="billingCountryTipWrapper" className="flex  items-center">
          <button
            className="d-sm-ib css-9a7n2d"
            id="billingCountryTip"
            aria-label="Billing Country/Region info"
          >
            <div className="css-1ou3w6b">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="24px"
                height="24px"
                fill="none"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 20a8 8 0 100-16 8 8 0 000 16zm.75-4.5V17h-1.5v-1.5h1.5zM10.5 10c0-.918.831-1.644 1.764-1.472h.006c.6.106 1.096.603 1.201 1.202v.001a1.502 1.502 0 01-.82 1.63 2.411 2.411 0 00-1.401 2.189V14h1.5v-.45a.91.91 0 01.532-.828l.01-.005a3.002 3.002 0 001.657-3.248 3.008 3.008 0 00-2.416-2.417C10.647 6.706 9 8.179 9 10h1.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              className="p4-sm z2 css-17f46hh"
              data-attr="test-message"
              hidden={true}
            >
              <p className="">
                This corresponds to the country/region where your payment method
                is registered.
              </p>
            </div>
          </button>
        </span>
      </h3>
      <div id="edit-button-container" className="flex items-center">
        <span className="mr1-sm css-zjxnbk flex">
          {country}
          <button
            aria-label="Edit"
            className="ml-4 bg-yellow-100"
            type="button"
            id="billingCountryEditButton"
            onClick={onEdit}
          >
            Edit
          </button>
        </span>
      </div>
    </div>
  );
};

export default BillingCountry;

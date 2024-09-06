const SameBillingAsShippingCheckbox = ({ checked, onChange }: any) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
        name="billingAddress"
        id="billingAddress"
        aria-describedby="a11y-label-details-billingAddress"
        value=""
        checked={true || checked}
        onChange={onChange}
      />
      <div className="nds-checkbox-icon">
        <span aria-hidden="true" className="checkbox-box circle"></span>
        <span aria-hidden="true" className="checkbox-box"></span>
        <span aria-hidden="true" className="checkbox-box-icon-container">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            role="img"
            width="24px"
            height="24px"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
  );
};

export default SameBillingAsShippingCheckbox;

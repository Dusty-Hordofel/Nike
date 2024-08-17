import React from "react";

type Props = {};

const PaymentAndBillingSummary = (props: Props) => {
  return (
    <div className="px-5 py-3">
      <div className="ncss-row">
        <div className="ncss-col-sm-12 prl5-sm pt3-sm pb3-sm">
          <div className="ncss-container" data-attr="paymentPreviewContainer">
            <section className="mb-4">
              <h3 className="pb3-sm css-1qpib4x">Mode de paiement</h3>
              <div
                className="mt2-sm u-max-width text-gray-500"
                data-attr="visa-icn"
              >
                <span
                  role="img"
                  aria-label="visa"
                  className="css-10s94pm"
                ></span>
                <span className="ml2-sm mr2-sm">8631</span>
                <span>Exp: &nbsp;12/2025</span>
              </div>
            </section>

            <section>
              <div>
                <h3 className="css-1qpib4x">Informations de facturation</h3>
                <div className="text-gray-500">
                  <p data-attr="address-preview-fullName">
                    Lionelle Berlone BASSOLA MOUKOURI
                  </p>
                  <p>
                    <span data-attr="address-preview-address1">
                      98 Rue Heron
                    </span>
                  </p>
                  <div className="ncss-row">
                    <div className="ncss-col-sm-12">
                      <p data-attr="address-preview-city">
                        Bordeaux, 33000, FR
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* <Loader /> */}
      {/* <div className="d-sm-h">
        <div className="d-sm-h">
          <div className="ncss-container ta-sm-c u-full-height">
            <div className="ncss-row u-full-height u-full-width d-sm-t ta-sm-c pt6-sm pb6-sm pt12-lg pb12-lg">
              <div className="ncss-col-sm-12 d-sm-tc va-sm-m">
                <div
                  className=""
                  style={{
                    height: "32px",
                    margin: "0px auto",
                    width: "32px",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 80 80"
                    preserveAspectRatio="xMidYMid"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="80"
                      height="80"
                      fill="none"
                    ></rect>
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke-dasharray="160 40"
                      stroke="#000"
                      fill="none"
                      stroke-width="5"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 40 40;180 40 40;360 40 40;"
                        keyTimes="0;0.5;1"
                        dur="1500ms"
                        repeatCount="indefinite"
                        begin="0s"
                      ></animateTransform>
                    </circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="klarna-container" className="p5-sm"></section>
      </div> */}
    </div>
  );
};

export default PaymentAndBillingSummary;

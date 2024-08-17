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
    </div>
  );
};

export default PaymentAndBillingSummary;

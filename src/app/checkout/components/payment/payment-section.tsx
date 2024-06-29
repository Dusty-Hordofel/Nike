"use client";
// import { paymentMethods } from "../../../data/paymentMethods";

import { paymentMethods } from "@/assets/data/payment-methods";
import GooglePay from "@/assets/icons/google-pay/GooglePay";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import "./input.css";
import CreditCard from "@/assets/icons/credit-card/CreditCard";
import { Button } from "@/components/ui/buttons/button/button";
import CheckoutHeader from "@/components/Checkout/checkout-header";
import { useDeliveryContext } from "@/context/DeliveryContext";
// import CheckoutHeader from "../checkout-header";
// import styles from "./styles.module.scss";

interface PaymentProps {
  // handlePaymentMethodChange: ChangeEventHandler<HTMLInputElement>;
  // selectedPaymentMethod: string;
  // setSelectedPaymentMethod: Dispatch<SetStateAction<string>>;
  deliveryAddress: any;
  // deliveryStep: number;
}

export default function PaymentSection({
  deliveryAddress,
  // handlePaymentMethodChange,
  // selectedPaymentMethod,
  // deliveryStep,
  // setSelectedPaymentMethod,
  // paymentMethod,
  // setPaymentMethod,
  // profile,
}: PaymentProps) {
  console.log("🚀 ~ deliveryAddress:", deliveryAddress);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "creditDebit" | "paypal" | "googlePay"
  >("creditDebit");
  // console.log("🚀 ~ deliveryStep:", deliveryStep);
  const { deliveryStep, activeSection } = useDeliveryContext();

  const handlePaymentMethodChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value as "creditDebit" | "paypal" | "googlePay";
    setSelectedPaymentMethod(value);
  };

  return (
    <section>
      <span className="sr-only">Paiement Étape 2 sur 3 Étape en cours</span>
      <CheckoutHeader title="Paiement" />

      <div
        className={`mt-2 ${deliveryStep === 3 && activeSection === "payment" && deliveryAddress.success ? "block" : "hidden"}`}
      >
        {/* loading 1 à ajouter*/}
        {/* 2 suite*/}
        {/* ETAPE 1 */}
        <div className="bg-green-200">
          <h3 className="bg-blue-100 flex items-center ">
            Pays/région de facturation
            <span
              id="billingCountryTipWrapper"
              className="flex bg-blue-300  items-center"
            >
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
                      fill-rule="evenodd"
                      d="M12 20a8 8 0 100-16 8 8 0 000 16zm.75-4.5V17h-1.5v-1.5h1.5zM10.5 10c0-.918.831-1.644 1.764-1.472h.006c.6.106 1.096.603 1.201 1.202v.001a1.502 1.502 0 01-.82 1.63 2.411 2.411 0 00-1.401 2.189V14h1.5v-.45a.91.91 0 01.532-.828l.01-.005a3.002 3.002 0 001.657-3.248 3.008 3.008 0 00-2.416-2.417C10.647 6.706 9 8.179 9 10h1.5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div
                  className="p4-sm z2 css-17f46hh"
                  data-attr="test-message"
                  hidden={true}
                >
                  <p className="">
                    Cela correspond au pays/à la région où ton mode de paiement
                    est enregistré.
                  </p>
                </div>
              </button>
            </span>
          </h3>
          <div id="edit-button-container" className="flex items-center">
            <span className="mr1-sm css-zjxnbk  flex">
              France
              <button
                aria-label="Modifier"
                className="ml-4 bg-yellow-100 "
                type="button"
                id="billingCountryEditButton"
              >
                Modifier<span className="ripple"></span>
              </button>
            </span>
          </div>
        </div>
        {/* 3 */}
        {/* 4 */}
        <div>
          <h3 className="font-medium mb-6">Sélectionner un mode de paiement</h3>
          <div className="space-y-4">
            {/* Credit Debit */}
            <div className="flex items-center relative">
              <input
                type="radio"
                id="creditDebit"
                name="radioGroup"
                value="creditDebit"
                checked={selectedPaymentMethod === "creditDebit"}
                onChange={handlePaymentMethodChange}
                className="custom-radio"
              />
              <label
                htmlFor="creditDebit"
                className="flex items-center bg-warning  space-x-2 ml-3"
              >
                <CreditCard />
                <span>Carte de paiement</span>
              </label>
            </div>
            {/* Paypal */}
            <div className="flex items-center relative">
              <input
                type="radio"
                id="paypal"
                name="radioGroup"
                value="paypal"
                checked={selectedPaymentMethod === "paypal"}
                onChange={handlePaymentMethodChange}
                className="custom-radio"
              />
              <label htmlFor="paypal">
                <span>
                  <img
                    alt="PayPal"
                    src="//www.nike.com/static/checkoutux/checkout/production-2024-06-04--22-27-48/_next/img/payment/logo_paypal2x.png"
                    decoding="async"
                    data-nimg="intrinsic"
                    className="w-20 h-6 ml-3"
                  />
                </span>
              </label>
            </div>
            {/* GooglePay */}
            <div className="flex items-center relative">
              <input
                type="radio"
                id="googlePay"
                name="radioGroup"
                value="googlePay"
                checked={selectedPaymentMethod === "googlePay"}
                onChange={handlePaymentMethodChange}
                className="custom-radio"
              />
              <label
                htmlFor="googlePay"
                className="flex items-center space-x-2 ml-3 border rounded-full px-2 py-1"
              >
                <GooglePay />
              </label>
            </div>
            <div className="mt-4">
              <p>Selected Option: {selectedPaymentMethod}</p>
            </div>
          </div>
        </div>
        {/* ETAPE 2 */}
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
                  checked={deliveryAddress.success}
                />
                <div className="nds-checkbox-icon">
                  <span
                    aria-hidden="true"
                    className="checkbox-box circle"
                  ></span>
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
                          <rect
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            rx="10"
                          ></rect>
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
        {/* Recap de ladresse */}
        <div className="">
          <div className="ncss-row">
            <div className="ncss-col-sm-12 prl5-sm pt3-sm pb3-sm">
              <div
                className="ncss-container"
                data-attr="paymentPreviewContainer"
              >
                <section className="mb4-sm">
                  <h3 className="pb3-sm css-1qpib4x">Mode de paiement</h3>
                  <div className="mt2-sm u-max-width" data-attr="visa-icn">
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
                    <div className="css-7ym3jb">
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
          <div className="d-sm-h">
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
          </div>
        </div>

        {/* Button de validation de la méthode de payment */}
        <div className="mt-6 bg-warning flex justify-end pb-5 px-5">
          <Button
            size="medium"
            className="nds-btn css-b4ij8a ex41m6f0 btn-primary-dark  btn-md"
            type="button"
            data-attr="continueToOrderReviewBtn"
          >
            Continuer pour voir le récapitulatif de la commande
            <span className="ripple"></span>
          </Button>
        </div>
      </div>

      <div className=""></div>
    </section>
  );
}

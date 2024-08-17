// import { paymentMethods } from "../../../data/paymentMethods";
import { paymentMethods } from "@/assets/data/payment-methods";
import GooglePay from "@/assets/icons/google-pay/GooglePay";
// import styles from "./styles.module.scss";

interface PaymentProps {
  paymentMethod?: any;
  setPaymentMethod?: any;
  profile?: any;
}

export default function Payment({
  paymentMethod,
  setPaymentMethod,
  profile,
}: PaymentProps) {
  return (
    <section>
      <span className="css-1qgj8yk">Paiement Étape 2 sur 3 Étape en cours</span>
      <header className="px-5 pt-3 pb-7 bg-warning">
        <h2 className="text-2xl font-medium">Paiement</h2>
      </header>

      <div className="mt-2">
        {/* loading 1 à ajouter*/}
        {/* 2 suite*/}
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
        <div className="">
          <h3 className="font-medium mb-6">Sélectionner un mode de paiement</h3>
          <div className="ncss-row css-1oj38by">
            <div className="ncss-col-sm-12 pb3-sm va-sm-t">
              <div className="nds-radio css-ecsns2 e1d37qfi0 flex">
                <input
                  type="radio"
                  className=""
                  id="creditDebit"
                  value="creditDebit"
                  checked={true}
                />
                <span className="radio-circle"></span>
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
                      <circle
                        className="radio-outline"
                        stroke="currentColor"
                        stroke-width="1.5"
                        cx="10"
                        cy="10"
                        r="9.25"
                      ></circle>
                      <circle
                        className="radio-fill"
                        fill="currentColor"
                        cx="10"
                        cy="10"
                        r="5"
                      ></circle>
                    </g>
                  </g>
                </svg>
                <label htmlFor="creditDebit">
                  <svg
                    aria-hidden="true"
                    className="mr1-sm"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="24px"
                    height="24px"
                    fill="none"
                    // style="color: black; position: relative; top: 6px"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      d="M3.75 9.75h16.5m-2.25 9H6a2.25 2.25 0 01-2.25-2.25v-9A2.25 2.25 0 016 5.25h12a2.25 2.25 0 012.25 2.25v9A2.25 2.25 0 0118 18.75z"
                    ></path>
                  </svg>
                  Carte de paiement
                </label>
              </div>
            </div>
            {/* Paypal */}
            <div className="ncss-col-sm-12 pb3-sm va-sm-t">
              <div className="nds-radio css-11tozkn e1d37qfi0 flex">
                <input type="radio" className="" id="paypal" value="paypal" />
                <span className="radio-circle"></span>
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
                      <circle
                        className="radio-outline"
                        stroke="currentColor"
                        stroke-width="1.5"
                        cx="10"
                        cy="10"
                        r="9.25"
                      ></circle>
                      <circle
                        className="radio-fill"
                        fill="currentColor"
                        cx="10"
                        cy="10"
                        r="5"
                      ></circle>
                    </g>
                  </g>
                </svg>
                <label htmlFor="paypal">
                  <span
                  // style="
                  //   box-sizing: border-box;
                  //   display: inline-block;
                  //   overflow: hidden;
                  //   width: initial;
                  //   height: initial;
                  //   background: none;
                  //   opacity: 1;
                  //   border: 0px;
                  //   margin: 0px;
                  //   padding: 0px;
                  //   position: relative;
                  //   max-width: 100%;
                  // "
                  >
                    <span
                    // style="
                    //   box-sizing: border-box;
                    //   display: block;
                    //   width: initial;
                    //   height: initial;
                    //   background: none;
                    //   opacity: 1;
                    //   border: 0px;
                    //   margin: 0px;
                    //   padding: 0px;
                    //   max-width: 100%;
                    // "
                    >
                      <img
                        className="w-20 h-6"
                        alt=""
                        aria-hidden="true"
                        src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2760%27%20height=%2716%27/%3e"
                        // style="
                        //   display: block;
                        //   max-width: 100%;
                        //   width: initial;
                        //   height: initial;
                        //   background: none;
                        //   opacity: 1;
                        //   border: 0px;
                        //   margin: 0px;
                        //   padding: 0px;
                        // "
                      />
                    </span>
                    <img
                      alt="PayPal"
                      src="//www.nike.com/static/checkoutux/checkout/production-2024-06-04--22-27-48/_next/img/payment/logo_paypal2x.png"
                      decoding="async"
                      data-nimg="intrinsic"
                      className="w-20 h-6"
                      // style="
                      //   position: absolute;
                      //   inset: 0px;
                      //   box-sizing: border-box;
                      //   padding: 0px;
                      //   border: none;
                      //   margin: auto;
                      //   display: block;
                      //   width: 0px;
                      //   height: 0px;
                      //   min-width: 100%;
                      //   max-width: 100%;
                      //   min-height: 100%;
                      //   max-height: 100%;
                      // "
                    />
                  </span>
                </label>
              </div>
            </div>
            <div className="ncss-col-sm-12 pb3-sm va-sm-t">
              <div className="flex">
                <input
                  type="radio"
                  className=""
                  id="GooglePay"
                  value="GooglePay"
                />
                <span className="radio-circle"></span>
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
                      <circle
                        className="radio-outline"
                        stroke="currentColor"
                        stroke-width="1.5"
                        cx="10"
                        cy="10"
                        r="9.25"
                      ></circle>
                      <circle
                        className="radio-fill"
                        fill="currentColor"
                        cx="10"
                        cy="10"
                        r="5"
                      ></circle>
                    </g>
                  </g>
                </svg>
                <label htmlFor="GooglePay">
                  <GooglePay />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

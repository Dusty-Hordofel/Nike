import GooglePay from "@/assets/icons/google-pay/GooglePay";
import CreditCard from "@/assets/icons/credit-card/CreditCard";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

type PaymentMethodProps = {
  selectedPaymentMethod: "creditDebit" | "paypal" | "googlePay";
  onPaymentMethodChange: ChangeEventHandler<HTMLInputElement>;
};

const PaymentMethod = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}: PaymentMethodProps) => {
  return (
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
            onChange={onPaymentMethodChange}
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
            onChange={onPaymentMethodChange}
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
            onChange={onPaymentMethodChange}
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
  );
};

export default PaymentMethod;

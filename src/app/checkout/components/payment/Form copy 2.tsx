import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {
  StripeCardNumberElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardCvcElementChangeEvent,
  PaymentMethodResult,
} from "@stripe/stripe-js";

type ErrorState = {
  number: string;
  expiry: string;
  cvc: string;
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<ErrorState>({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = (
    event:
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent,
    field: keyof ErrorState
  ) => {
    if (event.error) {
      setError((prevState) => ({
        ...prevState,
        [field]: event.error?.message || "",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    const { error: paymentMethodError }: PaymentMethodResult =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (paymentMethodError) {
      setError((prevState) => ({
        ...prevState,
        number: paymentMethodError.message || "",
      }));
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "20px" }}>
        <label>Card Number</label>
        <div
          style={{
            padding: "10px",
            border: error.number ? "2px solid red" : "1px solid #ced4da",
            borderRadius: "4px",
          }}
        >
          <CardNumberElement
            options={ELEMENT_OPTIONS}
            onChange={(event) => handleChange(event, "number")}
          />
        </div>
        {error.number && <div style={{ color: "red" }}>{error.number}</div>}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Expiration Date</label>
        <div
          style={{
            padding: "10px",
            border: error.expiry ? "2px solid red" : "1px solid #ced4da",
            borderRadius: "4px",
          }}
        >
          <CardExpiryElement
            options={ELEMENT_OPTIONS}
            onChange={(event) => handleChange(event, "expiry")}
          />
        </div>
        {error.expiry && <div style={{ color: "red" }}>{error.expiry}</div>}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>CVC</label>
        <div
          style={{
            padding: "10px",
            border: error.cvc ? "2px solid red" : "1px solid #ced4da",
            borderRadius: "4px",
          }}
        >
          <CardCvcElement
            options={ELEMENT_OPTIONS}
            onChange={(event) => handleChange(event, "cvc")}
          />
        </div>
        {error.cvc && <div style={{ color: "red" }}>{error.cvc}</div>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;

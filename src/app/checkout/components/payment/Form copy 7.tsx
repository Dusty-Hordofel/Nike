// OK,champs de détection derreur avec focus . il manque juste les erreurs personnalisés
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

type CompleteState = {
  number: boolean;
  expiry: boolean;
  cvc: boolean;
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<ErrorState>({
    number: "",
    expiry: "",
    cvc: "",
  });

  const [complete, setComplete] = useState<CompleteState>({
    number: false,
    expiry: false,
    cvc: false,
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
    field: keyof ErrorState,
    completeField: keyof CompleteState
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

    setComplete((prevState) => ({
      ...prevState,
      [completeField]: event.complete,
    }));
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

  const isFormValid =
    complete.number &&
    complete.expiry &&
    complete.cvc &&
    !error.number &&
    !error.expiry &&
    !error.cvc;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex gap-x-4">
        <div style={{ marginBottom: "20px", width: "50%" }}>
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
              onChange={(event) => handleChange(event, "number", "number")}
            />
          </div>
          {error.number && <div style={{ color: "red" }}>{error.number}</div>}
        </div>

        <div style={{ marginBottom: "20px", width: "25%" }}>
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
              onChange={(event) => handleChange(event, "expiry", "expiry")}
            />
          </div>
          {error.expiry && <div style={{ color: "red" }}>{error.expiry}</div>}
        </div>

        <div style={{ marginBottom: "20px", width: "25%" }}>
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
              onChange={(event) => handleChange(event, "cvc", "cvc")}
            />
          </div>
          {error.cvc && <div style={{ color: "red" }}>{error.cvc}</div>}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`${isFormValid ? "bg-black-200" : "bg-gray-100 curso"}`}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;

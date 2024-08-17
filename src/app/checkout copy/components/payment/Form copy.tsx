// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
"use client";
import {
  CardElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, FormEvent } from "react";
import styles from "./styles.module.scss";

// import { StripeCardElementOptions } from "@stripe/react-stripe-js";

// const ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#32325d",
//       fontFamily: "Arial, sans-serif",
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#a0aec0",
//       },
//       padding: "10px",
//       border: "1px solid #ced4da",
//       borderRadius: "4px",
//     },
//     invalid: {
//       color: "#fa755a",
//       iconColor: "#fa755a",
//     },
//   },
// };

// const CARD_ELEMENT_OPTIONS = {
//   classes: {
//     base: "StripeElementBase",
//     complete: "StripeElementComplete",
//     empty: "StripeElementEmpty",
//     focus: "StripeElementFocus",
//     invalid: "StripeElementInvalid",
//     webkitAutofill: "StripeElementAutofill",
//   },
//   style: {
//     base: {
//       fontSize: "16px",
//       color: "#32325d",
//       "::placeholder": {
//         color: "#a0aec0",
//       },
//     },
//     invalid: {
//       color: "#91220b",
//       iconColor: "#931d06",
//     },
//   },
// };

// const CARD_OPTIONS = {
//   iconStyle: "solid" as "solid", // Explicitly type this as "solid"
//   style: {
//     base: {
//       fontSmoothing: "antialiased",
//     },
//     invalid: {
//       iconColor: "#fd010169",
//       color: "#fd010169",
//     },
//   },
// };

// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       fontSmoothing: "antialiased",
//     },
//     invalid: {
//       iconColor: "#fd010169",
//       color: "#fd010169",
//     },
//   },
// };

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

interface FormProps {
  total: number;
  order_id: string;
}

export default function Form({ total, order_id }: FormProps) {
  // const [error, setError] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();
  console.log("🚀 ~ Form ~ elements:FORM", elements);

  const [error, setError] = useState({ number: "", expiry: "", cvc: "" });
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     setError("Stripe has not loaded yet. Please try again later.");
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardElement);
  //   if (!cardElement) {
  //     setError("Card Element not found.");
  //     return;
  //   }

  //   const { error: stripeError, paymentMethod } =
  //     await stripe.createPaymentMethod({
  //       type: "card",
  //       card: cardElement,
  //     });

  //   if (stripeError) {
  //     setError(stripeError.message || "An unknown error occurred.");
  //     return;
  //   }

  //   if (paymentMethod) {
  //     try {
  //       const { id } = paymentMethod;
  //       const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
  //         amount: total,
  //         id,
  //       });

  //       if (res.data.success) {
  //         window.location.reload(); // You don't need to pass false here.
  //       } else {
  //         setError("Payment failed.");
  //       }
  //     } catch (err: any) {
  //       setError(err.response?.data?.message || "Payment failed.");
  //     }
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setError({
        number: !cardNumberElement ? "Card number is required." : "",
        expiry: !cardExpiryElement ? "Expiration date is required." : "",
        cvc: !cardCvcElement ? "CVC is required." : "",
      });
      setLoading(false);
      return;
    }

    const { error: cardNumberError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    const { error: cardExpiryError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardExpiryElement,
    });

    const { error: cardCvcError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardCvcElement,
    });

    setError({
      number: cardNumberError ? cardNumberError.message : "",
      expiry: cardExpiryError ? cardExpiryError.message : "",
      cvc: cardCvcError ? cardCvcError.message : "",
    });

    setLoading(false);
  };

  return (
    <div className={styles.stripe}>
      <form onSubmit={handleSubmit}>
        {/* <div
          style={{
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
          }}
        >
          <CardElement options={ELEMENT_OPTIONS} />
        </div> */}
        {/* <CardElement options={ELEMENT_OPTIONS} /> */}
        {/* <CardElement options={CARD_OPTIONS} /> */}
        <div className="ncss-col-sm-6 va-sm-b flex flex-col px-5 pt-5 pb-1 border border-black-200 rounded-lg ">
          {/* space-x-4 */}
          <h3 className="css-5oevkg mb-4">Ajouter une carte</h3>
          <div className="flex">
            {/* Conteneur pour le numéro de carte */}
            <div style={{ marginBottom: "20px" }} className="w-1/2">
              <label>Card Number</label>
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
              >
                <CardNumberElement options={ELEMENT_OPTIONS} />
              </div>
            </div>

            {/* Conteneur pour la date d'expiration */}
            <div style={{ marginBottom: "20px" }} className="w-1/4">
              <label>Expiration Date</label>
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
              >
                <CardExpiryElement options={ELEMENT_OPTIONS} />
              </div>
            </div>

            {/* Conteneur pour le CVC */}
            <div style={{ marginBottom: "20px" }} className="w-1/4">
              <label>CVC</label>
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
              >
                <CardCvcElement options={ELEMENT_OPTIONS} />
              </div>
            </div>
          </div>
        </div>
        <button type="submit">PAY</button>
        {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
  );
}

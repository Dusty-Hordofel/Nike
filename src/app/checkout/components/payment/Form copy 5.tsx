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
} from "@stripe/stripe-js";

type ErrorState = {
  number: string;
  expiry: string;
  cvc: string;
};

// Fonction pour traduire les messages d'erreur
const translateErrorMessage = (message: string): string => {
  const translations: { [key: string]: string } = {
    "Your card number is incomplete.": "Le numéro de carte est incomplet.",
    "Your card's expiration date is incomplete.":
      "La date d'expiration est incomplète.",
    "Your card's security code is incomplete.":
      "Le code de sécurité est incomplet.",
    "Your card number is invalid.": "Le numéro de carte est invalide.",
    "Your card's expiration date is invalid.":
      "La date d'expiration est invalide.",
    "Your card's security code is invalid.":
      "Le code de sécurité est invalide.",
    // Ajoutez d'autres traductions ici
  };

  return translations[message] || message;
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
        [field]: translateErrorMessage(event.error?.message || ""),
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        [field]: "",
      }));
    }
  };

  const handleBlur = (
    event:
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent,
    field: keyof ErrorState
  ) => {
    if (!event.complete) {
      let errorMessage = "";
      switch (field) {
        case "number":
          errorMessage = "Veuillez entrer un numéro de carte correct.";
          break;
        case "expiry":
          errorMessage = "Indique la date de validité.";
          break;
        case "cvc":
          errorMessage = "Indique le cryptogramme visuel.";
          break;
      }
      setError((prevState) => ({
        ...prevState,
        [field]: translateErrorMessage(event.error?.message || errorMessage),
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

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (paymentMethodError) {
      setError((prevState) => ({
        ...prevState,
        number: translateErrorMessage(paymentMethodError.message || ""),
      }));
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Conteneur pour le numéro de carte */}
      <div style={{ marginBottom: "20px" }}>
        <label>Numéro de Carte</label>
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
            onBlur={(event) =>
              handleBlur(event as StripeCardNumberElementChangeEvent, "number")
            }
          />
        </div>
        {error.number && <div style={{ color: "red" }}>{error.number}</div>}
      </div>

      {/* Conteneur pour la date d'expiration */}
      <div style={{ marginBottom: "20px" }}>
        <label>Date d'Expiration</label>
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
            onBlur={(event) =>
              handleBlur(event as StripeCardExpiryElementChangeEvent, "expiry")
            }
          />
        </div>
        {error.expiry && <div style={{ color: "red" }}>{error.expiry}</div>}
      </div>

      {/* Conteneur pour le CVC */}
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
            onBlur={(event) =>
              handleBlur(event as StripeCardCvcElementChangeEvent, "cvc")
            }
          />
        </div>
        {error.cvc && <div style={{ color: "red" }}>{error.cvc}</div>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Traitement en cours..." : "Payer"}
      </button>
    </form>
  );
};

export default CheckoutForm;

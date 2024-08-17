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
    "Votre numéro de carte est incomplet.":
      "Veuillez entrer un numéro de carte correct.",
    "Your card number is incomplete.": "Le numéro de carte est incomplet.",
    "Your card's expiration date is incomplete.":
      "La date d'expiration est incomplète.",
    "La date d'expiration de votre carte est incomplète.":
      "Indique la date de validité.",
    "Your card's security code is incomplete.":
      "Le code de sécurité est incomplet.",
    "Your card number is invalid.": "Le numéro de carte est invalide.",
    "Your card's expiration date is invalid.":
      "La date d'expiration est invalide.",
    "Le code de sécurité de votre carte est incomplet.":
      "Indique le cryptogramme visuel.",
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
  const [touched, setTouched] = useState<{
    number: boolean;
    expiry: boolean;
    cvc: boolean;
  }>({
    number: false,
    expiry: false,
    cvc: false,
  });

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
    // setTouched((prevState) => ({
    //   ...prevState,
    //   [field]: true,
    // }));

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

    // const cardElement = elements.getElement(CardNumberElement);
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setLoading(false);
      return;
    }

    // if (!cardElement) {
    //   setLoading(false);
    //   return;
    // }

    // const { error: paymentMethodError } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
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

  // Vérifier si tous les champs ont une erreur
  // const isNumberError = Boolean(error.number);
  // const isExpiryError = Boolean(error.expiry);
  // const isCvcError = Boolean(error.cvc);

  // Vérifier si tous les champs ont été touchés (si le champ a perdu le focus)
  const allFieldsTouched = touched.number && touched.expiry && touched.cvc;

  // Vérifier si tous les champs sont complets (ne contiennent pas d'erreur)
  // const areFieldsComplete = !isNumberError && !isExpiryError && !isCvcError;

  // Désactiver le bouton si les champs ont des erreurs, si un champ n'est pas touché ou si le formulaire est en cours de traitement
  const isButtonDisabled =
    /*!areFieldsComplete ||!allFieldsTouched ||*/ loading;

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

      <button type="submit" disabled={isButtonDisabled}>
        {loading ? "Traitement en cours..." : "Payer"}
      </button>
    </form>
  );
};

export default CheckoutForm;

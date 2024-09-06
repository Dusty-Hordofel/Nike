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
import { Button } from "@/components/ui/buttons/button/button";
import { usePaymentContext } from "@/context/checkout/payment-context";

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

const StripeForm: React.FC = () => {
  const {
    setComplete,
    setLoading,
    error,
    setError,
    isFormValid,
    hasCardFieldError,
    loading,
    handleSubmit,
  } = usePaymentContext();

  const stripe = useStripe();
  const elements = useElements();

  // const [error, setError] = useState<ErrorState>({
  //   number: "",
  //   expiry: "",
  //   cvc: "",
  // });

  // const [complete, setComplete] = useState<CompleteState>({
  //   number: false,
  //   expiry: false,
  //   cvc: false,
  // });

  // const [loading, setLoading] = useState(false);

  const CARD_OPTIONS = {
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
      let customErrorMessage = event.error.message;

      // Personnalisation des messages d'erreur
      if (event.error.code === "incomplete_number") {
        customErrorMessage = "Veuillez entrer un numéro de carte correct.";
      } else if (event.error.code === "incomplete_expiry") {
        customErrorMessage = "Indique la date de validité.";
      } else if (event.error.code === "incomplete_cvc") {
        customErrorMessage = "Indique le cryptogramme visuel.";
      }

      setError((prevState) => ({
        ...prevState,
        [field]: customErrorMessage || "",
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

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (!stripe || !elements) {
  //     setLoading(false);
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardNumberElement);
  //   console.log("🚀 ~ handleSubmit ~ cardElement:", cardElement);

  //   if (!cardElement) {
  //     setLoading(false);
  //     return;
  //   }

  //   const { error: paymentMethodError }: PaymentMethodResult =
  //     await stripe.createPaymentMethod({
  //       type: "card",
  //       card: cardElement,
  //     });

  //   if (paymentMethodError) {
  //     setError((prevState) => ({
  //       ...prevState,
  //       number: paymentMethodError.message || "",
  //     }));
  //     setLoading(false);
  //     return;
  //   }

  //   setLoading(false);
  // };

  // const isFormValid =
  //   complete.number &&
  //   complete.expiry &&
  //   complete.cvc &&
  //   !error.number &&
  //   !error.expiry &&
  //   !error.cvc;

  return (
    <>
      <form className="flex flex-col">
        <div className="flex">
          <div
            style={{ marginBottom: "20px", width: "50%" }}
            className="px-2 pt-2 mb-4"
          >
            <label>Card Number</label>
            <div
              style={{
                padding: "10px",
                border: error.number
                  ? "1px solid #d30005"
                  : "1px solid #ced4da",
                borderRadius: "4px",
              }}
            >
              <CardNumberElement
                options={CARD_OPTIONS}
                onChange={(event) => handleChange(event, "number", "number")}
              />
            </div>
            <div
              style={{ color: "#d30005", fontSize: "12px" }}
              className="pt-1 pl-[14px] h-5 bg-warning"
            >
              {error.number && error.number}
            </div>
          </div>

          <div
            style={{ marginBottom: "20px", width: "25%" }}
            className="px-2 pt-2 mb-4"
          >
            <label>Expiration Date</label>
            <div
              style={{
                padding: "10px",
                border: error.expiry
                  ? "1px solid #d30005"
                  : "1px solid #ced4da",
                borderRadius: "4px",
              }}
            >
              <CardExpiryElement
                options={CARD_OPTIONS}
                onChange={(event) => handleChange(event, "expiry", "expiry")}
              />
            </div>
            <div
              style={{ color: "#d30005", fontSize: "12px" }}
              className="pt-1 pl-[14px] h-[36px] bg-warning"
            >
              {error.expiry && error.expiry}
            </div>
          </div>

          <div
            style={{ marginBottom: "20px", width: "25%" }}
            className="px-2 pt-2 mb-4"
          >
            <label>CVC</label>
            <div
              style={{
                padding: "10px",
                border: error.cvc ? "1px solid #d30005" : "1px solid #ced4da",
                borderRadius: "4px",
              }}
            >
              <CardCvcElement
                options={CARD_OPTIONS}
                onChange={(event) => handleChange(event, "cvc", "cvc")}
              />
            </div>

            <div
              style={{ color: "#d30005", fontSize: "12px" }}
              className="pt-1 pl-[14px] h-[52px] bg-warning"
            >
              {error.cvc && error.cvc}
            </div>
          </div>
        </div>
      </form>
      {/* <div
        onClick={handleSubmit}
        className="mt-6 bg-warning flex justify-end pb-5 px-5"
      >
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`${isFormValid ? "bg-black-200 text-white" : "bg-gray-300 text-black-200/30"} w-max py-3 px-6 rounded-full font-medium`}
          // onClick={() => {
          //   setActiveSection("summary")
          // }}
        >
          {loading
            ? "Processing..."
            : "Continuer pour voir le récapitulatif de la commande"}
        </button>
      </div> */}
    </>
  );
};

export default StripeForm;

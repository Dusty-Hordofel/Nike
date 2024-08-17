"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
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

interface PaymentContextProps {
  complete: CompleteState;
  setComplete: Dispatch<SetStateAction<CompleteState>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: ErrorState;
  setError: Dispatch<SetStateAction<ErrorState>>;
  hasCardFieldError: boolean;
  //   handleChange: (
  //     event:
  //       | StripeCardNumberElementChangeEvent
  //       | StripeCardExpiryElementChangeEvent
  //       | StripeCardCvcElementChangeEvent,
  //     field: keyof ErrorState,
  //     completeField: keyof CompleteState
  //   ) => void;
  handleSubmit: (event: React.FormEvent) => void;
  isFormValid: boolean;
}

const PaymentContext = createContext<PaymentContextProps | undefined>(
  undefined
);
export const PaymentProvider = ({ children }: { children: ReactNode }) => {
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

  //   const handleChange = (
  //     event:
  //       | StripeCardNumberElementChangeEvent
  //       | StripeCardExpiryElementChangeEvent
  //       | StripeCardCvcElementChangeEvent,
  //     field: keyof ErrorState,
  //     completeField: keyof CompleteState
  //   ) => {
  //     if (event.error) {
  //       let customErrorMessage = event.error.message;

  //       // Personnalisation des messages d'erreur
  //       if (event.error.code === "incomplete_number") {
  //         customErrorMessage = "Veuillez entrer un numéro de carte correct.";
  //       } else if (event.error.code === "incomplete_expiry") {
  //         customErrorMessage = "Indique la date de validité.";
  //       } else if (event.error.code === "incomplete_cvc") {
  //         customErrorMessage = "Indique le cryptogramme visuel.";
  //       }

  //       setError((prevState) => ({
  //         ...prevState,
  //         [field]: customErrorMessage || "",
  //       }));
  //     } else {
  //       setError((prevState) => ({
  //         ...prevState,
  //         [field]: "",
  //       }));
  //     }

  //     setComplete((prevState) => ({
  //       ...prevState,
  //       [completeField]: event.complete,
  //     }));
  //   };

  //   const handleSubmit = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     setLoading(true);

  //     if (!stripe || !elements) {
  //       setLoading(false);
  //       return;
  //     }

  //     const cardElement = elements.getElement(CardNumberElement);

  //     if (!cardElement) {
  //       setLoading(false);
  //       return;
  //     }

  //     const { error: paymentMethodError }: PaymentMethodResult =
  //       await stripe.createPaymentMethod({
  //         type: "card",
  //         card: cardElement,
  //       });

  //     if (paymentMethodError) {
  //       setError((prevState) => ({
  //         ...prevState,
  //         number: paymentMethodError.message || "",
  //       }));
  //       setLoading(false);
  //       return;
  //     }

  //     setLoading(false);
  //   };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // setActiveSection("summary")

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    console.log("🚀 ~ handleSubmit ~ cardElement:", cardElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    const { error: paymentMethodError, paymentMethod }: PaymentMethodResult =
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

    // if (!paymentMethodError) {
    try {
      const { id } = paymentMethod;
      console.log("🚀 ~ handleSubmit ~ id:", id);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/1234555/pay-with-stripe`,
        {
          method: "POST",
          body: JSON.stringify({
            id,
            amount: 1000,
          }),
        }
      );

      const data = await response.json();

      console.log("🚀 ~ handleSubmit ~ response:DATA", data);
    } catch (error: any) {
      console.log("🚀 ~ handleSubmit ~ error:", error.message);
      // setError((prevState) => ({
      //   ...prevState,
      //   number: error.message || "",
      // }));
      setLoading(false);
    }

    // return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/lookup`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email,
    //     }),
    //   });

    setLoading(false);
  };

  const isFormValid =
    complete.number &&
    complete.expiry &&
    complete.cvc &&
    !error.number &&
    !error.expiry &&
    !error.cvc;

  const hasCardFieldError = !!error.number || !!error.expiry || !!error.cvc;
  console.log("🚀 ~ PaymentProvider ~ hasCardFieldError:", hasCardFieldError);
  console.log(!!error.number);
  return (
    <PaymentContext.Provider
      value={{
        complete,
        setComplete,
        loading,
        setLoading,
        error,
        setError,
        hasCardFieldError,
        handleSubmit,
        // handleChange,
        // handleSubmit,
        isFormValid,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error(
      "throw new Error('usePaymentContext must be used within a PaymentProvider');"
    );

  return context;
};

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
import { useAddPaymentMethod } from "@/hooks/user/payment-section";
// import { useAddPaymentMethod } from "@/hooks/api/payment-section/use-add-payment-method";

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
  paymentStep: number | null;
  setPaymentStep: Dispatch<SetStateAction<number | null>>;
  handleSubmit: (event: React.FormEvent) => void;
  isFormValid: boolean;
}

export const PaymentContext = createContext<PaymentContextProps | null>(null);
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
  const [paymentStep, setPaymentStep] = useState<null | number>(null);
  console.log("🚀 ~ PaymentProvider ~ paymentStep:PAYMENT STEP", paymentStep);

  // const { mutate: addPaymentMethod, isLoading, isError, isSuccess, error } = useAddPaymentMethod();
  const addPaymentMethod = useAddPaymentMethod();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    // console.log("🚀 ~ handleSubmit ~ cardElement:", cardElement);

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
    // console.log(
    //   "🚀 ~ handleSubmit ~ paymentMethod:METHOD ID",
    //   paymentMethod.id
    // );

    const change = await addPaymentMethod.mutateAsync(paymentMethod.id);
    if (change?.success) alert(change.message);
    // console.log("🚀 ~ handleSubmit ~ change:ID", change);
    setLoading(false);
    setPaymentStep(3);
  };

  const isFormValid =
    complete.number &&
    complete.expiry &&
    complete.cvc &&
    !error.number &&
    !error.expiry &&
    !error.cvc;

  const hasCardFieldError = !!error.number || !!error.expiry || !!error.cvc;
  // console.log("🚀 ~ PaymentProvider ~ hasCardFieldError:", hasCardFieldError);
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
        isFormValid,
        paymentStep,
        setPaymentStep,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

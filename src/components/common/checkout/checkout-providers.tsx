"use client";

import React, { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { PaymentProvider } from "@/context/checkout/payment.context";
import { DeliveryProvider } from "@/context/checkout/delivery.context";

type CheckoutProvidersProps = {
  children: ReactNode;
};

const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const CheckoutProviders = ({ children }: CheckoutProvidersProps) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentProvider>
        <DeliveryProvider>{children}</DeliveryProvider>
      </PaymentProvider>
    </Elements>
  );
};

export default CheckoutProviders;

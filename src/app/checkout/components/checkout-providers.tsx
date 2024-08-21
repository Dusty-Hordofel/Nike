"use client";

import React, { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { PaymentProvider } from "@/context/PaymentContext";
import { DeliveryProvider } from "@/context/DeliveryContext";

type CheckoutProvidersProps = {
  children: ReactNode;
  //   deliveryAddress: any; // Typiquement, tu devrais remplacer `any` par le type approprié pour l'adresse de livraison.
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

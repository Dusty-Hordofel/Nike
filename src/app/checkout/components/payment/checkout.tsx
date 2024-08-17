"use client";
import React from "react";
import { currentUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/user-cart.actions";
import { Suspense } from "react";
import { getUserActiveAdress } from "@/actions/user-address.actions";
// import DeliverySection from "./components/delivery/delivery-section";
// import OrderSummary from "./components/order/order-summary";
// import PaymentSection from "./components/payment/payment-section";
// import SummarySection from "./components/summary/summary-section";
// import { DeliveryProvider } from "@/context/DeliveryContext";
// import Loader from "./loader";
import CheckoutHeader from "@/app/checkout/components/checkout-section-title";
import { PaymentProvider } from "@/context/PaymentContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DeliveryProvider } from "@/context/DeliveryContext";
import DeliverySection2 from "../delivery/delivery-section";
import PaymentSection from "./payment-section";
import SummarySection from "../summary/summary-section";
import OrderSummary from "../order/order-summary";

type Props = {};

const Checkout = ({ deliveryAddress }: any) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );
  console.log(
    "🚀 ~ Checkout ~ ENV:",
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  );
  return (
    <Elements stripe={stripePromise}>
      <PaymentProvider>
        <DeliveryProvider deliveryAddress={deliveryAddress}>
          <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
            <div className="flex">
              <main className="w-2/3 bg-success px-[6px]">
                <DeliverySection2 />
                <PaymentSection />
                <SummarySection />
              </main>
              <aside className="w-1/3 px-[6px]">
                <OrderSummary />
              </aside>
            </div>
          </div>
        </DeliveryProvider>
      </PaymentProvider>
    </Elements>
  );
};

export default Checkout;

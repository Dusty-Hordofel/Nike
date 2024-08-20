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
import PaymentSection from "./stripe-payment/payment-section";
import SummarySection from "../summary/summary-section";
import OrderSummary from "../order/order-summary";
import { useActiveDeliveryAddress } from "@/hooks/api/delivery-section";
import { useGetCart } from "@/hooks/api/use-get-cart";

type Props = {};

const Checkout = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );
  console.log(
    "🚀 ~ Checkout ~ ENV:",
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  );

  const deliveryAddress = useActiveDeliveryAddress();
  // const {
  //   isLoading: isCartLoading,
  //   isError: hasCartError,
  //   data: cartData,
  // }

  const cart = useGetCart();

  if (deliveryAddress.isLoading || cart.isLoading) return <div>Loading...</div>;
  if (deliveryAddress.isError || cart.isError)
    return <div>Error: {deliveryAddress.error?.message}</div>;

  return (
    <Elements stripe={stripePromise}>
      <PaymentProvider>
        <DeliveryProvider deliveryAddress={deliveryAddress}>
          <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
            <div className="flex">
              <main className="w-2/3 bg-success px-[6px]">
                <DeliverySection2 deliveryAddress={deliveryAddress} />
                <PaymentSection deliveryAddress={deliveryAddress} cart={cart} />
                <SummarySection />
              </main>
              <aside className="w-1/3 px-[6px]">
                <OrderSummary
                  deliveryAddress={deliveryAddress}
                  cart={cart}
                  // isCartLoading={isCartLoading}
                  // hasCartError={hasCartError}
                  // cartData={cartData}
                />
              </aside>
            </div>
          </div>
        </DeliveryProvider>
      </PaymentProvider>
    </Elements>
  );
};

export default Checkout;

import { currentUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/user-cart.actions";
import { Suspense } from "react";
import { getUserActiveAdress } from "@/actions/user-address.actions";
import DeliverySection from "./components/delivery/delivery-section";
import OrderSummary from "./components/order/order-summary";
import PaymentSection from "./components/payment/payment-section";
import SummarySection from "./components/summary/summary-section";
import { DeliveryProvider } from "@/context/DeliveryContext";
import Loader from "./loader";
import CheckoutHeader from "@/components/checkout/checkout-header";
import { PaymentProvider } from "@/context/PaymentContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = async () => {
  const user = await currentUser();
  const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY as string);
  console.log("🚀 ~ CheckoutPage ~ user:", user);
  if (!user) redirect("/cart"); //metre le bon endroit
  console.log("🚀 ~ CheckoutPage ~ user:", user);

  const cart = await getCart();
  // console.log("🚀 ~ CheckoutPage ~ cart:", cart);
  if (!cart) redirect("/");

  // const addresses = await getUserAddresses();
  const deliveryAddress = await getUserActiveAdress();
  // console.log("🚀 ~ CheckoutPage ~ activeAddresses:PAGE", deliveryAddress);
  return (
    <Elements stripe={stripePromise}>
      <PaymentProvider>
        <DeliveryProvider deliveryAddress={deliveryAddress}>
          <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
            <div className="flex">
              <main className="w-2/3 bg-success px-[6px]">
                <DeliverySection />
                {/* <Suspense
              fallback={
                <div>
                  <span className="sr-only">
                    Options de livraison Étape 2 sur 3 Étape terminée
                  </span>
                  <CheckoutHeader title="Options de livraison" />

                  <div className="h-[184px] bg-green-100 w-full flex justify-center items-center">
                    <Loader />
                  </div>
                </div>
              }
            > */}
                <PaymentSection />
                {/* <PaymentSection deliveryAddress={deliveryAddress} /> */}
                {/* </Suspense> */}
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
export default CheckoutPage;

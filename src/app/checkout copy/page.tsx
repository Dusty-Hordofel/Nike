"use server";
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
import Checkout from "./components/payment/checkout";
import { useGetCart } from "@/hooks/api/use-get-cart";

const CheckoutPage = async () => {
  const user = await currentUser();

  // console.log("🚀 ~ CheckoutPage ~ user:", user);
  if (!user) redirect("/cart"); //metre le bon endroit
  // console.log("🚀 ~ CheckoutPage ~ user:", user);

  const cart = await getCart();
  // console.log("🚀 ~ CheckoutPage ~ cart:", cart);
  if (!cart) redirect("/");

  // const addresses = await getUserAddresses();
  const deliveryAddress = await getUserActiveAdress();
  // console.log("🚀 ~ CheckoutPage ~ activeAddresses:PAGE", deliveryAddress);

  console.log("STRIPE", "MOO", process.env.STRIPE_SECRET_KEY!);
  console.log("STRIPE", "MOO", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  return <Checkout deliveryAddress={deliveryAddress} />;
};
export default CheckoutPage;

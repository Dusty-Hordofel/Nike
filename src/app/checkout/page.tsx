import { currentUser } from "@/utils/auth";
import DeliveryInfo from "./DeliveryInfo";
import Cart from "@/models/Cart";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/user-cart.actions";
import { Suspense } from "react";
import {
  getUserActiveAdress,
  getUserAddresses,
} from "@/actions/user-address.actions";
import Payment from "@/components/Checkout/payment/Payment";
import CheckoutHeader from "@/components/Checkout/checkout-header";
import Test from "./Test";

const CheckoutPage = async () => {
  const user = await currentUser();
  console.log("🚀 ~ CheckoutPage ~ user:", user);
  if (!user) redirect("/cart"); //metre le bon endroit
  console.log("🚀 ~ CheckoutPage ~ user:", user);
  const cart = await getCart();
  // console.log("🚀 ~ CheckoutPage ~ cart:", cart);
  if (!cart) redirect("/");

  // const addresses = await getUserAddresses();
  const shippingAddress = await getUserActiveAdress();
  console.log("🚀 ~ CheckoutPage ~ activeAddresses:", shippingAddress);
  // if (!addresses) return;
  // console.log("🚀 ~ CheckoutPage ~ addresses:", addresses);
  {
    /* sr-only */
  }
  return (
    <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
      <Suspense fallback={<p>Loading.....</p>}>
        <DeliveryInfo shippingAddress={shippingAddress} />
      </Suspense>
      {/* <Suspense fallback={<p>MEKA.....</p>}>
        <Test addresses={addresses} />
      </Suspense> */}
    </div>
  );
};

export default CheckoutPage;

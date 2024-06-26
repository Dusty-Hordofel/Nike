import { currentUser } from "@/utils/auth";
import DeliveryInfo from "./components/delivery-section";
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
import DeliverySection from "./components/delivery-section";
import OrderSummary from "./components/order-summary";

const CheckoutPage = async () => {
  const user = await currentUser();
  console.log("🚀 ~ CheckoutPage ~ user:", user);
  if (!user) redirect("/cart"); //metre le bon endroit
  console.log("🚀 ~ CheckoutPage ~ user:", user);
  const cart = await getCart();
  // console.log("🚀 ~ CheckoutPage ~ cart:", cart);
  if (!cart) redirect("/");

  // const addresses = await getUserAddresses();
  const deliveryAddress = await getUserActiveAdress();
  console.log("🚀 ~ CheckoutPage ~ activeAddresses:PAGE", deliveryAddress);

  return (
    <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
      <div className="flex">
        <main className="w-2/3 bg-success px-[6px]">
          <Suspense fallback={<p>Loading.....</p>}>
            <DeliverySection deliveryAddress={deliveryAddress} />
          </Suspense>
        </main>
        <aside className="w-1/3 px-[6px]">
          <OrderSummary />
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;

import { currentUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/user-cart.actions";
import { Suspense } from "react";
import { getUserActiveAdress } from "@/actions/user-address.actions";
import DeliverySection from "./components/delivery/delivery-section";
import OrderSummary from "./components/order/order-summary";
import PaymentSection from "./components/payment/payment-section";
import SummarySection from "./components/summary/summary-section";

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
          <Suspense>
            <PaymentSection deliveryAddress={deliveryAddress} />
          </Suspense>
          <Suspense>
            <SummarySection />
          </Suspense>
        </main>
        <aside className="w-1/3 px-[6px]">
          <Suspense fallback={<p>Loading.....</p>}>
            <OrderSummary cart={cart} />
          </Suspense>
        </aside>
      </div>
    </div>
  );
};
export default CheckoutPage;

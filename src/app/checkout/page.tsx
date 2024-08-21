"use client";

import { useActiveDeliveryAddress } from "@/hooks/api/delivery-section";
import { useGetCart } from "@/hooks/api/use-get-cart";
import { DeliverySection2 } from "./components/delivery";
import PaymentSection from "./components/payment/stripe-payment/payment-section";
import OrderSection from "./components/order/order-section";
import OrderSummary from "./components/order/order-summary";

type Props = {};

const CheckoutPage = () => {
  // const user = await currentUser();

  // console.log("🚀 ~ CheckoutPage ~ user:", user);
  // if (!user) redirect("/cart"); //metre le bon endroit
  // console.log("🚀 ~ CheckoutPage ~ user:", user);

  const deliveryAddress = useActiveDeliveryAddress();
  const cart = useGetCart();

  if (deliveryAddress.isLoading || cart.isLoading) return <div>Loading...</div>;
  if (deliveryAddress.isError || cart.isError)
    return <div>Error: {deliveryAddress.error?.message}</div>;

  return (
    <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
      <div className="flex">
        <main className="w-2/3 bg-success px-[6px]">
          <DeliverySection2 deliveryAddress={deliveryAddress} />
          <PaymentSection deliveryAddress={deliveryAddress} cart={cart} />
          <OrderSection deliveryAddress={deliveryAddress} cart={cart} />
        </main>
        <aside className="w-1/3 px-[6px]">
          <OrderSummary deliveryAddress={deliveryAddress} cart={cart} />
        </aside>
      </div>
    </div>
  );
};
export default CheckoutPage;

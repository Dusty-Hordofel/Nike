"use client";

import { useActiveDeliveryAddress } from "@/hooks/api/delivery-section";
import { useGetCart } from "@/hooks/api/use-get-cart";
import { DeliverySection2 } from "./components/delivery";
import PaymentSection from "./components/payment/stripe-payment/payment-section";
import OrderSection from "./components/order/order-section";
import OrderSummary from "./components/order/order-summary";
import Loader from "./components/loader";

type Props = {};

const CheckoutPage = () => {
  // const user = await currentUser();

  const deliveryAddress = useActiveDeliveryAddress();
  const cart = useGetCart();

  if (deliveryAddress.isLoading || cart.isLoading)
    return (
      <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );

  if (deliveryAddress.isError || cart.isError)
    return (
      <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {deliveryAddress.error?.message}</h1>
        </div>
      </div>
    );

  return (
    <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
      <div className="flex">
        <main className="w-full lg:w-2/3 bg-success px-[6px]">
          <DeliverySection2 deliveryAddress={deliveryAddress} />
          <PaymentSection deliveryAddress={deliveryAddress} cart={cart} />
          <OrderSection deliveryAddress={deliveryAddress} cart={cart} />
        </main>
        <aside className="w-0 lg:w-1/3 px-[6px] lg:block hidden">
          <OrderSummary deliveryAddress={deliveryAddress} cart={cart} />
        </aside>
      </div>
    </div>
  );
};
export default CheckoutPage;

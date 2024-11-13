"use client";

import { useActiveDeliveryAddress } from "@/hooks/user/delivery-section";
import { useState } from "react";
import { useDeliveryContext } from "@/hooks/user/checkout/use-delivery-context";
import { OrderSection, OrderSummary } from "@/components/common/checkout/order";
import { PaymentSection } from "@/components/common/checkout/payment/stripe-payment";
import { DeliverySection } from "@/components/common/checkout/delivery";
import Loader from "@/components/ui/loader";
import { useGetCart } from "@/hooks/user/cart";

const CheckoutPage = () => {
  const { deliveryStep } = useDeliveryContext();

  const deliveryAddress = useActiveDeliveryAddress();
  console.log("🚀 ~ CheckoutPage ~ deliveryAddress:", deliveryAddress);
  const cart = useGetCart();
  console.log("🚀 ~ CheckoutPage ~ cart:", cart);

  const [currentCheckoutSection, setCurrentCheckoutSection] = useState<
    "address" | "payment" | "summary"
  >(deliveryStep === 3 ? "payment" : "address");

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
          <div className="flex justify-center items-center flex-col p-9">
            <h1 className="text-2xl">Paiement</h1>
            <p className="space-x-2 text-gray-900 block lg:hidden">
              <span className="totalQuantity mr2-sm va-sm-m">
                {cart?.data?.cart?.products?.length} article
                {cart?.data?.cart?.products?.length > 2 && "s"}
              </span>
              <span className="priceTotal va-sm-m">
                {cart?.data?.cart?.cartTotal}&nbsp;€
              </span>
            </p>
          </div>
          <DeliverySection
            deliveryAddress={deliveryAddress}
            setCurrentCheckoutSection={setCurrentCheckoutSection}
          />
          <PaymentSection
            deliveryAddress={deliveryAddress}
            cart={cart}
            currentCheckoutSection={currentCheckoutSection}
          />
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

"use client";
import CheckoutHeader from "@/app/checkout/components/checkout-section-title";
import { Button } from "@/components/ui/buttons/button/button";
import { useDeliveryContext } from "@/context/DeliveryContext";
import LegalNotice from "../payment/legal-notice";
import OrderSummary from "./order-summary";
import { useState } from "react";
import { redirect } from "next/navigation";
import useCreateOrderAndPayment from "@/hooks/api/order-section/use-create-order-and-payment";

const OrderSection = ({ cart, deliveryAddress }: any) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  // const [order, setOrder] = useState<any>();

  console.log(
    "🚀 ~ OrderSection ~ cart:PRODUCTS FOR BACKEND",
    cart?.data?.cart.cartTotal
  );

  // const createOrderAndPayment = useCreateOrderAndPayment({ setPaymentStatus });

  // const handleCreateOrderAndPayment = async () => {
  //   await createOrderAndPayment.mutateAsync({
  //     products: cart.data.cart.products,
  //     shippingAddress: deliveryAddress.activeDeliveryAddress.activeAddress,
  //     paymentMethod: "credit card",
  //     total: cart.data.cart.cartTotal, //a modifier
  //     totalBeforeDiscount: cart.data.cart.cartTotal,
  //     couponApplied: "LOUBARO",
  //   });
  // };

  const handleCreateOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/pay-with-stripe`,
        {
          method: "POST",
          body: JSON.stringify({
            // products: cart.data.products,
            products: cart.data.cart.products,
            shippingAddress:
              deliveryAddress.activeDeliveryAddress.activeAddress,
            paymentMethod: "credit card",
            total: cart.data.cart.cartTotal, //a modifier
            totalBeforeDiscount: cart.data.cart.cartTotal,
            couponApplied: "LOUBAR",
          }),
        }
      );

      if (!response.ok) throw new Error("Order not created");

      const result = await response.json();
      console.log("🚀 ~ handleCreateOrder ~ result:", result);

      // if (result.sucess) {
      //   setPaymentStatus("success");
      //   console.log("Payment succeeded!");
      //   redirect("/");
      // } else {
      //   setPaymentStatus("failed");
      //   console.log("Payment failed. Please try again.");
      // }
      // console.log("🚀 ~ handleCreateOrder ~ result:", result);
    } catch (error) {
      setPaymentStatus("failed");
      // toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <section className="order-summary">
        <span className="sr-only">Paiement Étape 3 sur 3 Étape en cours</span>
        <CheckoutHeader
          title="Récapitulatif de la commande"
          // showEditLink
          // onChangeStep={setDeliveryStep}
        />
        <div className="hidden lg:block">
          <LegalNotice />
        </div>
        <div className="block lg:hidden">
          <OrderSummary cart={cart} />
        </div>
      </section>

      <section id="place-order" className="px-2 py-6">
        <div className="flex justify-end">
          <div className="hidden md:block md:w-[1500px] h-full "></div>
          <Button
            className="w-full"
            type="button"
            fullWidth
            // disabled={cart?.data?.cart?.products.length > 0}
            // onClick={handleCreateOrderAndPayment}
            onClick={handleCreateOrder}
          >
            Soumettre le paiement<span className="ripple"></span>
          </Button>
        </div>
      </section>
    </>
  );
};

export default OrderSection;

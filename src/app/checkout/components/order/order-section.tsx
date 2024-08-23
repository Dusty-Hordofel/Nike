"use client";
import CheckoutHeader from "@/app/checkout/components/checkout-section-title";
import { Button } from "@/components/ui/buttons/button/button";
import LegalNotice from "../payment/legal-notice";
import OrderSummary from "./order-summary";
import { useModal } from "@/hooks/modal/use-modal-provider";
import ResultModal from "../../result-modal";
import { redirect } from "next/navigation";

const OrderSection = ({ cart, deliveryAddress }: any) => {
  const { showModal, closeModal } = useModal();

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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      displayResultModal(result.success, result.message);
    } catch (error: any) {
      displayResultModal(
        false,
        `An unexpected error occurred: ${error.message}`
      );
    }
  };

  const displayResultModal = (success: boolean, message: string) => {
    showModal(
      <ResultModal
        title={success ? "Success" : "Error"}
        content={message}
        closeModal={closeModal}
        onConfirm
        // onConfirm={success ? () => (window.location.href = "/") : undefined}
      />
    );
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

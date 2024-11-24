"use client";
import CheckoutHeader from "@/components/common/checkout/checkout-section-title";
import { Button } from "@/components/ui/buttons/button/button";
import LegalNotice from "../payment/legal-notice";
import OrderSummary from "./order-summary";
import Modal from "@/components/ui/modals/modal";
import { useModal } from "@/context/modal/modal.context";
import { useCart } from "@/context/cart/cart.context";
import { deleteCart } from "@/actions/cart/user-cart.actions";
import { useRouter } from "next/navigation";

const OrderSection = ({ cart, deliveryAddress }: any) => {
  const {
    showResultModal,
    closeResultModal,
    resultModalContent,
    setResultModalContent,
    isResultModalOpen,
  } = useModal();

  const { dispatch } = useCart();
  const router = useRouter();

  const handleCreateOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/pay-with-stripe`,
        {
          method: "POST",
          body: JSON.stringify({
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

      setResultModalContent({ success: true, message: result.message });
      showResultModal();
    } catch (error: any) {
      setResultModalContent({
        success: false,
        message: `An error occurred: ${error.message}`,
      });
    }
  };

  const clearCart = async () => {
    dispatch({
      type: "CLEAR_CART",
    });
    await deleteCart();
    router.push("/");
  };

  return (
    <>
      <section className="order-summary">
        <span className="sr-only">Paiement Étape 3 sur 3 Étape en cours</span>
        <CheckoutHeader title="Récapitulatif de la commande" />
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
            onClick={handleCreateOrder}
          >
            Soumettre le paiement<span className="ripple"></span>
          </Button>
        </div>
      </section>

      {isResultModalOpen && resultModalContent && (
        <Modal
          title={resultModalContent.success ? "Success" : "Error"}
          onCloseModal={
            resultModalContent.success ? clearCart : closeResultModal
          }
        >
          <p className="mb-4">{resultModalContent.message}</p>
        </Modal>
      )}
    </>
  );
};

export default OrderSection;

"use client";
import CheckoutHeader from "@/app/checkout/components/checkout-section-title";
import { Button } from "@/components/ui/buttons/button/button";
import { useDeliveryContext } from "@/context/DeliveryContext";
import LegalNotice from "../payment/legal-notice";
import OrderSummary from "./order-summary";

const OrderSection = ({ cart, deliveryAddress }: any) => {
  const { deliveryStep, setDeliveryStep } = useDeliveryContext();

  return (
    <>
      <section className="order-summary">
        <span className="sr-only">Paiement Étape 3 sur 3 Étape en cours</span>
        <CheckoutHeader
          title="Récapitulatif de la commande"
          // showEditLink
          // onChangeStep={setDeliveryStep}
        />
        <LegalNotice />
        <OrderSummary cart={cart} />
      </section>

      <section id="place-order" className="px-2 py-6">
        <div
          className="ncss-col-sm-12 pt6-sm pb6-sm prl2-sm css-k8kbo5"
          data-attr="test-mobile-button"
        >
          <Button
            className="nds-btn css-b4ij8a ex41m6f0 btn-primary-dark  btn-md"
            type="button"
            fullWidth
          >
            Soumettre le paiement<span className="ripple"></span>
          </Button>
        </div>
      </section>
    </>
  );
};

export default OrderSection;

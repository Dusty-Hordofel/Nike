"use client";
import CheckoutHeader from "@/app/checkout/components/checkout-section-title";
import { useDeliveryContext } from "@/context/delivery-context";
import React from "react";

const OrderSummarySkeleton = () => {
  const { deliveryStep, setDeliveryStep } = useDeliveryContext();
  return (
    <section className="order-summary">
      <span className="sr-only">Paiement Étape 3 sur 3 Étape en cours</span>
      <CheckoutHeader
        title="Récapitulatif de la commande"
        // showEditLink
        // onDeliveryStep={setDeliveryStep}
      />
      <div>
        <div className="summary-section p-5">
          <div className="summary-item flex justify-between items-center">
            <div className="flex items-center">
              <span aria-label="subtotalText" className="bg-blue-100">
                Sous-total
              </span>
              <span id="subtotalTooltipWrapper" className="ml-2 top-1 relative">
                <button id="subtotalTooltip" aria-label="Détails du sous-total">
                  <div className="css-1ou3w6b">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 24 24"
                      role="img"
                      width="24px"
                      height="24px"
                      fill="none"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M12 20a8 8 0 100-16 8 8 0 000 16zm.75-4.5V17h-1.5v-1.5h1.5zM10.5 10c0-.918.831-1.644 1.764-1.472h.006c.6.106 1.096.603 1.201 1.202v.001a1.502 1.502 0 01-.82 1.63 2.411 2.411 0 00-1.401 2.189V14h1.5v-.45a.91.91 0 01.532-.828l.01-.005a3.002 3.002 0 001.657-3.248 3.008 3.008 0 00-2.416-2.417C10.647 6.706 9 8.179 9 10h1.5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
              </span>
            </div>
            <div className="subtotal-amount">0,00&nbsp;€</div>
          </div>

          <div className="summary-item flex justify-between items-center">
            <div className="shipping-label">Frais d'expédition estimés</div>
            <div className="shipping-amount">0,00&nbsp;€</div>
          </div>

          <div className="summary-item  flex justify-between items-center mt-2">
            <div className="total-label">
              <span>Total </span>
            </div>
            <div className="total-amount">0,00&nbsp;€</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSummarySkeleton;

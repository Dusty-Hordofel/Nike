"use client";

import { Button, buttonVariants } from "@/components/ui/buttons/button/button";
import { useAppSelector } from "@/hooks/use-redux-hooks";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Props for PromoCodeSection
type PromoCodeSectionProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Main component props
type CheckoutProps = {};

// Main Details component
const CartDetails: React.FC<CheckoutProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems, cartTotal, orderTotal, shipping } = useAppSelector(
    (state) => state.cart
  );

  return (
    <div className="px-2 mb-4 max-w-[404px] w-full">
      <aside data-testid="cart-summary" className="px-2 mb-6 bg-blue-400">
        <h2 className="mb-6 text-2xl font-medium">Récapitulatif</h2>
        <PromoCodeSection isOpen={isOpen} setIsOpen={setIsOpen} />
        <SummaryLine label="Sous-total" value={String(cartTotal)} />
        <SummaryLine
          label="Frais estimés de prise en charge et d'expédition"
          value={String(shipping)}
        />
        <SummaryLine
          label="Total"
          value={String(orderTotal.toFixed(2))}
          isTotal
        />
        <CheckoutButtons />
      </aside>
    </div>
  );
};

export default CartDetails;

// Subcomponent for promo code section
const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <details
      id="promo-codes"
      className="mb-2"
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <summary className="list-none cursor-pointer flex justify-between items-start font-medium">
        As-tu un code promo&nbsp;?
        <ChevronUp
          className={`${
            isOpen ? "rotate-180" : ""
          } cursor-pointer transition-transform duration-300`}
        />
      </summary>
      <div
        className={cn(
          "transition-max-height duration-500 ease-in-out overflow-hidden",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <form>
          <div className="flex my-1 pt-2">
            <input
              type="text"
              name="promotionCode"
              aria-label="Enter a Promo Code"
              className="py-2 border border-[#e4e4e4] px-4 rounded-lg"
            />
            <button
              disabled
              className="ml-2 px-6 py-2 border-[#e4e4e4] border rounded-full cursor-pointer"
              type="submit"
              data-testid="promo-code-apply-button"
            >
              Appliquer
            </button>
          </div>
        </form>
      </div>
    </details>
  );
};

// Props for SummaryLine
type SummaryLineProps = {
  label: string;
  value: string;
  isTotal?: boolean;
};

// Subcomponent for summary line
const SummaryLine: React.FC<SummaryLineProps> = ({
  label,
  value,
  isTotal = false,
}) => {
  return (
    <div
      className={`flex justify-between ${isTotal ? "py-4 my-3 border-t border-b border-[#E5E5E5]" : "mb-2"}`}
    >
      <span className="w-[387px] inline-block bg-success">{label} </span>
      <span>{value}</span>
    </div>
  );
};

// Subcomponent for checkout buttons
const CheckoutButtons: React.FC = () => {
  return (
    <div className="pt-5 flex flex-col space-y-3">
      <Link
        href="https://www.nike.com/fr/checkout/tunnel"
        tabIndex={-1}
        className={cn(
          buttonVariants({
            variant: "primary",
            size: "large",
            fullWidth: true,
          }),
          "font-medium"
        )}
      >
        Paiement
      </Link>
      <Link
        href="https://www.nike.com/fr/checkout/tunnel"
        className="py-[18px] px-6 mb-3 bg-[#f5f5f5] rounded-full border border-[#e4e4e4] font-medium min-h-[60px] flex justify-center items-center"
        aria-label="Checkout with PayPal"
        data-testid="paypal-checkout-button"
      >
        <Image
          alt="PayPal"
          width="51"
          height="14"
          src="https://www.nike.com/assets/experience/pet/payment-icons/paypal@2x.png"
        />
      </Link>
    </div>
  );
};

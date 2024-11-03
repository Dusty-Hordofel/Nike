"use client";

import {
  applyCouponCode,
  getCouponCode,
} from "@/actions/coupon/user-apply-coupon.action";
import { saveCartItems } from "@/actions/cart/user-cart.actions";
import { Button, buttonVariants } from "@/components/ui/buttons/button/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/use-redux-hooks";
import { cn } from "@/lib/utils";
import { applyCoupon } from "@/store/cartSlice";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

// Props for PromoCodeSection
type PromoCodeSectionProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setCouponCode: Dispatch<SetStateAction<string>>;
  onApplyCoupon: (e: any) => void;
  couponCode: string;
};

// Main component props
type CheckoutProps = {};

// Main Details component
const CartDetails: React.FC<CheckoutProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const { cartItems, cartTotal, orderTotal, shipping, appliedCoupon } =
    useAppSelector((state) => state.cart);
  // console.log("🚀 ~ cartItems:Details", cartItems);
  console.log("🚀 ~ cartItems:", cartItems);
  // console.log("🚀 ~ appliedCoupon: APP", appliedCoupon);
  // console.log("🚀 ~ couponCode:", couponCode);
  console.log("🚀 ~ coupon:", couponCode);

  const handleSaveCart = async () => {
    const saveCart = await saveCartItems(cartItems, appliedCoupon?.code);
    console.log("🚀 ~ saveCartHandler ~ saveCart:SAVE CART", saveCart);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    const couponCode = appliedCoupon?.code;
    if (couponCode) setCouponCode(couponCode);
  }, [couponCode]);

  // const couponCode =appliedCoupon?.code;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Appliquer le coupon avec la fonction onApplyCoupon
  //   applyCouponCode(couponCode); // Passer le code du coupon à la fonction parent
  // };

  const handleApplyCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("first", "COUPON ");
    const { success, message, coupon } = await getCouponCode("MOYKALR");
    console.log("🚀 ~ handleApplyCoupon ~ coupon:APPLYCOUPON", coupon?.coupon);

    if (success) {
      dispatch(
        applyCoupon({
          code: String(coupon?.coupon),
          discountPercentage: Number(coupon?.discount),
        })
      );
    } else {
      alert(message);
    }
  };

  return (
    <div className="px-2 mb-4 max-w-[404px] w-full">
      <aside data-testid="cart-summary" className="px-2 mb-6 bg-blue-400">
        <h2 className="mb-6 text-2xl font-medium">Récapitulatif</h2>
        {/* <div className="" onClick={handleApplyCoupon}>
          OL
        </div> */}
        <PromoCodeSection
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setCouponCode={setCouponCode}
          onApplyCoupon={handleApplyCoupon}
          couponCode={couponCode}
        />
        <SummaryLine label="Sous-total" value={String(cartTotal.toFixed(2))} />
        <SummaryLine
          label="Frais estimés de prise en charge et d'expédition"
          value={String(shipping)}
        />
        <SummaryLine
          label="Total"
          value={String(orderTotal.toFixed(2))}
          isTotal
        />
        <CheckoutButtons onSaveCart={handleSaveCart} />
      </aside>
    </div>
  );
};

export default CartDetails;

// Subcomponent for promo code section
const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  isOpen,
  setIsOpen,
  setCouponCode,
  onApplyCoupon,
  couponCode,
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
        <form onSubmit={onApplyCoupon}>
          <div className="flex my-1 pt-2">
            <input
              type="text"
              name="promotionCode"
              aria-label="Enter a Promo Code"
              value={couponCode}
              className="py-2 border border-[#e4e4e4] px-4 rounded-lg"
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <button
              disabled={false}
              className="ml-2 px-6 py-2 border-[#e4e4e4] border rounded-full cursor-pointer"
              type="submit"
              data-testid="promo-code-apply-button"
              // onClick={onApplyCoupon}
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
interface CheckoutButtonsProps {
  onSaveCart: () => Promise<void>;
}
const CheckoutButtons = ({ onSaveCart }: CheckoutButtonsProps) => {
  return (
    <div className="pt-5 flex flex-col space-y-3">
      {/* <Link
        href="/checkout"
        tabIndex={-1}
        className={cn(
          buttonVariants({
            variant: "primary",
            size: "large",
            fullWidth: true,
          }),
          "font-medium"
        )}
        
        onClick={() => saveCartHandler()}
      > */}
      <Link
        href="/checkout"
        className="cursor-pointer"
        onClick={() => onSaveCart()}
      >
        Paiement
      </Link>
      {/* </Link> */}
      <Link
        href="/checkout"
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

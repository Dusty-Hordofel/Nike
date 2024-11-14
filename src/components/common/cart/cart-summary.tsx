"use client";

import { getCouponCode } from "@/actions/coupon/user-apply-coupon.action";
import { saveCartItems } from "@/actions/cart/user-cart.actions";
import { Button, buttonVariants } from "@/components/ui/buttons/button/button";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CartAction, CartItem } from "@/context/cart/cart.reducer";

type PromoCodeSectionProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setCouponCode: Dispatch<SetStateAction<string>>;
  onApplyCoupon: (e: any) => void;
  couponCode: string;
  error: string;
};

type CartSummaryProps = {
  dispatch: Dispatch<CartAction>;
  totalQuantity: () => number;
  totalAmount: () => number;
  handleSaveCart: () => Promise<void>;
};

const CartSummary = ({
  shipping,
  taxAmount,
  orderTotal,
  cartItems,
  appliedCoupon,
  dispatch,
  handleSaveCart,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const couponCode = appliedCoupon?.couponCode;
    if (couponCode) setCouponCode(couponCode);
  }, [appliedCoupon?.couponCode]);

  const handleApplyCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    //verifier si le coupon  est déjà appliqué
    if (couponCode === appliedCoupon?.couponCode) {
      setError("Coupon is already applied");
      return;
    }

    const { success, message, coupon } = await getCouponCode(couponCode);
    console.log("🚀 ~ handleApplyCoupon ~ message:", message);

    if (success) {
      dispatch({
        type: "APPLY_COUPON",
        payload: {
          couponCode: String(coupon?.coupon),
          discountPercentage: Number(coupon?.discount),
        },
      });
    } else {
      // alert(message);
      setError(message as string);
    }
  };

  return (
    <aside
      data-testid="cart-summary"
      className="px-2 mb-6 min-[960px]:max-w-[404px] w-full "
    >
      <h2 className="mb-6 text-2xl font-medium">Récapitulatif</h2>

      <PromoCodeSection
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setCouponCode={setCouponCode}
        onApplyCoupon={handleApplyCoupon}
        couponCode={couponCode}
        error={error}
      />
      <SummaryLine
        label="Sous-total"
        value={
          orderTotal - shipping > 0
            ? String((orderTotal - shipping).toFixed(2))
            : "-"
        }
      />
      <SummaryLine
        label="Frais estimés de prise en charge et d'expédition"
        value={shipping > 0 ? String(shipping) : "Gratuit"}
      />
      <SummaryLine
        label="Total"
        value={orderTotal > 0 ? String(orderTotal.toFixed(2)) : "-"}
        isTotal
      />
      <CheckoutButtons cartItems={cartItems} onSaveCart={handleSaveCart} />
    </aside>
  );
};

export default CartSummary;

const PromoCodeSection = ({
  isOpen,
  setIsOpen,
  setCouponCode,
  onApplyCoupon,
  couponCode,
  error,
}: PromoCodeSectionProps) => {
  return (
    <details
      id="promo-codes"
      className="mb-2"
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <summary className="list-none cursor-pointer flex justify-between items-start font-medium">
        As-tu un code promo&nbsp;?
        <span className="opacity-50 text-gray-500">MOYKALR40</span>
        <ChevronUp
          className={`${
            isOpen ? "rotate-180" : ""
          } cursor-pointer transition-transform duration-300`}
        />
      </summary>
      {/* "transition-max-height duration-500 ease-in-out overflow-hidden " */}
      <div className={cn(isOpen ? "max-h-96" : "max-h-0")}>
        <form onSubmit={onApplyCoupon}>
          <div className="flex my-1 pt-2">
            <input
              type="text"
              name="promotionCode"
              aria-label="Enter a Promo Code"
              value={couponCode}
              className="py-2 border border-[#e4e4e4] px-4 rounded-lg w-full"
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <Button
              disabled={false}
              className="ml-2 px-6 py-2 border-[#e4e4e4] border rounded-full cursor-pointer"
              type="submit"
              data-testid="promo-code-apply-button"
              variant="outline"
            >
              Appliquer
            </Button>
          </div>
        </form>
        {error && <div className="text-red-600 text-xs">{error}</div>}
      </div>
    </details>
  );
};

type SummaryLineProps = {
  label: string;
  value: string;
  isTotal?: boolean;
};

const SummaryLine = ({ label, value, isTotal = false }: SummaryLineProps) => {
  return (
    <div
      className={`flex justify-between ${
        isTotal ? "py-4 my-3 border-t border-b border-[#E5E5E5]" : "mb-2"
      }`}
    >
      <div className=" inline-block">{label} </div>
      <span>{value}</span>
    </div>
  );
};

// Subcomponent for checkout buttons
interface CheckoutButtonsProps {
  onSaveCart: () => Promise<void>;
  cartItems: CartItem[];
}
const CheckoutButtons = ({ onSaveCart, cartItems }: CheckoutButtonsProps) => {
  return (
    <div className="pt-5 min-[960px]:flex flex-col space-y-3 hidden">
      {cartItems?.length > 0 ? (
        <Link
          href="/checkout"
          className={cn(
            buttonVariants({ variant: "primary", size: "large" }),
            "font-medium w-full"
          )}
          onClick={() => onSaveCart()}
        >
          Paiement
        </Link>
      ) : (
        <Button
          disabled
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "large",
              fullWidth: true,
            })
          )}
        >
          Paiement
        </Button>
      )}

      <Button
        // href="/checkout"
        // className="py-[18px] px-6 mb-3 bg-[#f5f5f5] rounded-full border border-[#e4e4e4] font-medium min-h-[60px] flex justify-center items-center"
        aria-label="Checkout with PayPal"
        data-testid="paypal-checkout-button"
        disabled
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "large",
            fullWidth: true,
          })
        )}
      >
        <Image
          alt="PayPal"
          width="51"
          height="14"
          src="https://www.nike.com/assets/experience/pet/payment-icons/paypal@2x.png"
        />
      </Button>
    </div>
  );
};

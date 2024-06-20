"use client";
import { Button, buttonVariants } from "@/components/ui/buttons/button/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Details = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-2 mb-4">
      <aside
        data-testid={cn(`cart-summary ${isOpen ? "" : ""}`)}
        className="px-2 mb-6 bg-blue-400"
      >
        <h2 className="mb-6 text-2xl font-medium">Récapitulatif</h2>
        <details id="promo-codes" className="mb-2">
          <summary>
            <span className="flex justify-between items-start font-medium">
              As-tu un code promo&nbsp;?
              <span onClick={() => setIsOpen(!isOpen)}>
                <ChevronUp
                  className={`${isOpen ? "rotate-180" : ""} cursor-pointer transition-transform duration-300`}
                />
              </span>
            </span>
          </summary>
          <div>
            <span>
              <form>
                <div className="flex my-1 pt-2">
                  <div>
                    <input
                      type="text"
                      name="promotionCode"
                      aria-invalid="false"
                      aria-required="false"
                      // autocomplete="off"
                      aria-label="Enter a Promo Code"
                      className="py-2 border border-[#e4e4e4] px-4 rounded-lg"
                      value=""
                    />
                  </div>
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
            </span>
          </div>
        </details>
        <div className="flex justify-between mb-2">
          Sous-total
          <div className="css-1wwm6t9 eskvfop2">
            <div role="presentation" className="css-bvtceq e12lmb420">
              <button
                tabIndex={0}
                aria-label="Subtotal details"
                aria-expanded="false"
                className="css-dw6iwb e12lmb421"
              ></button>
              <div aria-hidden="true" className="css-1afirad e12lmb422 sr-only">
                Le sous-total correspond au prix total de ta commande avant
                l&apos;application de réductions. Il n&apos;inclut pas les frais
                d&apos;expédition.
              </div>
            </div>
          </div>
          <div data-testid="summary-subtotal" className="css-1rvmomr eskvfop0">
            —
          </div>
        </div>
        <div className="mb-2 flex">
          <div className="w-[380px] pr-20">
            Frais estimés de prise en charge et d&apos;expédition
          </div>
          <div data-testid="summary-shipping" className="ml-2 text-right">
            Gratuit
          </div>
        </div>
        <div className="flex justify-between py-4 my-3 border-t border-b border-[#E5E5E5]">
          <p>Total</p>
          <span data-testid="summary-total">—</span>
        </div>
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
            // className={cn(
            //   buttonVariants({
            //     variant: "secondary",
            //     size: "large",
            //     fullWidth: true,
            //   }),
            //   "font-medium"
            // )}
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
      </aside>
    </div>
  );
};

export default Details;

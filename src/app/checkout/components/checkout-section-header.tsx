import CheckoutSectionTitle from "@/app/checkout/components/checkout-section-title";
import React from "react";
import Loader from "./loader";

type CheckoutSectionHeaderProps = {
  title: string;
  step: number | null;
};

const CheckoutSectionHeader = ({ title, step }: CheckoutSectionHeaderProps) => {
  return (
    <section>
      <span className="sr-only">
        {title} Étape {step} sur 3 Étape terminée
      </span>
      <CheckoutSectionTitle title="Options de livraison" />

      <div className="h-[184px] bg-green-100 w-full flex justify-center items-center">
        <Loader />
      </div>
    </section>
  );
};

export default CheckoutSectionHeader;

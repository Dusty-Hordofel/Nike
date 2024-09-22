import CheckoutSectionTitle from "@/components/client/checkout/checkout-section-title";
import React from "react";
import Loader from "../../ui/loader";

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

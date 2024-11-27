import CheckoutSectionTitle from "@/components/common/checkout/checkout-section-title";
import React from "react";
import Loader from "../../ui/loader";

type CheckoutSectionHeaderProps = {
  title: string;
  step: number | null;
};

const CheckoutSectionHeader = ({
  title = "Options de livraison",
  step,
}: CheckoutSectionHeaderProps) => {
  return (
    <section>
      <span className="sr-only">
        {title} Étape {step} sur 3 Étape terminée
      </span>
      <CheckoutSectionTitle title={title} />

      <div className="h-[184px] w-full flex justify-center items-center">
        <Loader />
      </div>
    </section>
  );
};

export default CheckoutSectionHeader;

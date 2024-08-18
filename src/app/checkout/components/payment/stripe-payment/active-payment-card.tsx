import { getCardBrandImage } from "@/lib/utils";
import React from "react";

type ActivePaymentCardProps = {
  activePaymentMethod: {
    brand: string;
    last4: string;
    expMonth: string;
    expYear: string;
  };
};

const ActivePaymentCard = ({
  activePaymentMethod: { brand, last4, expMonth, expYear },
}: ActivePaymentCardProps) => {
  return (
    <section className="mb-4">
      <h3 className="pb-3">Mode de paiement</h3>
      <div className="mt-2 flex gap-x-4 text-gray-500">
        <img
          src={getCardBrandImage(brand?.toUpperCase())}
          alt={brand}
          className="w-10 h-5"
        />
        <span>{last4}</span>
        <span>
          Exp: &nbsp;{expMonth}/{expYear}
        </span>
      </div>
    </section>
  );
};

export default ActivePaymentCard;

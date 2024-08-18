import { Button } from "@/components/ui/buttons/button/button";
import { getCardBrandImage } from "@/lib/utils";
import { UseMutationResult } from "@tanstack/react-query";
import React from "react";

type PaymentCardProps = {
  id: string;
  brand: string;
  isActive: boolean;
  last4: string;
  deletePaymentMethod: UseMutationResult<any, Error, string, unknown>;
  paymentMethodId: string;
  // changeActivePaymentMethod: UseMutationResult<any, Error, string, unknown>;
  // handleChangeActivePaymentMethod: any;
  onChangeActivePaymentMethod: (
    paymentMethodId: string,
    id: string
  ) => Promise<void>;
};

const PaymentCard = ({
  id,
  brand,
  isActive,
  last4,
  deletePaymentMethod,
  paymentMethodId,
  // changeActivePaymentMethod,
  onChangeActivePaymentMethod,
}: PaymentCardProps) => {
  return (
    <div
      className={`py-4  border-black-200 flex justify-between px-3 rounded-lg ${isActive ? "border-2" : "border"} cursor-pointer`}
      onClick={() => onChangeActivePaymentMethod(paymentMethodId, id)}
      // onClick={async () =>
      //   changeActivePaymentMethod.mutateAsync(paymentMethodId)
      // }
    >
      <div className="flex justify-center items-center">
        <img
          src={getCardBrandImage(brand?.toUpperCase())}
          alt={brand}
          className="w-10 h-5"
        />
        <div className="flex justify-center items-center ml-3">
          <span>{brand[0]?.toUpperCase() + brand.slice(1)}</span>
          <span className="ml-1">{`(${last4})`}</span>
        </div>
      </div>
      <Button
        variant="link"
        size="content"
        className="cursor-pointer"
        onClick={async () => deletePaymentMethod.mutateAsync(paymentMethodId)}
      >
        Supprimer
      </Button>
    </div>
  );
};

export default PaymentCard;

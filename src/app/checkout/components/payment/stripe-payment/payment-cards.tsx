import React from "react";
import PaymentCard from "./payment-card";
import {
  QueryObserverPendingResult,
  QueryObserverSuccessResult,
  UseMutationResult,
} from "@tanstack/react-query";

type PaymentCardsProps = {
  paymentMethods:
    | QueryObserverSuccessResult<any, Error>
    | QueryObserverPendingResult<any, Error>;
  deletePaymentMethod: UseMutationResult<any, Error, string, unknown>;
  //   paymentMethodId: string;
};

const PaymentCards = ({
  paymentMethods,
  deletePaymentMethod,
}: PaymentCardsProps) => {
  return (
    <div className="px-5 pt-5">
      <h3 className="mb-6">Modes de paiement enregistrés</h3>
      <div className="space-y-4">
        {paymentMethods.data.cardsWithLast4.map(
          ({ brand, last4, paymentMethodId, isActive }: any) => (
            <PaymentCard
              last4={last4}
              isActive={isActive}
              brand={brand}
              paymentMethodId={paymentMethodId}
              deletePaymentMethod={deletePaymentMethod}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PaymentCards;

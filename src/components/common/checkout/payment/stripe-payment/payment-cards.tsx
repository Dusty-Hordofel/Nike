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
  // changeActivePaymentMethod: UseMutationResult<any, Error, string, unknown>;
  //   paymentMethodId: string;
  onChangeActivePaymentMethod: (
    paymentMethodId: string,
    id: string
  ) => Promise<void>;
};

const PaymentCards = ({
  paymentMethods,
  deletePaymentMethod,
  // changeActivePaymentMethod,
  onChangeActivePaymentMethod,
}: PaymentCardsProps) => {
  return (
    <div className="px-5 pt-5">
      <h3 className="mb-6">Modes de paiement enregistrés</h3>
      <div className="space-y-4">
        {paymentMethods.data.cardsWithLast4.map(
          ({ id, brand, last4, paymentMethodId, isActive }: any) => (
            <PaymentCard
              key={id}
              id={id}
              last4={last4}
              isActive={isActive}
              brand={brand}
              paymentMethodId={paymentMethodId}
              deletePaymentMethod={deletePaymentMethod}
              // changeActivePaymentMethod={changeActivePaymentMethod}
              onChangeActivePaymentMethod={onChangeActivePaymentMethod}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PaymentCards;

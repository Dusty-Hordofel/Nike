"use client";
import { ChangeEventHandler, useEffect, useState } from "react";
import "./input.css";
import CheckoutSectionTitle from "@/components/common/checkout/checkout-section-title";
import Loader from "../../../../ui/loader";
import {
  useActivePaymentMethod,
  useChangeActivePaymentMethod,
  useDeletePaymentMethod,
  useGetPaymentMethods,
} from "@/hooks/user/payment-section";

import {
  StripePayment,
  PaymentMethods,
  BillingAddress,
  PaymentCards,
  ActivePaymentCard,
  BillingCountry,
} from "./index";
import { useDeliveryContext } from "@/hooks/user/checkout/use-delivery-context.hook";
import { usePaymentContext } from "@/hooks/user/checkout/use-payment-context.hook";

export default function PaymentSection({
  deliveryAddress,
  cart,
  currentCheckoutSection,
}: any) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "creditDebit" | "paypal" | "googlePay"
  >("creditDebit");

  const { deliveryStep } = useDeliveryContext();

  const {
    loading,
    isFormValid,
    hasCardFieldError,
    paymentStep,
    setPaymentStep,
    handleSubmit,
  } = usePaymentContext();

  const paymentMethods = useGetPaymentMethods();
  const deletePaymentMethod = useDeletePaymentMethod();
  const activePaymentMethod = useActivePaymentMethod();
  const changeActivePaymentMethod = useChangeActivePaymentMethod();

  useEffect(() => {
    if (activePaymentMethod.isSuccess && activePaymentMethod.data.success) {
      setPaymentStep(3);
    }
  }, [activePaymentMethod.isSuccess, activePaymentMethod.data]);

  useEffect(() => {
    if (
      activePaymentMethod.isError ||
      (activePaymentMethod.isSuccess && !activePaymentMethod.data.success)
    ) {
      setPaymentStep(1);
    }
  }, [
    activePaymentMethod.isError,
    activePaymentMethod.isSuccess,
    activePaymentMethod.data,
  ]);

  if (
    cart.isLoading ||
    paymentMethods.isLoading ||
    activePaymentMethod.isLoading
  )
    return (
      <section>
        <span className="sr-only">Paiement Étape 2 sur 3 Étape terminée</span>
        <CheckoutSectionTitle
          title="Paiement"
          isComplete={
            paymentStep === 3 && activePaymentMethod.data.success ? true : false
          }
          onChangeStep={() => setPaymentStep(2)}
        />

        <div className="h-[184px] bg-green-100 w-full flex justify-center items-center">
          <Loader />
        </div>
      </section>
    );

  if (cart.isError || paymentMethods.isError || activePaymentMethod.isError)
    return <p>Error...</p>;

  const handlePaymentMethodChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value as "creditDebit" | "paypal" | "googlePay";
    setSelectedPaymentMethod(value);
  };

  const handleEditClick = () => {
    // Logique pour la modification du pays/région
    console.log("Modifier le pays/région");
  };

  const handleChangeActivePaymentMethod = async (
    paymentMethodId: string,
    id: string
  ) => {
    await changeActivePaymentMethod.mutateAsync({ paymentMethodId, id });
    console.log("paymentMethodId,ID", paymentMethodId, id);
  };

  return (
    <section>
      <span className="sr-only">Paiement Étape 2 sur 3 Étape en cours</span>
      <CheckoutSectionTitle
        title="Paiement"
        isComplete={
          paymentStep === 3 && activePaymentMethod.data.success ? true : false
        }
        onChangeStep={() => setPaymentStep(2)}
      />

      <div
        className={`mt-2 ${
          deliveryStep === 3 &&
          currentCheckoutSection === "payment" &&
          deliveryAddress.activeDeliveryAddress?.success
            ? "block"
            : "hidden"
        }`}
      >
        {(paymentStep === 1 || paymentStep === 2) && (
          <>
            <BillingCountry country="France" onEdit={handleEditClick} />
            <div className="mb-7 mx-5">
              <PaymentMethods
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
              />
            </div>
          </>
        )}

        {selectedPaymentMethod == "creditDebit" && paymentStep === 1 && (
          <div className="mb-7 mx-5">
            <div
              className={`px-5 pt-5 pb-[1.5px] border ${
                hasCardFieldError ? "border-red" : "border-black-200"
              } rounded-md`}
            >
              <div className="ncss-col-sm-6 va-sm-b mb-4 px-2">
                <h3 className="css-5oevkg font-medium">Ajouter une carte</h3>
              </div>
              <StripePayment
                total="33"
                order_id="123456789"
                stripe_public_key={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
              />
            </div>
          </div>
        )}

        {paymentStep === 2 && (
          <PaymentCards
            paymentMethods={paymentMethods}
            deletePaymentMethod={deletePaymentMethod}
            onChangeActivePaymentMethod={handleChangeActivePaymentMethod}
          />
        )}

        {paymentStep === 3 && (
          <div
            className={`${paymentStep === 3 ? "py-5" : "pt-5"} bg-warning px-5`}
          >
            <div data-attr="shippingPreviewContainer">
              <div
                className={`${paymentStep === 3 && "mb-4"}`}
                data-attr="addressPreview"
              >
                {activePaymentMethod.data.success && (
                  <ActivePaymentCard
                    activePaymentMethod={
                      activePaymentMethod.data.activeCardInformation
                    }
                  />
                )}
                <h3
                  className={`shippingContainer ${
                    paymentStep === 3 ? "block text-black-200" : "hidden"
                  }`}
                >
                  Informations de facturation
                </h3>
                <BillingAddress
                  paymentStep={paymentStep}
                  activeDeliveryAddress={deliveryAddress.activeDeliveryAddress}
                />
              </div>
            </div>
          </div>
        )}

        {(paymentStep === 1 || paymentStep === 2) && (
          <div className="mt-6 bg-warning flex justify-end pb-5 px-5">
            <button
              disabled={(paymentStep === 1 && !isFormValid) || loading}
              className={`${
                isFormValid || paymentStep === 2
                  ? "bg-black-200 text-white"
                  : "bg-gray-300 text-black-200/30"
              } w-max py-3 px-6 rounded-full font-medium`}
              onClick={
                paymentStep === 2 ? () => setPaymentStep(3) : handleSubmit
              }
            >
              {loading
                ? "Processing..."
                : "Continuer pour voir le récapitulatif de la commande"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";
import { ChangeEventHandler, useEffect, useState } from "react";
import "./input.css";
import CheckoutHeader from "@/app/checkout/components/checkout-section-title";
import Loader from "../../loader";
import { useDeliveryContext } from "@/context/DeliveryContext";
import { usePaymentContext } from "@/context/PaymentContext";
import { useGetCart } from "@/hooks/api/use-get-cart";
import { useActiveDeliveryAddress } from "@/hooks/api/delivery-section";
import {
  useActivePaymentMethod,
  useDeletePaymentMethod,
  useGetPaymentMethods,
} from "@/hooks/api/payment-section";
import {
  StripePayment,
  PaymentMethods,
  BillingAddress,
  PaymentAndBillingSummary,
  PaymentCards,
  ActivePaymentCard,
  BillingCountry,
} from "./index";

export default function PaymentSection() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "creditDebit" | "paypal" | "googlePay"
  >("creditDebit");
  const [paymentStep, setPaymentStep] = useState<null | number>(null);
  console.log("🚀 ~ PaymentSection ~ paymentStep:PAYMENT STEP", paymentStep);

  const { deliveryStep, activeSection, setActiveSection } =
    useDeliveryContext();
  const { activeDeliveryAddress, isLoading, isError } =
    useActiveDeliveryAddress();
  const { loading, isFormValid, hasCardFieldError, handleSubmit } =
    usePaymentContext();

  const cart = useGetCart();
  const paymentMethods = useGetPaymentMethods();
  const deletePaymentMethod = useDeletePaymentMethod();
  const activePaymentMethod = useActivePaymentMethod();
  console.log(
    "🚀 ~ PaymentSection ~ activePaymentMethod:ACTIVE",
    activePaymentMethod
  );

  // Mettez à jour l'état uniquement si la requête réussit
  useEffect(() => {
    if (activePaymentMethod.isSuccess && activePaymentMethod.data.success) {
      setPaymentStep(3);
    }
  }, [activePaymentMethod.isSuccess, activePaymentMethod.data]);

  // En cas d'erreur, assignez une valeur par défaut
  useEffect(() => {
    if (
      activePaymentMethod.isError ||
      (activePaymentMethod.isSuccess && !activePaymentMethod.data.success)
    ) {
      setPaymentStep(1); // Par exemple: valeur par défaut
    }
  }, [
    activePaymentMethod.isError,
    activePaymentMethod.isSuccess,
    activePaymentMethod.data,
  ]);

  if (
    isLoading ||
    cart.isLoading ||
    paymentMethods.isLoading ||
    activePaymentMethod.isLoading
  )
    return (
      <section>
        <span className="sr-only">Paiement Étape 2 sur 3 Étape terminée</span>
        <CheckoutHeader title="Paiement" />

        <div className="h-[184px] bg-green-100 w-full flex justify-center items-center">
          <Loader />
        </div>
      </section>
    );

  if (
    isError ||
    cart.isError ||
    paymentMethods.isError ||
    activePaymentMethod.isError
  )
    return <p>Error...</p>;

  console.log("CART", cart.data);

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

  // const handleCreateOrder = async () => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         products: cart.data.products,
  //         shippingAddress: activeDeliveryAddress.activeAddress,
  //         paymentMethod: selectedPaymentMethod,
  //         // total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
  //         total: cart.data.cartTotal, //a modifier
  //         totalBeforeDiscount: cart.data.cartTotal,
  //         couponApplied: "MOYKALR",
  //       }),
  //     }
  //   );
  //   return response.json();
  // };

  console.log(
    "🚀 ~ PaymentSection ~ paymentMethods:PAYMENT",
    paymentMethods.data
  );

  return (
    <section>
      <span className="sr-only">Paiement Étape 2 sur 3 Étape en cours</span>
      <CheckoutHeader title="Paiement" />
      <div
        className={`mt-2 ${deliveryStep === 3 && activeSection === "payment" && activeDeliveryAddress?.success ? "block" : "hidden"}`}
      >
        {/* loading 1 à ajouter*/}
        <BillingCountry country="France" onEdit={handleEditClick} />

        {/* revoir le mb value */}
        <div className="mb-7 mx-5">
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
          />
        </div>

        {/* ETAPE 2 */}
        {selectedPaymentMethod == "creditDebit" && (
          <div className="mb-7 mx-5">
            <div
              className={`px-5 pt-5 pb-[1.5px] border ${hasCardFieldError ? "border-red" : "border-black-200"} rounded-md`}
            >
              <div className="ncss-col-sm-6 va-sm-b mb-4 px-2">
                <h3 className="css-5oevkg font-medium">Ajouter une carte</h3>
              </div>
              <StripePayment
                total="33"
                order_id="123456789"
                stripe_public_key={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
                // stripe_public_key={stripe_public_key}
              />
            </div>
          </div>
        )}

        <PaymentCards
          paymentMethods={paymentMethods}
          deletePaymentMethod={deletePaymentMethod}
        />
        <ActivePaymentCard
          activePaymentMethod={activePaymentMethod.data.activeCardInformation}
        />

        <div className="mb-5 mx-5">
          <BillingAddress activeDeliveryAddress={activeDeliveryAddress} />
        </div>

        {/* Button de validation de la méthode de payment */}
        <div className="mt-6 bg-warning flex justify-end pb-5 px-5">
          <button
            // type="submit"
            disabled={!isFormValid || loading}
            className={`${isFormValid ? "bg-black-200 text-white" : "bg-gray-300 text-black-200/30"} w-max py-3 px-6 rounded-full font-medium`}
            // onClick={() => {
            //   setActiveSection("summary")
            // }}
            onClick={handleSubmit}
          >
            {loading
              ? "Processing..."
              : "Continuer pour voir le récapitulatif de la commande"}
          </button>
        </div>
      </div>

      {activeSection === "summary" && <PaymentAndBillingSummary />}
    </section>
  );
}

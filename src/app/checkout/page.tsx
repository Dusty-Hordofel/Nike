"use client";
// import { currentUser } from "@/utils/auth";
// import DeliveryInfo from "./components/delivery-section";
// import Cart from "@/models/Cart";
// import { redirect } from "next/navigation";
// import { getCart } from "@/actions/user-cart.actions";
import { ChangeEventHandler, Suspense, useEffect, useState } from "react";
// import { getUserActiveAdress } from "@/actions/user-address.actions";
// import CheckoutHeader from "@/components/Checkout/checkout-header";
// import Test from "./Test";
import DeliverySection from "./components/delivery-section";
import OrderSummary from "./components/order-summary";
import { useQuery } from "@tanstack/react-query";
// import PaymentSection from "./payment-section";
import SummarySection from "./summary-section";
import PaymentSection from "./components/payment/payment-section";
import { DeliveryMode } from "./components/delivery-mode-selector";
// import DeliveryModeSelector, { DeliveryMode } from "./delivery-mode-selector";

const CheckoutPage = () => {
  const [activeSection, setActiveSection] = useState<
    "address" | "payment" | "summary"
  >("address");
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [deliveryStep, setDeliveryStep] = useState(3); //or 1
  // const [deliveryStep, setDeliveryStep] = useState(
  //   deliveryAddress.success ? 3 : 1
  // );

  const handlePaymentMethodChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePaymentSubmit = (event: any) => {
    event.preventDefault();
    // Validate and save payment information here
    const paymentData = {
      // Gather payment data from form
      method: selectedPaymentMethod,
    };
    // setPayment(paymentData);
    // handleSectionChange('summary');
  };

  const {
    data: deliveryAddress,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`/api/user/6679d2feecfa26a59fc309b1/active-address`).then((res) =>
        res.json()
      ),
  });

  // useEffect(() => {
  //   if (deliveryAddress && deliveryAddress.success) {
  //     setDeliveryStep(3);
  //   } else {
  //     setDeliveryStep(1);
  //   }
  // }, [deliveryAddress]);

  useEffect(() => {
    if (deliveryAddress) {
      if (deliveryAddress.success) {
        setDeliveryStep(3);
      } else {
        setDeliveryStep(1);
      }
    }
  }, [deliveryAddress]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  // onSubmit={handlePaymentSubmit}
  console.log("🚀 ~ CheckoutPage ~ userActiveAdressQuery:", deliveryAddress);

  return (
    <>
      <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
        <div className="flex">
          <main className="w-2/3 bg-success px-[6px]">
            <DeliverySection
              deliveryAddress={deliveryAddress}
              setActiveSection={setActiveSection}
              deliveryStep={deliveryStep}
              setDeliveryStep={setDeliveryStep}
            />
            <PaymentSection
              handlePaymentMethodChange={handlePaymentMethodChange}
              selectedPaymentMethod={selectedPaymentMethod}
              // setSelectedPaymentMethod={setSelectedPaymentMethod}
              deliveryAddress={deliveryAddress}
              deliveryStep={deliveryStep}
            />
            <SummarySection />
          </main>
          <aside className="w-1/3 px-[6px]">
            <OrderSummary />
          </aside>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

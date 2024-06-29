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
import DeliverySection from "./components/delivery/delivery-section";
import OrderSummary from "./components/order/order-summary";
import { useQuery } from "@tanstack/react-query";
// import PaymentSection from "./payment-section";
import SummarySection from "./components/summary/summary-section";
import PaymentSection from "./components/payment/payment-section";
import { DeliveryMode } from "./components/delivery/delivery-mode-selector";
import { getCart } from "@/actions/user-cart.actions";
import { getUserActiveAdress } from "@/actions/user-address.actions";
import { useCurrentUser } from "@/hooks/user/use-current-user";
// import DeliveryModeSelector, { DeliveryMode } from "./delivery-mode-selector";

const CheckoutPage = () => {
  const [activeSection, setActiveSection] = useState<
    "address" | "payment" | "summary"
  >("address");
  // const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [deliveryStep, setDeliveryStep] = useState(3); //or 1
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");

  // const [addresses, setAddresses] = useState(user?.address || []);
  const [selectedAddress, setSelectedAddress] = useState("");
  // const [cart, setCart] = useState<any>([]);
  // const [deliveryStep, setDeliveryStep] = useState(
  //   deliveryAddress.success ? 3 : 1
  // );
  // console.log("🚀 ~ CheckoutPage ~ cart:", cart.cartTotal);

  const user = useCurrentUser();
  console.log("🚀 ~ CheckoutPage ~ user:USER CLIENR", user);

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
      fetch(`/api/user/${user?._id}/active-address`).then((res) => res.json()),
  });

  const {
    data: cart,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(`/api/cart/${user?._id}`).then((res) => res.json()),
  });

  // if(!cart)

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

  console.log("🚀 ~ CheckoutPage ~ userActiveAdressQuery:", deliveryAddress);

  return (
    <>
      <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
        <div className="flex">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
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
              {isCartLoading ? (
                <p>Loading...</p>
              ) : (
                <SummarySection deliveryStep={deliveryStep} />
              )}
            </main>
          )}
          {isCartLoading ? (
            <p>Loading...</p>
          ) : (
            <aside className="w-1/3 px-[6px]">
              <OrderSummary />
            </aside>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

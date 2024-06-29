"use client";
import React from "react";
import OrderSummary from "../order/order-summary";
import { useDeliveryContext } from "@/context/DeliveryContext";

const SummarySection = () => {
  // console.log("🚀 ~ deliveryStep:", deliveryStep);
  const { deliveryStep, activeSection } = useDeliveryContext();
  return (
    // mt-2 ${deliveryStep === 3 && && deliveryAddress.success
    <div
    // className={` ${activeSection === "summary" ? "block" : "hidden"}`}
    >
      <OrderSummary />;
    </div>
  );
};

export default SummarySection;

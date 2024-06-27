import React from "react";
import OrderSummary from "./components/order-summary";

const SummarySection = ({ deliveryStep }: any) => {
  return <OrderSummary deliveryStep={deliveryStep} />;
};

export default SummarySection;

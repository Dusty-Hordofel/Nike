import React from "react";
import OrderSummary from "../order/order-summary";

const SummarySection = ({ deliveryStep }: any) => {
  return <OrderSummary deliveryStep={deliveryStep} />;
};

export default SummarySection;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./stripe-form";

const StripePayment = ({ total, order_id, stripe_public_key }: any) => {
  // console.log("🚀 ~ StripePayment ~ stripe_public_key:", stripe_public_key);
  // const stripePromise = loadStripe(stripe_public_key);

  return (
    // <Elements stripe={stripePromise}>
    <StripeForm
    //   total={total} order_id={order_id}
    />
    // </Elements>
  );
};

export default StripePayment;

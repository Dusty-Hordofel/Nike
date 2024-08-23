"use client";

import { useActiveDeliveryAddress } from "@/hooks/api/delivery-section";
import { useGetCart } from "@/hooks/api/cart/use-get-cart";
import { DeliverySection2 } from "./components/delivery";
import PaymentSection from "./components/payment/stripe-payment/payment-section";
import OrderSection from "./components/order/order-section";
import OrderSummary from "./components/order/order-summary";
import Loader from "./components/loader";
import Modal from "./result-modal";
import { useModal } from "@/hooks/modal/use-modal-provider";

type Props = {};

const CheckoutPage = () => {
  // const user = await currentUser();

  const deliveryAddress = useActiveDeliveryAddress();
  const cart = useGetCart();
  // const { showModal } = useModal();
  // console.log("🚀 ~ CheckoutPage ~ showModal:TRUE", showModal);

  if (deliveryAddress.isLoading || cart.isLoading)
    return (
      <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );

  if (deliveryAddress.isError || cart.isError)
    return (
      <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {deliveryAddress.error?.message}</h1>
        </div>
      </div>
    );

  return (
    <>
      {/* <Modal /> */}
      <div className="max-w-[1090px] px-[6px] bg-green-500 mx-auto">
        <div className="flex">
          {/* <section
          className="z-50 bg-white"
          style={{ position: "fixed", opacity: "0.95", inset: "0px" }}
        >
          <div style={{ position: "relative", top: "40%" }}>
            <div
              className=""
              style={{
                height: "32px",
                margin: "0px auto",
                width: "32px",
              }}
            >
              <Loader />
            </div>
            <p className="sr-only">
              <div aria-live="assertive">
                Il semble que le traitement de la commande prend plus de temps
                que d'habitude. Ne rafraîchis pas la page tant que nous n'avons
                pas finalisé la commande.
              </div>
            </p>
          </div>
        </section> */}

          <main className="w-full lg:w-2/3 bg-success px-[6px]">
            <div className="flex justify-center items-center flex-col p-9">
              <h1 className="text-2xl">Paiement</h1>
              <p className="space-x-2 text-gray-900 block lg:hidden">
                <span className="totalQuantity mr2-sm va-sm-m">
                  {cart?.data?.cart?.products?.length} article
                  {cart?.data?.cart?.products?.length > 2 && "s"}
                </span>
                <span className="priceTotal va-sm-m">
                  {cart?.data?.cart?.cartTotal}&nbsp;€
                </span>
              </p>
            </div>
            <DeliverySection2 deliveryAddress={deliveryAddress} />
            <PaymentSection deliveryAddress={deliveryAddress} cart={cart} />
            <OrderSection deliveryAddress={deliveryAddress} cart={cart} />
          </main>
          <aside className="w-0 lg:w-1/3 px-[6px] lg:block hidden">
            <OrderSummary deliveryAddress={deliveryAddress} cart={cart} />
          </aside>
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;

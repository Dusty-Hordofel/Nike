import { currentUser } from "@/utils/auth";
import DeliveryInfo from "./DeliveryInfo";
import Cart from "@/models/Cart";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/user-cart.actions";
import { Suspense } from "react";
import { getUserAddresses } from "@/actions/user-address.actions";
import Payment from "@/components/Checkout/payment/Payment";
import CheckoutHeader from "@/components/Checkout/checkout-header";
import Test from "./Test";

const CheckoutPage = async () => {
  const user = await currentUser();
  console.log("🚀 ~ CheckoutPage ~ user:", user);
  if (!user) redirect("/cart"); //metre le bon endroit
  console.log("🚀 ~ CheckoutPage ~ user:", user);
  const cart = await getCart();
  // console.log("🚀 ~ CheckoutPage ~ cart:", cart);
  if (!cart) redirect("/");

  const addresses = await getUserAddresses();
  // if (!addresses) return;
  // console.log("🚀 ~ CheckoutPage ~ addresses:", addresses);
  {
    /* sr-only */
  }
  return (
    <div className="w-max bg-green-500 mx-auto">
      <Suspense fallback={<p>Loading.....</p>}>
        <div>
          <section className="max-w-[703px] w-[66,67%]">
            {/* <span className="">
              Options de livraison Étape 1 sur 3 Étape terminée
            </span>
            <CheckoutHeader title="Options de livraison" /> */}

            {/* <div className="p-5 text-gray-500  bg-blue-100">
              <div data-attr="shippingPreviewContainer" className="px-2">
                <div className="mb-4" data-attr="addressPreview">
                  <h3 className="text-black-200">Adresse de livraison</h3>
                  <div className="css-7ym3jb">
                    <p data-attr="address-preview-fullName">
                      {addresses[0].lastName} {addresses[0].firstName}
                    </p>
                    <p>
                      <span data-attr="address-preview-address1">
                        {addresses[0].address}
                      </span>
                    </p>
                    <div className="ncss-row">
                      <div className="ncss-col-sm-12">
                        <p data-attr="address-preview-city">
                          {addresses[0].city}, {addresses[0].postalCode}
                        </p>
                      </div>
                    </div>
                    <p data-attr="address-preview-email">
                      {addresses[0].email}
                    </p>
                    <p data-attr="address-preview-phoneNumber">
                      {addresses[0].phone}
                    </p>
                  </div>
                </div>
                <div data-attr="shippingContainer">
                  <h3 className="text-black-200">Délai de livraison</h3>
                  <p data-attr="shipping-preview-method">
                    Gratuit
                    <br />
                    <span>Livraison d'ici le&nbsp;mer. 26 juin</span>
                  </p>
                </div>
              </div>
            </div> */}
          </section>
          <DeliveryInfo cart={cart} />
        </div>
      </Suspense>
      {/* <Suspense fallback={<p>MEKA.....</p>}>
        <Test addresses={addresses} />
      </Suspense> */}
    </div>
  );
};

export default CheckoutPage;

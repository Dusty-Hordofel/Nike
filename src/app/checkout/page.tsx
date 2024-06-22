import { currentUser } from "@/utils/auth";
import DeliveryInfo from "./DeliveryInfo";
import Cart from "@/models/Cart";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/user-cart.actions";
import { Suspense } from "react";
import { getUserAddresses } from "@/actions/user-address.actions";
import Payment from "@/components/Checkout/payment/Payment";

const CheckoutPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/cart"); //metre le bon endroit
  console.log("🚀 ~ CheckoutPage ~ user:", user);
  const cart = await getCart();
  console.log("🚀 ~ CheckoutPage ~ cart:", cart);
  if (!cart) redirect("/");

  const addresses = await getUserAddresses();
  console.log("🚀 ~ CheckoutPage ~ addresses:", addresses);

  return (
    <>
      <Suspense fallback={<p>Loading.....</p>}>
        {/* {addresses.length > 0 ? ( */}
        <>
          <section className="max-w-[703px] w-[66,67%]">
            <span className="sr-only">
              Options de livraison Étape 1 sur 3 Étape terminée
            </span>
            <header className="flex bg-warning justify-between px-5 pt-3 pb-7">
              <h2 className="flex text-2xl font-medium ">
                Options de livraison
                <span className="flex items-center ml-3">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="24px"
                    height="24px"
                    fill="none"
                    color="green"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      d="M5.03 11.69l4.753 4.754 9.186-9.188"
                    ></path>
                  </svg>
                </span>
              </h2>
              <button
                aria-label="Modifier,Options de livraison"
                className="nds-btn  css-1g4vzc ex41m6f0 cta-primary-dark underline btn-md"
                type="button"
                data-attr="editButton"
              >
                Modifier<span className="ripple"></span>
              </button>
            </header>

            <div className="p-5 text-gray-500  bg-blue-100">
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
            </div>
          </section>
          <DeliveryInfo cart={cart} />
        </>
        {/* ) : ( */}
        {/* )} */}
      </Suspense>
    </>
  );
};

export default CheckoutPage;

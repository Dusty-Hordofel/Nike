"use client";

import {
  FieldValues,
  useForm,
  SubmitHandler,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { UserAuthHeaderForm, UserAuthInputFieldForm } from "@/components/auth";
import { cn } from "@/lib/utils";
import { CrossedEye } from "@/assets/icons";
import { Eye } from "lucide-react";
// import ShoppingPreference from "./ShoppingPreference";
import { Button } from "@/components/ui/buttons/button/button";
// import FormCheckbox from "./form-checkbox";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/auth";
import { signInWithCredentials } from "@/actions/user-auth.actions";
import { ZodError } from "zod";
import { useCurrentUser } from "@/hooks/user/use-current-user";
import {
  DeliveryInfoFormData,
  DeliveryInfoSchema,
} from "@/lib/validations/delivery";
import { ICart } from "@/models/Cart";
import {
  getUserActiveAdress,
  // getUserAddresses,
  saveUserAddress,
} from "@/actions/user-address.actions";
import { useEffect, useState } from "react";
// import Payment from "@/components/Checkout/payment/Payment";
// import OrderSummary from "@/components/Checkout/payment/order-summary";
import CheckoutHeader from "@/components/Checkout/checkout-header";

const DeliveryInfo = ({ cart }: { cart: ICart }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  // console.log("🚀 ~ SignUp ~ email:", email);

  // const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [refresh, setRefresh] = useState(false);

  const user = useCurrentUser();
  // console.log("🚀 ~ DeliveryInfo ~ user:", user);
  // if (user /*&& userRole !== "user"*/) {
  //   router.push(`${window.location.origin}` || "/");
  // }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting, dirtyFields, touchedFields },
  //   reset,
  //   getValues,
  // } = useForm<DeliveryInfoFormData>({
  //   resolver: zodResolver(DeliveryInfoSchema),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, touchedFields },
    reset,
    getValues,
  } = useForm<DeliveryInfoFormData>({
    resolver: zodResolver(DeliveryInfoSchema),
  });

  useEffect(() => {
    const fetchUserAddress = async () => {
      const response = await getUserActiveAdress();
      const { success, activeAddress } = response;
      // console.log("🚀 ~ fetchUserAddress ~ activeAddress:", activeAddress);
      // console.log("🚀 ~ fetchUserAddress ~ response1:RES", response);
      if (success) {
        reset(activeAddress);
      } else {
        reset({
          lastName: "",
          firstName: "",
          country: "",
          address: "",
          phoneNumber: "",
          email: "",
          companyInfo: "",
          city: "",
          postalCode: "",
        });
      }
    };

    fetchUserAddress();
  }, [refresh]);

  const onSubmit = async (values: DeliveryInfoFormData) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    let save = await saveUserAddress(values);
    console.log("🚀 ~ onSubmit ~ save:", save);

    if (save.success) {
      setRefresh(!refresh); // Changez l'état pour relancer le useEffect
    }
  };

  return (
    <div className="flex">
      <main className="max-w-[703px] w-[66,67%]">
        <section>
          <span className="">
            Options de livraison Étape 1 sur 3 Étape terminée
          </span>
          <CheckoutHeader title="Options de livraison" />
          <div>
            {/* <div
            role="radiogroup"
            className="tab-wrapper ncss-row css-6m6fic flex justify-between gap-x-4"
          >
            <div
              role="radio"
              aria-checked="true"
              className="pr5-sm pl5-sm ta-sm-c ncss-col-sm-6 css-1iacgar bg-blue-400 w-full px-5 py-3"
              // for="SHIP"
              data-delivery-type="SHIP"
              // tabindex="0"
            >
              <h3
              // style="margin-left: 0px"
              >
                <svg
                  aria-hidden="true"
                  className="css-19093ix"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                  // style="right: 0px"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    d="M15.75 16.565H8.5M.75 11.5V14A2.25 2.25 0 003 16.25h.25m16.25-6.5H3A2.25 2.25 0 01.75 7.5V5.25h17.189c.2 0 .39.079.531.22l4.56 4.56a.75.75 0 01.22.531v3.689A2.25 2.25 0 0121 16.5h-.75m-12 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm12 .033a2.25 2.25 0 11-4.502-.001 2.25 2.25 0 014.502.001z"
                  ></path>
                </svg>
                Expédition
              </h3>
            </div>
            <div
              role="radio"
              aria-checked="false"
              className="pr5-sm pl5-sm ta-sm-c ncss-col-sm-6 u-cursor-pointer css-1kynhgq bg-blue-600 w-full px-5 py-3"
              // for="PICKUP"
              data-delivery-type="PICKUP"
              // tabindex="0"
            >
              <h3
              // style="margin-left: -9px"
              >
                <svg
                  aria-hidden="true"
                  className="css-19093ix"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                  // style="right: -6px"
                >
                  <path
                    fill="currentColor"
                    d="M12 21.747l-.468.586a.75.75 0 00.936 0L12 21.747zM18 9c0 .92-.303 2.081-.824 3.362-.515 1.269-1.222 2.6-1.974 3.843a38.411 38.411 0 01-2.217 3.274c-.695.914-1.223 1.498-1.453 1.682l.936 1.172c.395-.314 1.023-1.042 1.711-1.947a39.904 39.904 0 002.306-3.404c.78-1.288 1.526-2.691 2.08-4.055.55-1.352.935-2.723.935-3.927H18zm-5.532 12.16c-.23-.183-.758-.767-1.453-1.681a38.41 38.41 0 01-2.217-3.274c-.752-1.243-1.458-2.574-1.974-3.843C6.303 11.081 6 9.921 6 9H4.5c0 1.204.385 2.575.934 3.927.555 1.364 1.302 2.767 2.08 4.055.78 1.288 1.6 2.474 2.307 3.404.688.905 1.316 1.633 1.711 1.947l.936-1.172zM6 9a6 6 0 016-6V1.5A7.5 7.5 0 004.5 9H6zm6-6a6 6 0 016 6h1.5A7.5 7.5 0 0012 1.5V3zm2.5 6a2.5 2.5 0 01-2.5 2.5V13a4 4 0 004-4h-1.5zM12 11.5A2.5 2.5 0 019.5 9H8a4 4 0 004 4v-1.5zM9.5 9A2.5 2.5 0 0112 6.5V5a4 4 0 00-4 4h1.5zM12 6.5A2.5 2.5 0 0114.5 9H16a4 4 0 00-4-4v1.5z"
                  ></path>
                </svg>
                Retrait
              </h3>
            </div>
          </div> */}
            <div className=" bg-blue-200">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4 justify-between">
                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="FirstName*"
                    type="text"
                    isLoading={false}
                    // isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<DeliveryInfoFormData>}
                    name="firstName"
                  />

                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="LastName*"
                    type="text"
                    isLoading={false}
                    // isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<DeliveryInfoFormData>}
                    name="lastName"
                  />
                </div>
                <UserAuthInputFieldForm
                  id="text"
                  label="text"
                  placeholder="Adresse(numéro et noom de la rue)*"
                  type="text"
                  isLoading={false}
                  // isLoading={isPending}
                  register={register}
                  errors={errors as FieldErrors<DeliveryInfoFormData>}
                  name="address"
                />
                <UserAuthInputFieldForm
                  id="text"
                  label="text"
                  placeholder="Ajouter entreprise, destinataire, appartement, suite, unité"
                  type="text"
                  isLoading={false}
                  // isLoading={isPending}
                  register={register}
                  errors={errors as FieldErrors<DeliveryInfoFormData>}
                  name="companyInfo"
                />

                <div className="flex gap-4 justify-between">
                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="Code postal*"
                    type="text"
                    isLoading={false}
                    // isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<DeliveryInfoFormData>}
                    name="postalCode"
                  />

                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="Ville*"
                    type="text"
                    isLoading={false}
                    // isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<DeliveryInfoFormData>}
                    name="city"
                  />
                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="France"
                    type="text"
                    isLoading={false}
                    // isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<DeliveryInfoFormData>}
                    name="country"
                  />
                </div>

                <div className="flex gap-4 justify-between">
                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="E-mail*"
                    type="text"
                    isLoading={false}
                    // isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<DeliveryInfoFormData>}
                    name="email"
                  />

                  <UserAuthInputFieldForm
                    id="text"
                    label="text"
                    placeholder="Numéro de téléphone*"
                    type="text"
                    isLoading={false}
                    // isLoading={isPending}
                    register={register}
                    errors={errors as FieldErrors<DeliveryInfoFormData>}
                    name="phoneNumber"
                  />
                </div>
                <div className={cn("mt-10 flex justify-end")}>
                  <Button isLoading={false}>Enregistrer et continuer</Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* <Payment
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        /> */}

        {/* <OrderSummary /> */}
      </main>

      <aside className="max-w-[352px] w-[33,33%]">
        <section className="mb5-sm">
          <CheckoutHeader title="Dans ton panier" />
          {/* <header className="pt5-sm pb3-sm prl5-sm pt3-md u-clearfix">
            <h2 className="fl-sm-l css-1rkogn0">Dans ton panier</h2>
            <button
              aria-label="Modifier"
              className="nds-btn fl-sm-r css-121t4vg ex41m6f0 cta-primary-dark underline btn-md"
              type="button"
            >
              Modifier<span className="ripple"></span>
            </button>
          </header> */}
          <div className="ncss-container mb5-sm">
            {/* PART 1 */}
            <div className="ncss-row" data-attr="summaryComponent">
              <div className="ncss-col-sm-12 p5-lg mb1-sm css-1qpib4x p-5">
                {/* 1 */}
                <div className="flex justify-between items-center">
                  <div className="ncss-col-sm-8 va-sm-t">
                    <div className="d-sm-ib flex items-center">
                      <span data-attr="subtotalText" className="bg-blue-100">
                        Sous-total
                      </span>
                      <span
                        id="subtotalTooltipWrapper"
                        className="css-178g4y  ml-2 top-1 relative"
                      >
                        <button
                          className="d-sm-ib css-9a7n2d"
                          id="subtotalTooltip"
                          aria-label="Détails du sous-total"
                        >
                          <div className="css-1ou3w6b">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                              role="img"
                              width="24px"
                              height="24px"
                              fill="none"
                            >
                              <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M12 20a8 8 0 100-16 8 8 0 000 16zm.75-4.5V17h-1.5v-1.5h1.5zM10.5 10c0-.918.831-1.644 1.764-1.472h.006c.6.106 1.096.603 1.201 1.202v.001a1.502 1.502 0 01-.82 1.63 2.411 2.411 0 00-1.401 2.189V14h1.5v-.45a.91.91 0 01.532-.828l.01-.005a3.002 3.002 0 001.657-3.248 3.008 3.008 0 00-2.416-2.417C10.647 6.706 9 8.179 9 10h1.5z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          {/* <div
                            className="p4-sm z2 css-17f46hh"
                            data-attr="test-message"
                            hidden={false}
                          >
                            <p className="">
                              Le sous-total correspond au prix total de la
                              commande, TVA incluse, avant l'application de
                              réductions. Il n'inclut pas les frais
                              d'expédition.
                            </p>
                          </div> */}
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="ncss-col-sm-4 va-sm-t ta-sm-r">
                    <div data-attr="subtotal">179,98&nbsp;€</div>
                  </div>
                </div>
                {/* 2 */}
                <div className="flex justify-between items-center">
                  <div className="ncss-col-sm-9 va-sm-t">
                    <div data-attr="shippingText">
                      Frais d'expédition estimés
                    </div>
                  </div>
                  <div className="ncss-col-sm-3 va-sm-t ta-sm-r">
                    <div data-attr="shippingTotal">0,00&nbsp;€</div>
                  </div>
                </div>
                {/* 3 */}
                <div className="flex justify-between items-center mt-2">
                  <div className="ncss-col-sm-8 va-sm-t">
                    <div data-attr="totalText" className="css-5oevkg">
                      <span>Total </span>
                    </div>
                  </div>
                  <div className="ncss-col-sm-4 va-sm-t ta-sm-r">
                    <div data-attr="cart-total" className="css-5oevkg">
                      179,98&nbsp;€
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb5-sm">
              <div
                className="border-top-light-grey mr2-lg ml2-lg pt6-lg pt-6 mx-2"
                data-attr="cart-details"
              >
                <div>
                  <header>
                    <h3 className="css-5oevkg">
                      Livraison d'ici le&nbsp;mar. 25 juin
                    </h3>
                  </header>
                  <div className="d-sm-t bs5">
                    <figure className="flex" data-attr="cloud-cart-item">
                      <div className="d-sm-tc va-sm-t">
                        <img
                          alt="Chaussure Nike Cortez Textile pour femme"
                          data-attr="cloud-cart-image"
                          src="https://images.nike.com/is/image/DotCom/DZ2795_601_A_PREM?wid=80&amp;hei=80&amp;align=0,1&amp;cropN=0,0,0,0&amp;fmt=png-alpha&amp;resMode=sharp&amp;defaultImage=DotCom/SEARCH_002"
                          width="60"
                          className="css-16i8mcp"
                        />
                      </div>
                      <figcaption className="d-sm-tc va-sm-t pl5-sm pl-5 text-gray-500">
                        <div className="css-1qpib4x text-black-200">
                          Chaussure Nike Cortez Textile pour femme
                        </div>
                        <div>Réf. article : DZ2795-601</div>
                        <div>
                          <span data-attr="itemSize">Taille : 42</span>
                        </div>
                        <div className="css-ydw93h">
                          Couleur : Picante Red/University Blue/Coconut
                          Milk/Sail
                        </div>
                        <div>Quantité : 2 @ 89,99&nbsp;€</div>
                        <div data-attr="checkout-cart-item-price">
                          179,98&nbsp;€
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
};

export default DeliveryInfo;

// const user = await currentUser();
// if (!user) redirect("/cart"); //metre le bon endroit
// console.log("🚀 ~ CheckoutPage ~ user:", user);
// const cart = await getCart(user?._id);
// console.log("🚀 ~ CheckoutPage ~ cart:", cart);

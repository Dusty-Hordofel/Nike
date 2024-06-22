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
import { saveUserAddress } from "@/actions/user-address.actions";
import { useState } from "react";
import Payment from "@/components/Checkout/payment/Payment";

const DeliveryInfo = ({ cart }: { cart: ICart }) => {
  console.log("🚀 ~ DeliveryInfo ~ Cart:TEST", cart);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  console.log("🚀 ~ SignUp ~ email:", email);

  // const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  // const user = useCurrentUser();
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

  const onSubmit = async (values: DeliveryInfoFormData) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    let save = await saveUserAddress(values);
    console.log("🚀 ~ onSubmit ~ save:", save);
    alert(save);
    // console.log("🚀 ~ SignUp ~ values:", values);
    // await mutateAsync({ ...values, email });
  };

  return (
    <>
      <main className="max-w-[703px] w-[66,67%]">
        <section className="mb5-sm d-lg-h">
          <div className="mr4-sm ml4-sm mb4-sm css-10uhelw"></div>
          <header className="pt5-sm pb3-sm prl5-sm pt3-md u-clearfix">
            <h2 className="fl-sm-l css-1rkogn0">Dans ton panier</h2>
            <button
              aria-label="Dans ton panier"
              className="nds-btn fl-sm-r fs12-sm text-color-primary-dark bg-light-grey css-13eg08n ex41m6f0 cta-primary-dark  btn-responsive"
              type="button"
              aria-expanded="false"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="24px"
                height="24px"
                fill="none"
                data-attr="caretDown"
              >
                <path
                  stroke="currentColor"
                  stroke-width="1.5"
                  d="M18.966 8.476L12 15.443 5.033 8.476"
                ></path>
              </svg>
              <span className="ripple"></span>
            </button>
          </header>
          <div className="mr4-sm ml4-sm mt4-sm css-10uhelw"></div>
        </section>

        <section>
          <div
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
          </div>
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
                  name="region"
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
                  name="phone"
                />
              </div>
              <div className={cn("mt-10 flex justify-end")}>
                <Button isLoading={false}>Enregistrer et continuer</Button>
              </div>
            </form>
          </div>
          {/* <aside className="w-[33,33%] h-[100%] bg-orange">
            <h1>Olivie</h1>
          </aside> */}
        </section>

        <section className="mb5-sm" id="payment">
          {/* sr-only */}
          <span className="">Paiement Étape 2 sur 3 Étape désactivée</span>
          <header className="pt3-sm pb7-sm prl5-sm css-1nytozf">
            <h2 className="css-6ae4md">Paiement</h2>
          </header>
          <div className="mr5-sm ml5-sm css-10uhelw"></div>
          <Payment
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
          />
        </section>

        <section className="mb5-sm" id="orderreview">
          {/* sr-only */}
          <span className="">
            Récapitulatif de la commande Étape 3 sur 3 Étape désactivée
          </span>
          <header className="pt3-sm pb7-sm prl5-sm css-1nytozf">
            <h2 className="css-6ae4md">Récapitulatif de la commande</h2>
          </header>
          <div className="mr5-sm ml5-sm css-10uhelw"></div>
        </section>
      </main>
    </>
  );
};

export default DeliveryInfo;

// const user = await currentUser();
// if (!user) redirect("/cart"); //metre le bon endroit
// console.log("🚀 ~ CheckoutPage ~ user:", user);
// const cart = await getCart(user?._id);
// console.log("🚀 ~ CheckoutPage ~ cart:", cart);

"use client";

import {
  FieldValues,
  useForm,
  SubmitHandler,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { UserAuthInputFieldForm } from "@/components/auth";
import { Button } from "@/components/ui/buttons/button/button";
import { useCurrentUser } from "@/hooks/user/use-current-user";
import {
  DeliveryInfoFormData,
  DeliveryInfoSchema,
} from "@/lib/validations/delivery";
import { ICart } from "@/models/Cart";
import {
  getUserActiveAdress,
  saveUserAddress,
} from "@/actions/user-address.actions";
import { useEffect, useState } from "react";
import CheckoutHeader from "@/components/checkout/checkout-header";
import DeliveryAddressSummary from "./delivery-address-summary";
import DeliveryModeSelector, { DeliveryMode } from "./delivery-mode-selector";
import DeliveryTime from "./delivery-time";
import { useDeliveryContext } from "@/context/DeliveryContext";
import Loader from "../../loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetActiveAddress } from "@/hooks/api/use-get-active-address";
import { ZodError } from "zod";

// { deliveryAddress }: any

const DeliverySection2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;

  const [refresh, setRefresh] = useState(false);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [selectedMode, setSelectedMode] = useState<DeliveryMode>(
    DeliveryMode.Shipping
  );

  const user = useCurrentUser();
  const { deliveryStep, setDeliveryStep, setActiveSection } =
    useDeliveryContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, touchedFields },
    reset,
    getValues,
  } = useForm<DeliveryInfoFormData>({
    resolver: zodResolver(DeliveryInfoSchema),
  });

  const { deliveryAddress, isLoading, isError } = useGetActiveAddress();

  useEffect(() => {
    if (!addingNewAddress) {
      const fetchUserAddress = async () => {
        const response = await getUserActiveAdress();
        const { success, activeAddress } = response;
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
    }
  }, [refresh, reset, addingNewAddress]);

  const handleAddNewAddress = () => {
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
    setAddingNewAddress(true);
    setDeliveryStep(1);
  };

  const mutation = useMutation({
    mutationFn: async (newAddress: DeliveryInfoFormData) => {
      const address = JSON.stringify(newAddress);
      console.log("🚀 ~ mutationFn: ~ address:", address);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/address`,
        {
          method: "POST",
          body: JSON.stringify({
            ...newAddress,
          }),
        }
      );

      console.log("🚀 ~ mutationFn: ~ response:", response);

      // if (!response.ok) {
      //   console.log("🚀 ~ mutationFn: ~ response:", response);
      //   // const errorData = await response.json();
      //   // if (errorData.message instanceof ZodError) {
      //   //   console.log("Zod Error olive", errorData.message);
      //   // }
      //   // throw new Error(errorData.message || "Failed to register");
      // }
      // return response.json();
    },
  });

  const onSubmit: SubmitHandler<DeliveryInfoFormData> = async (values) => {
    // console.log(
    //   "🚀 ~ constonSubmit:SubmitHandler<DeliveryInfoFormData>= ~ values:",
    //   values
    // );
    // let save;
    // save = await mutation.mutateAsync({
    //   ...values,
    //   // _id: deliveryAddress?.activeAddress?._id,
    // });
    // console.log(
    //   "🚀 ~ constonSubmit:SubmitHandler<DeliveryInfoFormData>= ~ SAVE:",
    //   save
    // );
    // let save;
    // if (addingNewAddress) {
    //   save = await mutation.mutateAsync({ ...values });
    // } else {
    //   save = await mutation.mutateAsync({
    //     ...values,
    //     _id: deliveryAddress?.activeAddress?._id,
    //   });
    // }
    // if (save.success) {
    //   setRefresh(!refresh);
    //   setAddingNewAddress(false); // Reset the adding new address state after saving
    //   deliveryAddress?.success && setDeliveryStep(2);
    // }
  };

  if (isLoading) {
    return (
      <section>
        <span className="sr-only">
          Options de livraison Étape 1 sur 3 Étape terminée
        </span>
        <CheckoutHeader title="Options de livraison" />

        <div className="h-[184px] bg-green-100 w-full flex justify-center items-center">
          <Loader />
        </div>
      </section>
    );
  }

  if (isError) {
    return <p>Error...</p>;
  }

  return (
    <section>
      <span className="sr-only">
        Options de livraison Étape 1 sur 3 Étape terminée
      </span>
      <CheckoutHeader
        title="Options de livraison"
        isComplete={
          deliveryStep === 3 && deliveryAddress?.success ? true : false
        }
        onDeliveryStep={setDeliveryStep}
      />

      <DeliveryModeSelector
        selectedMode={selectedMode}
        onSelectMode={setSelectedMode}
      />
      <div>
        <div>
          {(deliveryStep === 2 || deliveryStep === 3) &&
          deliveryAddress?.success ? (
            <>
              <DeliveryAddressSummary
                handleAddNewAddress={handleAddNewAddress}
                deliveryAddress={deliveryAddress}
                deliveryStep={deliveryStep}
                onDeliveryStep={setDeliveryStep}
                onActiveSection={setActiveSection}
              />
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="p-5">
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
              <div className="mt-10 flex justify-end">
                <Button isLoading={false}>Enregistrer et continuer</Button>
              </div>
            </form>
          )}
        </div>
        <DeliveryTime deliveryStep={deliveryStep} />
      </div>

      <div
        className={`shippingContainer py-7 px-5 flex justify-end ${deliveryStep === 2 ? "block " : "hidden"}`}
      >
        <Button
          isLoading={false}
          onClick={() => {
            setDeliveryStep(3);
            setActiveSection("payment");
          }}
        >
          Passer au paiement
        </Button>
      </div>
    </section>
  );
};

export default DeliverySection2;

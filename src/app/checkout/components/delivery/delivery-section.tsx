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
import {
  getUserActiveAdress,
  getUserAdress,
} from "@/actions/user-address.actions";
import { useEffect, useState } from "react";
import CheckoutHeader from "@/components/checkout/checkout-header";
import DeliveryAddressSummary from "./delivery-address-summary";
import DeliveryModeSelector, { DeliveryMode } from "./delivery-mode-selector";
import DeliveryTime from "./delivery-time";
import { useDeliveryContext } from "@/context/DeliveryContext";
import Loader from "../../loader";

import { useActiveDeliveryAddress } from "@/hooks/api/use-active-delivery-address";
import { useSaveDeliveryAddress } from "@/hooks/api/use-save-delivery-address";
import { useUpdateDeliveryAddressStatus } from "@/hooks/api/use-update-delivery-address-status";
import { useGetDeliveryAddresses } from "@/hooks/api/use-get-delivery-adresses";
import { useGetDeliveryAddress } from "@/hooks/api/use-get-delivery-address";

const DeliverySection2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;

  const [refresh, setRefresh] = useState(false);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [addressId, setAddressId] = useState<string | undefined>();

  console.log("🚀 ~ DeliverySection2 ~ addressId:ADDRESS ID", addressId);
  const [selectedMode, setSelectedMode] = useState<DeliveryMode>(
    DeliveryMode.Shipping
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const { activeDeliveryAddress, isLoading, isPending, isError } =
    useActiveDeliveryAddress();
  // const activeDeliveryAddress = useActiveDeliveryAddress();

  const deliveryAddress = useGetDeliveryAddress(addressId);
  const updateDeliveryAddressStatus = useUpdateDeliveryAddressStatus();
  const deliveryAddresses = useGetDeliveryAddresses();
  const saveDeliveryAddress = useSaveDeliveryAddress({ setSuccess, setError });

  useEffect(() => {
    if (addressId !== undefined) {
      const fetchUserAddress = async () => {
        const response = await getUserAdress(addressId);
        console.log("🚀 ~ fetchUserAddress ~ response:VOIR", response);
        const { success, address } = response;
        if (success) {
          reset(address);
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
  }, [addressId, reset, refresh]);

  // useEffect(() => {
  //   if (!addingNewAddress) {
  //     const fetchUserAddress = async () => {
  //       const response = await getUserActiveAdress();
  //       const { success, activeAddress } = response;
  //       if (success) {
  //         reset(activeAddress);
  //       } else {
  //         reset({
  //           lastName: "",
  //           firstName: "",
  //           country: "",
  //           address: "",
  //           phoneNumber: "",
  //           email: "",
  //           companyInfo: "",
  //           city: "",
  //           postalCode: "",
  //         });
  //       }
  //     };
  //     fetchUserAddress();
  //   }
  // }, [refresh, reset, addingNewAddress]);
  // useEffect(() => {
  //   if (!addingNewAddress) {
  //     const fetchUserAddress = async () => {
  //       const response = await getUserActiveAdress();
  //       const { success, activeAddress } = response;
  //       if (success) {
  //         reset(activeAddress);
  //       } else {
  //         reset({
  //           lastName: "",
  //           firstName: "",
  //           country: "",
  //           address: "",
  //           phoneNumber: "",
  //           email: "",
  //           companyInfo: "",
  //           city: "",
  //           postalCode: "",
  //         });
  //       }
  //     };
  //     fetchUserAddress();
  //   }
  // }, [refresh, reset, addingNewAddress]);

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

  const handleSetActiveAddress = async (id: string) => {
    await updateDeliveryAddressStatus.mutateAsync(id);
  };

  const onSubmit: SubmitHandler<DeliveryInfoFormData> = async (values) => {
    let save;
    if (addingNewAddress) {
      save = await saveDeliveryAddress.mutateAsync({
        ...values,
      });
    } else {
      save = await saveDeliveryAddress.mutateAsync({
        ...values,
        _id: addressId,
        // _id: activeDeliveryAddress?.activeAddress?._id,
      });
    }
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<DeliveryInfoFormData>= ~ save:",
      save
    );
    if (save.success) {
      setRefresh(!refresh);
      setAddingNewAddress(false); // Reset the adding new address state after saving
      activeDeliveryAddress?.success && setDeliveryStep(2);
    }

    // revalidatePath("/checkout");
    // let save;
    // if (addingNewAddress) {
    //   save = await saveDeliveryAddress({
    //     ...values,
    //   });
    // } else {
    //   save = await saveDeliveryAddress({
    //     ...values,
    //     _id: activeDeliveryAddress?.activeAddress?._id,
    //   });
    // }
    // if (save.success) {
    //   setRefresh(!refresh);
    //   setAddingNewAddress(false); // Reset the adding new address state after saving
    //   activeDeliveryAddress?.success && setDeliveryStep(2);
    // }
  };

  if (isLoading || deliveryAddresses.isLoading || deliveryAddress.isLoading)
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
  if (isError || deliveryAddresses.isError || deliveryAddress.isError)
    return <p>Error...</p>;

  // console.log("163", activeDeliveryAddress?.success);

  return (
    <section>
      <span className="sr-only">
        Options de livraison Étape 1 sur 3 Étape terminée
      </span>
      <CheckoutHeader
        title="Options de livraison"
        isComplete={
          deliveryStep === 3 && activeDeliveryAddress?.success ? true : false
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
          activeDeliveryAddress?.success ? (
            <>
              <DeliveryAddressSummary
                activeDeliveryAddress={activeDeliveryAddress}
                deliveryStep={deliveryStep}
                deliveryAddresses={deliveryAddresses}
                onAddressId={setAddressId}
                onDeliveryStep={setDeliveryStep}
                onActiveSection={setActiveSection}
                handleAddNewAddress={handleAddNewAddress}
                handleSetActiveAddress={handleSetActiveAddress}
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

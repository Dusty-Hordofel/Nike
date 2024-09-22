"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/buttons/button/button";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user";
import {
  DeliveryInfoFormData,
  DeliveryInfoSchema,
} from "@/lib/validations/delivery";
import { useEffect, useState } from "react";
import CheckoutHeader from "@/components/client/checkout/checkout-section-title";
import DeliveryAddressSummary from "./delivery-address-summary";
import DeliveryModeSelector, { DeliveryMode } from "./delivery-mode-selector";
import DeliveryTime from "./delivery-time";
import { useDeliveryContext } from "@/context/checkout/delivery-context";
import CheckoutSectionHeader from "../checkout-section-header";
import DeliveryFormElements from "./delivery-form-elements";
import {
  useActiveDeliveryAddress,
  useAddDeliveryAddress,
  useGetDeliveryAddress,
  useGetDeliveryAddresses,
  useUpdateDeliveryAddressStatus,
} from "@/hooks/user/delivery-section";
import { useQueryClient } from "@tanstack/react-query";

const DeliverySection2 = ({
  deliveryAddress,
  currentCheckoutSection,
  setCurrentCheckoutSection,
}: any) => {
  // console.log(
  //   "🚀 ~ DeliverySection2 ~ deliveryAddress:ACTIVE",
  //   deliveryAddress.activeDeliveryAddress.activeAddress
  // );
  // console.log(
  //   "🚀 ~ DeliverySection2 ~ deliveryAddress:ACTIVE SUCCESS",
  //   deliveryAddress.activeDeliveryAddress.success
  // );
  // console.log(
  //   "🚀 ~ DeliverySection2 ~ deliveryAddress:ACTIVE SUCCESS TSQ",
  //   deliveryAddress.isSuccess
  // );
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const queryClient = useQueryClient();

  const [refresh, setRefresh] = useState(false);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [addressId, setAddressId] = useState<string | undefined>();

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
    formState: { errors },
    reset,
  } = useForm<DeliveryInfoFormData>({
    resolver: zodResolver(DeliveryInfoSchema),
  });

  // const { activeDeliveryAddress, isLoading, isPending, isError } =
  //   useActiveDeliveryAddress();

  // const deliveryAddress = useGetDeliveryAddress(addressId);
  const updateDeliveryAddressStatus = useUpdateDeliveryAddressStatus();
  const deliveryAddresses = useGetDeliveryAddresses();
  const saveDeliveryAddress = useAddDeliveryAddress({ setSuccess, setError });

  useEffect(() => {
    if (
      deliveryAddress.isSuccess &&
      deliveryAddress.activeDeliveryAddress.success
    ) {
      setDeliveryStep(3);
      setActiveSection("payment");
      reset(deliveryAddress.activeDeliveryAddress.activeAddress);
    }
  }, [deliveryAddress.isSuccess, deliveryAddress.activeDeliveryAddress]);

  useEffect(() => {
    if (
      deliveryAddress.isError ||
      (deliveryAddress.isSuccess &&
        !deliveryAddress.activeDeliveryAddress.success)
    ) {
      setDeliveryStep(1);
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
  }, [
    deliveryAddress.isError,
    deliveryAddress.isSuccess,
    deliveryAddress.data,
  ]);

  // useEffect(() => {
  //   if (addressId !== undefined) {
  //     const fetchUserAddress = async () => {
  //       const response = await getUserAdress(addressId);
  //       console.log("🚀 ~ fetchUserAddress ~ response:VOIR", response);
  //       const { success, address } = response;
  //       if (success) {
  //         reset(address);
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
  // }, [addressId, reset, refresh]);

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
      });
    }

    if (save.success) {
      setRefresh(!refresh);
      setAddingNewAddress(false); // Reset the adding new address state after saving
      deliveryAddress.activeDeliveryAddress?.success && setDeliveryStep(2);
    }
  };

  if (
    // deliveryAddress.isLoading ||
    deliveryAddresses.isLoading
    // || deliveryAddress.isLoading
  )
    return (
      <CheckoutSectionHeader title="Options de livraison" step={deliveryStep} />
    );

  if (
    // deliveryAddress.isError ||
    deliveryAddresses.isError
    // || deliveryAddress.isError
  )
    return <p>Error...</p>;

  // console.log("🚀 ~ DeliverySection2 ~ setDeliveryStep:DEV STEP", deliveryStep);

  return (
    <section>
      <span className="sr-only">
        Options de livraison Étape 1 sur 3 Étape terminée
      </span>
      <CheckoutHeader
        title="Options de livraison"
        isComplete={
          deliveryStep === 3 && deliveryAddress.activeDeliveryAddress?.success
            ? true
            : false
        }
        onChangeStep={() => setDeliveryStep(2)}
      />

      <DeliveryModeSelector
        selectedMode={selectedMode}
        onSelectMode={setSelectedMode}
      />
      <div>
        <div>
          {(deliveryStep === 2 || deliveryStep === 3) &&
          deliveryAddress.activeDeliveryAddress?.success ? (
            <>
              <DeliveryAddressSummary
                activeDeliveryAddress={deliveryAddress.activeDeliveryAddress}
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
              <DeliveryFormElements register={register} errors={errors} />
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
            queryClient.invalidateQueries({ queryKey: ["active-address"] });
            window.scrollTo({
              top: 0,
              behavior: "smooth", // pour un scroll fluide
            });
          }}
        >
          Passer au paiement
        </Button>
      </div>
    </section>
  );
};

export default DeliverySection2;

import { UserAuthInputFieldForm } from "@/components/common/auth";
import { Button } from "@/components/ui/buttons/button/button";
import { DeliveryInfoFormData } from "../../../../schemas/checkout/delivery.schema";
import { FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";

type DeliveryFormProps = {
  register: UseFormRegister<{
    email: string;
    address: string;
    lastName: string;
    firstName: string;
    postalCode: string;
    city: string;
    country: string;
    phoneNumber: string;
    _id?: string | undefined;
    companyInfo?: string | undefined;
  }>;
  errors: FieldErrors<DeliveryInfoFormData>;
};

const DeliveryFormElements = ({ register, errors }: DeliveryFormProps) => {
  return (
    <>
      <div className="flex gap-4 justify-between">
        <UserAuthInputFieldForm
          id="text"
          label="text"
          placeholder="FirstName*"
          type="text"
          isLoading={false}
          // isLoading={isPending}
          register={register}
          errors={errors}
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
      {/* <div className="mt-10 flex justify-end">
        <Button isLoading={false}>Enregistrer et continuer</Button>
      </div> */}
    </>
  );
};

export default DeliveryFormElements;

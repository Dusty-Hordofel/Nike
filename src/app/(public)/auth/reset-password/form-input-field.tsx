import React from "react";
import { useForm, FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Définir les types personnalisés pour les données du formulaire
// interface FormData {
//   password: string;
//   email: string;
//   //   number: string;
// }

// Définir un type pour les erreurs de champ avec des propriétés obligatoires
type CustomFieldErrors = {
  password: { message: string };
  text: { message: string };
  number: { message: string };
};

// Interface pour les propriétés du composant FormInputField
interface FormInputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  isLoading: boolean;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  //   errors: FieldErrors<FormData> & CustomFieldErrors;
  name: keyof FormData;
}

export const userLoginEmailSchema = z.object({
  email: z.string().email({
    message: "Obligatoire",
  }),
  password: z.string().min(3, "Obligatoire"),
});

export type FormData = z.infer<typeof userLoginEmailSchema>;

export const FormInputField = ({
  id,
  label,
  placeholder,
  type,
  isLoading,
  register,
  errors,
  name,
}: FormInputFieldProps) => {
  const error = errors[name];
  const errorMessage = error ? (error.message as string) : "";

  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        autoCapitalize="none"
        autoComplete={type}
        autoCorrect="off"
        disabled={isLoading}
        {...register(name)}
        className="p-4 rounded-lg h-14 focus:outline-none"
      />
      {error && (
        <p className="px-4 pt-[6px] text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userLoginEmailSchema) });
  const isLoading = false; // Remplacez par votre logique d'état de chargement

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        id="password"
        label="Password"
        placeholder="Password*"
        type="password"
        isLoading={isLoading}
        register={register}
        errors={errors as FieldErrors<FormData>}
        name="password"
      />
      <FormInputField
        id="text"
        label="Text"
        placeholder="Text*"
        type="email"
        isLoading={isLoading}
        register={register}
        errors={errors as FieldErrors<FormData>}
        name="email"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

// import { Input } from "@/components/ui/input";
// import { FieldErrors, UseFormRegister } from "react-hook-form";

// interface FormInputFieldProps {
//   id: string;
//   label: string;
//   placeholder: string;
//   type: string;
//   isLoading: boolean;
//   register: UseFormRegister<any>;
//   errors: FieldErrors<any>;
//   name: string;
// }

// const FormInputField = ({
//   id,
//   label,
//   placeholder,
//   type,
//   isLoading,
//   register,
//   errors,
//   name,
// }: FormInputFieldProps) => {
//   const error = errors?.[name];
//   const errorMessage = error ? (error.message as string) : "";

//   return (
//     <div>
//       <label className="sr-only" htmlFor={id}>
//         {label}
//       </label>
//       <Input
//         id={id}
//         placeholder={placeholder}
//         type={type}
//         autoCapitalize="none"
//         autoComplete={type}
//         autoCorrect="off"
//         disabled={isLoading}
//         {...register(name)}
//         className="p-4 rounded-lg h-14 focus:outline-none"
//       />
//       {error && (
//         <p className="px-4 pt-[6px] text-xs text-red-600">{errorMessage}</p>
//       )}
//     </div>
//   );
// };

// export default FormInputField;

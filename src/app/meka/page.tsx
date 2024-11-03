// "use client";

// // import * as React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldErrors, useForm } from "react-hook-form";
// import {
//   EmailFormData,
//   PasswordFormData,
//   EmailSchema,
//   PasswordSchema,
//   OptionFormData,
//   OptionSchema,
//   TestFormData,
//   TestSchema,
// } from "@/lib/validations/auth";
// import { cn } from "@/lib/utils";
// import {
//   UserSelectCountry,
//   UserLoginFooterForm,
//   UserLoginForgotPasswordLink,
//   UserLoginTerms,
// } from "@/components/auth/login";
// import { UserAuthHeaderForm, UserAuthInputFieldForm } from "@/components/auth";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useRef, useState } from "react";

// import { CircleAlert } from "lucide-react";

// import { signIn, useSession } from "next-auth/react";
// import { useCurrentUser } from "@/hooks/user/use-current-user";
// import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
// import ShoppingPreference from "../(public)/auth/register/shopping-preference";
// import * as z from "zod";
// import { Button } from "@/components/ui/buttons/button/button";
// import { FileIcon } from "lucide-react";
// import { useFileContext } from "@/context/file/file-context";

// const countries = [
//   { id: "1", label: "France", value: "fr" },
//   { id: "2", label: "Canada", value: "ca" },
//   { id: "3", label: "Japon", value: "jp" },
// ];
// const options = [
//   { id: "1", label: "Homme", value: "homme" },
//   { id: "2", label: "Femme", value: "femme" },
// ];

// const products = [
//   { id: "1", label: "Produit A", value: "prodA" },
//   { id: "2", label: "Produit B", value: "prodB" },
//   { id: "3", label: "Produit C", value: "prodC" },
// ];

// const schema = z.object({
//   shoppingPreference: z
//     .string()
//     .refine((value) => ["homme", "femme"].includes(value), {
//       message: "Required",
//     }),
// });

// const MekaPage = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [isEmailLoading, setIsEmailLoading] = useState(false);
//   const [isPasswordLoading, setIsPasswordLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formStep, setFormStep] = useState(0);

//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];

//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setPreviewUrl(imageUrl);
//       setValue("file", event.target.files);
//       clearErrors("file");
//     } else {
//       setPreviewUrl(null);
//       setValue("file", null);
//       clearErrors("file");
//     }
//   };

//   // const { handleFileChange, handleButtonClick, previewUrl, fileInputRef } =
//   //   useFileContext();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     clearErrors,
//   } = useForm<TestFormData>({
//     resolver: zodResolver(TestSchema),
//   });

//   const onSubmit = async (data: TestFormData) => {
//     console.log("🚀 ~ onSubmit ~ data:", data);
//   };

//   return (
//     <div className="flex justify-center p-5 min-h-screen">
//       <div className="flex flex-col justify-center max-w-[532px] w-full px-9 max-h-[569px] h-full">
//         <UserAuthHeaderForm
//           ariaLabel={
//             formStep === 0
//               ? "Enter your email to join us or sign in."
//               : "Enter your email to password us or sign in."
//           }
//           title={
//             formStep === 0
//               ? "Enter your email to join us or sign in."
//               : "What's your password?"
//           }
//         />

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div
//             className={cn(
//               ` h-11 bg-gray-100 py-3 px-4 mb-5 items-center gap-x-4 rounded-md ${formStep === 1 && error.length > 0 ? "flex" : "hidden"}`
//             )}
//           >
//             <CircleAlert color="#ee0005" />
//             <p>{error.length > 0 && error}</p>
//           </div>

//           <DynamicFormField
//             inputType="input"
//             label="LastName"
//             name="lastName"
//             register={register}
//             errors={errors}
//             inputProps={{
//               type: "text",
//               placeholder: "LastName*",
//               disabled: false,
//             }}
//           />
//           <DynamicFormField
//             inputType="input"
//             label="Email"
//             name="email"
//             register={register}
//             errors={errors}
//             inputProps={{
//               type: "text",
//               placeholder: "Email*",
//               disabled: false,
//             }}
//           />
//           <DynamicFormField
//             inputType="textarea"
//             label="Desctiption"
//             name="description"
//             register={register}
//             errors={errors}
//             textareaProps={{
//               placeholder: "Description*",
//               disabled: false,
//               rows: 5,
//             }}
//           />

//           <DynamicFormField
//             inputType="select"
//             label="Préférence d'achat"
//             register={register}
//             errors={errors}
//             name="shoppingPreference"
//             selectProps={{
//               disabled: false,
//             }}
//             options={options}
//           />

//           <DynamicFormField
//             inputType="file"
//             label="Profile Picture"
//             name="file"
//             register={register}
//             errors={errors}
//             onFileChange={handleFileChange}
//             onButtonClick={handleButtonClick}
//             fileProps={{
//               previewUrl,
//               fileInputRef: fileInputRef,
//               disabled: false,
//             }}
//           />

//           {formStep === 0 ? (
//             <UserLoginTerms />
//           ) : (
//             <UserLoginForgotPasswordLink />
//           )}

//           <UserLoginFooterForm
//             formCurrentStep={formStep}
//             isEmailLoading={isEmailLoading}
//             isPasswordLoading={isPasswordLoading}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MekaPage;

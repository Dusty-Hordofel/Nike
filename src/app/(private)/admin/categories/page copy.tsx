"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "@/lib/validations/auth";
import { UserAuthHeaderForm } from "@/components/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn, useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/user/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/modals/modal";
import { Button } from "@/components/ui/buttons/button/button";
import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
import useAdminCreateCategory from "@/hooks/api/admin/categories/use-admin-create-category";
import { useFileContext } from "@/context/file/file-context";

const CategoriesPage = () => {
  const router = useRouter();
  const user = useCurrentUser();

  if (!user /*&& userRole !== "user"*/) {
    router.push(`${window.location.origin}` || "/");
  }

  const [formCurrentStep, setFormCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    clearErrors,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
  });

  const {
    showCreateModal,
    closeCreateModal,
    showResultModal,
    closeResultModal,
    resultModalContent,
    setResultModalContent,
    isCreateModalOpen,
    isResultModalOpen,
  } = useModal();

  const {
    handleFileChange,
    handleButtonClick,
    previewUrl,
    fileInputRef,
    uploadImageToCloudinary,
    picture,
  } = useFileContext();

  const createCategory = useAdminCreateCategory();

  const onSubmit = async ({ category, file }: CategoryFormData) => {
    console.log("🚀 ~ onSubmit ~ category:", category, file, picture);

    // try {
    //   // if (!picture) {
    //   //   return handleError(setError, "Please provide a picture");
    //   // }
    //   const uploadedImage = await uploadImageToCloudinary();
    //   console.log("🚀 ~ onSubmit ~ uploadedImage:", uploadedImage);
    // } catch (error) {
    //   console.log("🚀 ~ onSubmit ~ error:", error);
    // }
    // const uploadedImage = await uploadImageToCloudinary();
    // console.log("🚀 ~ onSubmit ~ file:CAT", file, category);

    // if (!picture) {
    //   return handleError(setError, "Please provide a picture");
    // }

    const uploadedImage = await uploadImageToCloudinary();
    console.log("🚀 ~ onSubmit ~ uploadedImage:", uploadedImage);

    const newCategory = await createCategory.mutateAsync({
      name: category,
      image: uploadedImage.secure_url,
    });
    console.log("🚀 ~ onSubmit ~ newCategory:CATE", newCategory);
    if (newCategory.success) {
      handleCloseModal();
      setResultModalContent({ success: true, message: newCategory.message });
      showResultModal();
    } else {
      setResultModalContent({
        success: false,
        message: `An error occurred: ${newCategory.message}`,
      });
      handleCloseModal();
      showResultModal();
    }
  };

  // async function onSubmit(data: ProductFormData) {
  //   try {
  //     resetMessages(setError, setSuccess);

  //     if (!picture) {
  //       return handleError(setError, "Please provide a picture");
  //     }

  //     const uploadedImage = await uploadImage();
  //     console.log("🚀 ~ onSubmit ~ uploadedImage:", uploadedImage);

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ ...data, image: uploadedImage.secure_url }),
  //         credentials: "include",
  //       }
  //     );

  //     await handleResponse(response);
  //   } catch (error) {
  //     console.error("🚀 ~ onSubmit ~ error:", error);
  //     handleError(setError, "An error occurred while submitting the form.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // const handleFileChange = (files: FileList | null) => {
  //   form.setValue("file", files);
  //   if (files && files[0]) {
  //     const file = files[0];
  //     setPicture(file); // Generate a URL for the selected image
  //     setPreviewUrl(URL.createObjectURL(file)); // Generate a URL for the selected image
  //   } else {
  //     setPreviewUrl(null);
  //   }
  // };

  // async function handleResponse(response: any) {
  //   const result = await response.json();
  //   console.log("🚀 ~ handleResponse ~ result:", result);

  //   if (!response.ok) {
  //     return handleError(setError, getErrorMessage(result));
  //   }

  //   setSuccess(successMessage);
  //   form.reset();
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  //   setPreviewUrl(null);
  //   alert("Le Produit a été créé avec succès");
  // }

  const handleCloseModal = () => {
    reset();
    closeCreateModal();
  };

  return (
    <div>
      {isCreateModalOpen && (
        <Modal title="Create a New Category" onCloseModal={handleCloseModal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DynamicFormField
              inputType="input"
              label="Category"
              name="category"
              register={register}
              errors={errors}
              inputProps={{
                type: "text",
                placeholder: "Category*",
                disabled: createCategory.isPending,
              }}
            />

            <DynamicFormField
              inputType="file"
              label="Profile Picture"
              name="file"
              register={register}
              errors={errors}
              onFileChange={(event) =>
                handleFileChange(event, setValue, clearErrors)
              }
              onButtonClick={handleButtonClick}
              fileProps={{
                previewUrl,
                fileInputRef: fileInputRef,
                disabled: false,
              }}
            />

            <div className="flex gap-x-3 justify-end mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button aria-label="OK" type="submit">
                Create
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {isResultModalOpen && resultModalContent && (
        <Modal
          title={resultModalContent.success ? "Success" : "Error"}
          onCloseModal={closeResultModal}
        >
          <p className="mb-4">{resultModalContent.message}</p>
        </Modal>
      )}

      <div data-testid="interests-layout" className="grid grid-cols-3 gap-x-4">
        <button
          onClick={showCreateModal}
          type="button"
          className=" w-full aspect-square bg-gray-200 flex justify-center items-center flex-col gap-y-4 group"
        >
          <svg
            className="group-hover:scale-125 transition-all"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            role="img"
            width="24px"
            height="24px"
            fill="none"
          >
            <path
              stroke="currentColor"
              stroke-width="1.5"
              d="M12 6v12m6-6H6m15.75 0c0 5.39-4.36 9.75-9.75 9.75S2.25 17.39 2.25 12 6.61 2.25 12 2.25s9.75 4.36 9.75 9.75z"
            ></path>
          </svg>
          <span className="text-2xl font-medium group-hover:scale-125 transition-all">
            Ajouter des produits
          </span>
        </button>
        <div className="bg-red-200  w-full aspect-square">
          <h1>MOMO</h1>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/user/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/modals/modal";
import { Button } from "@/components/ui/buttons/button/button";
import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
import useAdminCreateCategory from "@/hooks/api/admin/categories/use-admin-create-category";
import { useFileContext } from "@/context/file/file-context";
import { useAdminGetCategories } from "@/hooks/api/admin/categories/use-admin-get-categories";
import Loader from "@/components/loader";

const CategoriesPage = () => {
  const router = useRouter();
  const user = useCurrentUser();

  if (!user /*&& userRole !== "user"*/) {
    router.push(`${window.location.origin}` || "/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    setPreviewUrl,
    setPicture,
  } = useFileContext();

  const createCategory = useAdminCreateCategory();
  const categories = useAdminGetCategories();
  console.log("🚀 ~ CategoriesPage ~ categories:", categories);

  const onSubmit = async ({ category }: CategoryFormData) => {
    const uploadedImage = await uploadImageToCloudinary();

    const newCategory = await createCategory.mutateAsync({
      name: category,
      image: uploadedImage.secure_url,
    });

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

  const handleCloseModal = () => {
    reset();
    setPreviewUrl(null);
    setPicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    closeCreateModal();
  };

  if (categories.isLoading)
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );

  if (categories.isError)
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {categories.error?.message}</h1>
        </div>
      </div>
    );

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

      <div data-testid="interests-layout" className="grid grid-cols-3 gap-4">
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
        {categories.data.map((category: any) => (
          <div
            className="bg-gray-200 w-full aspect-square flex justify-center items-center group cursor-pointer"
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${category.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-2xl text-white  font-medium group-hover:scale-125 text-shadow">
              {category.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "@/lib/validations/auth";
import { usePathname, useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/user/use-current-user";
import { useModal } from "@/context/modal/modal-context";
import Modal from "@/components/modals/modal";
import { Button } from "@/components/ui/buttons/button/button";
import DynamicFormField from "@/components/forms/dynamic-form-field/dynamic-form-field";
import useAdminCreateCategory from "@/hooks/api/admin/categories/use-admin-create-category";
import { useFileContext } from "@/context/file/file-context";
import { useAdminGetCategories } from "@/hooks/api/admin/categories/use-admin-get-categories";
import Loader from "@/components/loader";
import ItemCard from "../item-card";
import AddItemButton from "../add-Item-button";
import { useEffect } from "react";
import useAdminUpdateCategory from "@/hooks/api/admin/categories/use-admin-update-category";
// import { ObjectId } from "mongodb";

const CategoriesPage = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const pathname = usePathname();

  const activePage = pathname.split("/")[2] || "";
  const entity = activeEntity(activePage);
  // console.log("🚀 ~ CategoriesPage ~ entity:ENTITY", entity);

  function activeEntity(activePage: string) {
    switch (activePage) {
      case "categories":
        return "category";
      case "subCategories":
        return "subcategory";
      case "products":
        return "product";
      default:
        return "";
    }
  }

  // console.log("🚀 ~ CategoriesPage ~ activePage:", activePage);

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
    isUpdateModalOpen,
    setUpdateModalOpen,
    entityToEdit,
    setEntityToEdit,
    openUpdateModal,
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

  useEffect(() => {
    if (entityToEdit) {
      setValue("category", entityToEdit.name); // Mettre à jour le champ 'category' avec la nouvelle valeur
      setPreviewUrl(entityToEdit.image); // Mettre à jour l'image de prévisualisation si nécessaire
    }
  }, [entityToEdit, setValue, setPreviewUrl]);

  console.log("🚀 ~ CategoriesPage ~ entityToEdit:CONTENT", entityToEdit);

  const createCategory = useAdminCreateCategory();
  const updateCategory = useAdminUpdateCategory();
  const categories = useAdminGetCategories();

  const handleModalClose = (isUpdate = false) => {
    reset();
    setPreviewUrl(null);
    setPicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    isUpdate ? setUpdateModalOpen(false) : closeCreateModal();
  };

  const handleResponse = (response: any, isUpdate = false) => {
    if (response.success) {
      handleModalClose(isUpdate);
      setResultModalContent({ success: true, message: response.message });
    } else {
      setResultModalContent({
        success: false,
        message: `An error occurred: ${response.message}`,
      });
      handleModalClose(isUpdate);
    }
  };

  const handleImageUpload = async (file: any) => {
    if (file && file.length > 0) {
      const uploadedImage = await uploadImageToCloudinary();
      return uploadedImage.secure_url; // Retourne l'URL de l'image
    }
    return ""; // Retourne une chaîne vide si aucune image n'est fournie
  };

  const onSubmit = async ({ category, file }: CategoryFormData) => {
    const imageUrl = await handleImageUpload(file);
    const newCategory = await createCategory.mutateAsync({
      name: category,
      image: imageUrl,
    });
    handleResponse(newCategory);
  };

  const onUpdateSubmit = async ({ category, file }: CategoryFormData) => {
    if (!entityToEdit) return;

    const imageUrl = (await handleImageUpload(file)) || entityToEdit.image;
    const updatedCategory = await updateCategory.mutateAsync({
      id: entityToEdit.id,
      name: category,
      image: imageUrl,
    });
    handleResponse(updatedCategory, true);
  };

  // const onSubmit = async ({ category, file }: CategoryFormData) => {
  //   // const uploadedImage = await uploadImageToCloudinary();

  //   let imageUrl = "";

  //   // const uploadedImage = await uploadImageToCloudinary();

  //   if (file && file.length > 0) {
  //     const uploadedImage = await uploadImageToCloudinary();
  //     imageUrl = uploadedImage.secure_url; // Mettez à jour avec la nouvelle image
  //   }

  //   const newCategory = await createCategory.mutateAsync({
  //     name: category,
  //     image: imageUrl,
  //   });

  //   if (newCategory.success) {
  //     handleCloseModal();
  //     setResultModalContent({ success: true, message: newCategory.message });
  //     showResultModal();
  //   } else {
  //     setResultModalContent({
  //       success: false,
  //       message: `An error occurred: ${newCategory.message}`,
  //     });
  //     handleCloseModal();
  //     showResultModal();
  //   }
  // };

  // const onUpdateSubmit = async ({ category, file }: CategoryFormData) => {
  //   if (!entityToEdit) return;
  //   let imageUrl = entityToEdit.image;

  //   if (file && file.length > 0) {
  //     const uploadedImage = await uploadImageToCloudinary();
  //     imageUrl = uploadedImage.secure_url; // Mettez à jour avec la nouvelle image
  //   }

  //   const updatedCategory = await updateCategory.mutateAsync({
  //     id: entityToEdit.id,
  //     name: category,
  //     image: imageUrl,
  //   });

  //   if (updatedCategory.success) {
  //     handleCloseUpdateModal();
  //     setResultModalContent({
  //       success: true,
  //       message: updatedCategory.message,
  //     });
  //     showResultModal();
  //   } else {
  //     setResultModalContent({
  //       success: false,
  //       message: `An error occurred: ${updatedCategory.message}`,
  //     });
  //     handleCloseUpdateModal();
  //     showResultModal();
  //   }
  // };

  // const handleCloseModal = () => {
  //   reset();
  //   setPreviewUrl(null);
  //   setPicture(null);
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  //   closeCreateModal();
  // };
  // const handleCloseUpdateModal = () => {
  //   reset();
  //   setPreviewUrl(null);
  //   setPicture(null);
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  //   setUpdateModalOpen(false);
  // };

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
        <Modal title={`Create your ${entity}`} onCloseModal={handleModalClose}>
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
                onClick={handleModalClose}
                // handleModalClose
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

      {isUpdateModalOpen && (
        <Modal
          title={`Update your ${entity}`}
          onCloseModal={() => setUpdateModalOpen(false)}
        >
          <form onSubmit={handleSubmit(onUpdateSubmit)}>
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
                // value: entityToEdit?.name,
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
                onClick={() => setUpdateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button aria-label="OK" type="submit">
                Save
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
        <AddItemButton onClick={showCreateModal} label="Add un category" />

        {categories.data.map(
          (category: { _id: string; name: string; image: string }) => (
            <ItemCard
              key={category._id}
              image={category.image}
              name={category.name}
              onClick={() =>
                openUpdateModal({
                  id: category._id,
                  name: category.name,
                  image: category.image,
                })
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;

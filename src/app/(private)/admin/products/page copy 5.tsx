"use client";
import { Item } from "@/@types/admin/admin.item.interface";
import Colors from "@/components/admin/colors/colors";
import { Button } from "@/components/ui/buttons/button/button";
import DynamicFormField from "@/components/ui/forms/dynamic-form-field/dynamic-form-field";
import FileUpload from "@/components/ui/forms/dynamic-form-field/file-upload";
import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modals/modal";
import { useModal } from "@/context/modal/modal-context";
import { useAdminGetCategories } from "@/hooks/admin/use-admin-categories.hook";
import { useGetSubCategoriesByParent } from "@/hooks/admin/use-admin-subcategories.hook";
import { cn } from "@/lib/utils";
import {
  SubCategorySchema,
  SubCategoryFormData,
  ProductFormData,
  ProductSchema,
} from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};

const PageProducts = (props: Props) => {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    Item[] | [] | undefined
  >([]);

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[] | null>(null); // État pour
  const categories = useAdminGetCategories();
  const allSubCategories = useGetSubCategoriesByParent(selectedCategory, true);

  console.log("🚀 ~ PageProducts ~ selectedCategory:CAT", selectedCategory);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
    clearErrors,
    getValues,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
  });

  const {
    entityToEdit,
    isCreateModalOpen,
    isResultModalOpen,
    isUpdateModalOpen,
    showCreateModal,
    showResultModal,
    showUpdateModal,
    closeCreateModal,
    closeResultModal,
    setUpdateModalOpen,
    setResultModalContent,
    resultModalContent,
  } = useModal();

  const handleModalClose = (isUpdate = false) => {
    reset();
    setPreviewUrls([]);
    // setPicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    isUpdate ? setUpdateModalOpen(false) : closeCreateModal();
  };

  if (categories.isLoading)
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );

  if (categories.isError) {
    // console.log("Error", subCategories.error);
    return (
      <div className="max-w-[1090px] px-[6px]  mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {categories.error?.message}</h1>
        </div>
      </div>
    );
  }

  const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
    try {
      const urls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUD_SECRET as string
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        const data = await response.json();
        urls.push(data.secure_url);
      }

      return urls;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<ProductFormData>= ~ data:",
      data
    );
    // try {
    //   const imageUrls = await uploadImagesToCloudinary(data.images);
    //   console.log("Uploaded Image URLs:CLOUDINARY IMAGES", imageUrls);

    //   // Envoyer imageUrls au backend
    //   // await yourBackendService.uploadImages(imageUrls);
    // } catch (error) {
    //   console.error("Error uploading images:", error);
    // }
  };

  // const handleFileChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   setValue: UseFormSetValue<any>,
  //   clearErrors: UseFormClearErrors<any>
  // ) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setPreviewUrls(imageUrl); // Prévisualisation de l'image sélectionnée
  //     setPicture(file); // Enregistrement du fichier dans l'état
  //     setValue("file", event.target.files); // Mise à jour du champ "file"
  //     clearErrors("file"); // Effacer les erreurs liées au fichier
  //   } else {
  //     setPreviewUrls(null); // Aucune image à afficher
  //     setPicture(null); // Aucun fichier sélectionné
  //     setValue("file", null); // Réinitialisation du champ "file"
  //     clearErrors("file"); // Effacer les erreurs
  //   }

  const handleImageChange = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      const filesArray = Array.from(files); // Convertir FileList en tableau
      const imagesUrl = filesArray.map((file) => URL.createObjectURL(file));
      setValue("images", filesArray);
      clearErrors("images");
      setPreviewUrls(imagesUrl);
    } else {
      setPreviewUrls([]);
      setValue("images", []);
      clearErrors("images");
    }
  };

  return (
    <Modal
      title="Create your subcategory"
      onCloseModal={() => {
        handleModalClose();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-h-[500px] overflow-y-auto scrollbar-hidden">
          <div className="flex flex-col">
            <div
              className={cn(
                "w-full  rounded-lg border-default border focus:outline-none transition-all flex justify-between relative gap-x-2 bg-green-400 cursor-pointer",
                errors.category ? "text-red-600" : "text-black-200"
              )}
            >
              <label className="sr-only" htmlFor="select-category">
                Category
              </label>
              <select
                id="select-category"
                {...register("category")}
                className=" bg-clear z-10 focus:outline-none  bg-info py-4 pr-4 pl-3 w-full"
                onChange={async (e) => {
                  const value = e.target.value;
                  setSelectedCategory(value);
                  setValue("category", value);
                  setValue("subcategories", []);
                  clearErrors("subcategories");

                  await trigger(["category", "subcategories"]);
                }}
              >
                <option value="">Select a category</option>
                {categories.data?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6">
              {errors.category && (
                <p className="px-4 pt-[6px] text-xs text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className={cn(
                "w-full py-4 pr-4 pl-3 rounded-lg border-default border focus:outline-none transition-all flex justify-between relative gap-x-2 bg-green-400 cursor-pointer",
                errors.subcategories ? "text-red-600" : "text-black-200"
              )}
            >
              {/* <label htmlFor="checkbox-subcategories">Subcategory</label> */}
              <div className="flex gap-5">
                {allSubCategories.data && allSubCategories.data.length > 0 ? (
                  allSubCategories.data.map((subCategory) => (
                    <div key={subCategory._id}>
                      <label className="flex items-center gap-x-2">
                        <input
                          id="checkbox-subcategories"
                          type="checkbox"
                          value={subCategory._id}
                          {...register("subcategories")}
                          className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 "
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const currentSubcategories =
                              getValues("subcategories") || [];

                            if (isChecked) {
                              setValue(
                                "subcategories",
                                [...currentSubcategories, subCategory._id],
                                {
                                  shouldValidate: true,
                                }
                              );

                              clearErrors("subcategories");
                            } else {
                              setValue(
                                "subcategories",
                                currentSubcategories.filter(
                                  (id) => id !== subCategory._id
                                ),
                                { shouldValidate: true }
                              );
                            }

                            trigger("subcategories");
                          }}
                        />
                        <span>{subCategory.name}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No subcategories found, create once</p>
                )}
              </div>
            </div>
            <div className="h-6">
              {errors.subcategories &&
                allSubCategories.data &&
                allSubCategories.data.length > 0 && (
                  <p className="px-4 pt-[6px] text-xs text-red-600">
                    {errors.subcategories.message}
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className={cn(
                "w-full py-4 pr-4 pl-3 rounded-lg border-default border focus:outline-none transition-all flex justify-between relative gap-x-2 bg-green-400 cursor-pointer",
                errors.images ? "text-red-600" : "text-black-200"
              )}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <label className="sr-only" htmlFor="images">
                Select images
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                id="images"
                ref={(e) => {
                  fileInputRef.current = e; // Associe la référence à l'élément
                  register("images").ref(e); // Enregistre le champ avec react-hook-form
                }}
                multiple
                // accept="image/*"
                onChange={handleImageChange} // Gérer le changement ici
                style={{ display: "none" }}
              />
              <FileUpload previewUrls={previewUrls} />
            </div>
            <div className="h-6">
              {errors.images && typeof errors.images.message === "string" && (
                <p className="px-4 pt-[6px] text-xs text-red-600">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          <DynamicFormField
            inputType="input"
            label="Name"
            name="name"
            register={register}
            errors={errors}
            inputProps={{
              type: "text",
              placeholder: "Product name*",
              disabled: false,
            }}
          />

          <DynamicFormField
            inputType="textarea"
            label="Desctiption"
            name="description"
            register={register}
            errors={errors}
            textareaProps={{
              placeholder: "Product description*",
              disabled: false,
              rows: 5,
            }}
          />

          <DynamicFormField
            inputType="input"
            label="Brand"
            name="brand"
            register={register}
            errors={errors}
            inputProps={{
              type: "text",
              placeholder: "Product brand*",
              disabled: false,
            }}
          />
          <DynamicFormField
            inputType="input"
            label="Sku"
            name="sku"
            register={register}
            errors={errors}
            inputProps={{
              type: "text",
              placeholder: "Product sku/ number*",
              disabled: false,
            }}
          />
          <DynamicFormField
            inputType="input"
            label="Discount"
            name="discount"
            register={register}
            errors={errors}
            inputProps={{
              type: "text",
              placeholder: "Product discount*",
              disabled: false,
            }}
          />

          <Colors />
        </div>
        {/* <button type="submit">Submit</button> */}
        <div className="flex gap-x-3 justify-end mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              handleModalClose();
            }}
          >
            Cancel
          </Button>
          <Button aria-label="OK" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PageProducts;

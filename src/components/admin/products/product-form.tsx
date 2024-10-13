import { Button } from "@/components/ui/buttons/button/button";
import React from "react";
import ImageUpload from "./Image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SizeFields from "./size-fields";
import { LoaderCircle } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useAdminDeleteProductVariant } from "@/hooks/admin/api/use-admin-products.hook";
import { ProductFormData } from "./product-schema";

const PoductForm = ({
  setSelectedCategory,
  categories,
  allSubCategories,
  handleModalClose,
  createProduct,
  entityToEdit,
  formMode,
}: any) => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    getValues,
    setValue,
    clearErrors,
    trigger,
  } = useFormContext<ProductFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subProducts",
  });

  const productType = watch("productType") as string;

  const deleteProductVariant = useAdminDeleteProductVariant();
  console.log("🚀 ~ deleteProductVariant:", deleteProductVariant);
  // await deleteProduct.mutateAsync({ id });

  return (
    <>
      <div className="max-h-[500px] overflow-y-auto scrollbar-hidden space-y-4">
        <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
          <h1 className="text-2xl font-bold">
            Informations de base du produit
          </h1>

          {/* Product type */}
          <div
            className={`${errors.productType ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
            <label>Type de produit</label>
            <select
              {...register("productType", {
                required: "Type de produit requis",
              })}
              className="px-3 py-2  h-10  rounded-md border w-full"
            >
              <option value="">Select a product type</option>
              <option value="clothing">Clothing</option>
              <option value="shoes">Shoes</option>
            </select>

            {/* Affichage des erreurs de type de produit */}
            {errors.productType && (
              <p className="px-4 pt-[6px] text-xs ">
                {String(errors.productType.message)}
              </p>
            )}
          </div>

          <div
            className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
            <label>Product name</label>
            <Input {...register("name")} placeholder="Product name" />

            {errors.name?.message && (
              <p className="px-4 pt-[6px] text-xs ">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* Description */}
          <div
            className={`${errors.description ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
            <div className="space-y-1">
              <label>Description</label>
              <Textarea
                id={`input-textarea`}
                {...register("description")}
                rows={5}
                className="p-4 rounded-lg focus:outline-none"
              />
            </div>
            {errors.description && (
              <p className="px-4 pt-[6px] text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Categories */}
          <div
            className={`flex flex-col ${errors.category ? "text-red-600" : "text-black-200"}`}
          >
            <div>
              <label htmlFor="select-category">Category</label>
              <select
                id="select-category"
                {...register("category")}
                className="w-full  rounded-lg border-default border focus:outline-none transition-all flex justify-between relative gap-x-2 overflow-hidden cursor-pointer bg-clear z-10  py-4 pr-4 pl-3 "
                onChange={async (e) => {
                  const value = e.target.value;
                  setSelectedCategory(value);
                  setValue("category", value);
                  setValue("subCategories", []);
                  clearErrors("subCategories");

                  await trigger(["category", "subCategories"]);
                }}
              >
                <option value="">Select a category</option>
                {categories.data?.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-6">
              {errors.category && (
                <p className="px-4 pt-[6px] text-xs ">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* SubCategories */}
          <div
            className={`flex flex-col ${errors.subCategories ? "text-red-600" : "text-black-200"}`}
          >
            <label htmlFor="checkbox-subcategories">Subcategory</label>
            <div className="p-5 rounded-lg border">
              {allSubCategories.data && allSubCategories.data.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 justify-center items-center ">
                  {allSubCategories.data.map((subCategory: any) => (
                    <div key={subCategory._id}>
                      <label className="flex items-center gap-x-2">
                        <input
                          id="checkbox-subCategories"
                          type="checkbox"
                          value={subCategory._id}
                          {...register("subCategories")}
                          className="accent-black-200 size-5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 "
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const currentSubcategories =
                              getValues("subCategories") || [];

                            if (isChecked) {
                              setValue(
                                "subCategories",
                                [...currentSubcategories, subCategory._id],
                                {
                                  shouldValidate: true,
                                }
                              );

                              clearErrors("subCategories");
                            } else {
                              setValue(
                                "subCategories",
                                currentSubcategories.filter(
                                  (id: any) => id !== subCategory._id
                                ),
                                { shouldValidate: true }
                              );
                            }

                            trigger("subCategories");
                          }}
                        />
                        <span>{subCategory.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No subCategories found, create once</p>
              )}
            </div>

            {errors.subCategories &&
              allSubCategories.data &&
              allSubCategories.data.length > 0 && (
                <p className="px-4 pt-[6px] text-xs ">
                  {errors.subCategories.message}
                </p>
              )}
          </div>

          {/* frais de livraison */}
          <div
            className={`${errors.shipping ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
            <label>Shipping costs</label>
            <Input
              {...register("shipping", {
                valueAsNumber: true,
              })}
              placeholder="Frais de livraison"
              defaultValue={0}
            />

            {errors.shipping?.message && (
              <p className="px-4 pt-[6px] text-xs ">
                {String(errors.shipping.message)}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="space-y-4 border rounded-md p-4">
            <label className="text-3xl font-medium py-4">
              Product variations
            </label>
            {fields.map((field: any, index: number) => {
              return (
                <div
                  key={field.id}
                  className="space-y-4 border rounded-md p-4"
                  // onClick={async () => {
                  //   console.log("INDEX", index, entityToEdit._id);
                  //   await deleteProductVariant.mutateAsync({
                  //     productId: entityToEdit._id,
                  //     productVariant: index,
                  //   });
                  // }}
                  onClick={() => {
                    console.log("INDEX", index);
                  }}
                >
                  <h3
                    className="text-2xl font-bold"
                    onClick={() => {
                      console.log("INDEX", index);
                      console.log(
                        "INDEX",
                        index,
                        entityToEdit.subProducts[index]._id
                      );
                    }}
                  >
                    variation {index + 1} 2
                  </h3>
                  <ImageUpload
                    register={register}
                    errors={errors}
                    subProductIndex={index}
                    existingImages={entityToEdit?.subProducts[index]?.images}
                  />
                  <div
                    className={`${errors.subProducts?.[index]?.color ? "text-red-600" : "text-black-200"}  flex flex-col`}
                  >
                    <div className="flex flex-col">
                      <label className="text-lg">Color</label>
                      <div className="flex  items-center justify-center gap-x-4">
                        <Input {...register(`subProducts.${index}.color`)} />
                        <div
                          style={{
                            backgroundColor: getValues(
                              `subProducts.${index}.color`
                            ),
                          }}
                          className="size-7 rounded-full shadow-md border"
                        ></div>
                      </div>
                    </div>
                    {errors.subProducts?.[index]?.color && (
                      <p className="px-4 pt-[6px] text-xs ">
                        {errors.subProducts[index]?.color?.message}
                      </p>
                    )}
                  </div>
                  {/* Price */}
                  <div
                    className={`${errors.subProducts?.[index]?.price ? "text-red-600" : "text-black-200"}  flex flex-col`}
                  >
                    <div className="flex flex-col">
                      <label className="text-lg">Price</label>
                      <Input
                        {...register(`subProducts.${index}.price`, {
                          valueAsNumber: true,
                        })}
                        defaultValue={0}
                      />
                    </div>
                    {errors.subProducts?.[index]?.price && (
                      <p className="px-4 pt-[6px] text-xs ">
                        {errors.subProducts[index]?.price?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-lg">Sizes</label>
                    <div>
                      <SizeFields
                        control={control}
                        register={register}
                        subProductIndex={index}
                        errors={errors}
                        watch={watch}
                        productType={productType}
                      />
                    </div>
                  </div>

                  {/* Discount */}
                  <div
                    className={`${errors.subProducts?.[index]?.discount ? "text-red-600" : "text-black-200"}  flex flex-col`}
                  >
                    <label className="text-lg">Discount</label>
                    <Input
                      {...register(`subProducts.${index}.discount`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Discount"
                      defaultValue={0}
                    />

                    {errors.subProducts?.[index]?.discount && (
                      <p className="px-4 pt-[6px] text-xs ">
                        {errors.subProducts[index]?.discount?.message}
                      </p>
                    )}
                  </div>

                  <Button
                    className="bg-red-600"
                    type="button"
                    // onClick={() => remove(index)}

                    onClick={async () => {
                      console.log(
                        "INDEX",
                        index,
                        entityToEdit.subProducts[index]._id
                      );
                      await deleteProductVariant.mutateAsync({
                        productId: entityToEdit._id,
                        subProductId: entityToEdit.subProducts[index]._id,
                        subProductIndex: index,
                      });
                      remove(index);
                    }}
                  >
                    Delete varation {index + 1}
                  </Button>
                </div>
              );
            })}
            <Button
              type="button"
              onClick={() =>
                append({
                  images: [],
                  color: "",
                  sizes: [{ size: "", qty: 0 }],
                  price: 0,
                  discount: 0,
                  sold: 0,
                })
              }
            >
              Add variation
            </Button>
          </div>
          {errors.subProducts?.message && (
            <p className="px-4 pt-[6px] text-xs text-red-600">
              {String(errors.subProducts.message)}
            </p>
          )}
        </div>
      </div>

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
        <Button
          aria-label="OK"
          type="submit"
          disabled={createProduct.isPending}
          className="relative"
        >
          {createProduct.isPending && (
            <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              <LoaderCircle color="#ffffff" className="animate-spin" />
            </div>
          )}
          <div className={`${createProduct.isPending ? "invisible" : "block"}`}>
            {formMode === "create"
              ? "Create a new product"
              : "Update product information"}
          </div>
        </Button>
      </div>
    </>
  );
};

export default PoductForm;

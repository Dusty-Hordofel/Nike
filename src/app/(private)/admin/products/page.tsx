"use client";
import React, { useEffect, useState } from "react";
import { useGetSubCategoriesByParent } from "@/hooks/admin/sucategories/use-subcategories.hook";
import Modal from "@/components/ui/modals/modal";
import { AddItemButton } from "@/components/ui/item";
import ProductForm from "@/app/(private)/admin/products/components/product-form";
import QueryStatus from "@/components/ui/query-status";
import ProductFormProvider from "@/app/(private)/admin/products/components/form-provider";
import useProductForm from "@/hooks/admin/products/use-product-form.hook";
// import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";

const ProductPage = () => {
  // const user = useCurrentUser();

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const allSubCategories = useGetSubCategoriesByParent(selectedCategory, true);

  const {
    isResultModalOpen,
    closeResultModal,
    resultModalContent,
    openModal,
    closeModal,
    isModalOpen,
    formMode,
    createProduct,
    entityToEdit,
    handleDeleteProduct,
    categories,
    products,
  } = useProductForm();

  useEffect(() => {
    if (entityToEdit) {
      setSelectedCategory(entityToEdit.category);
    } else {
      setSelectedCategory("");
    }
  }, [entityToEdit]);

  return (
    <QueryStatus
      isLoading={categories.isLoading || products.isLoading}
      isError={categories.isError || products.isLoading}
      error={categories.error || products.error}
      data={categories.data}
    >
      {isModalOpen && (
        <ProductFormProvider>
          <Modal title="Create your Product" onCloseModal={closeModal}>
            <ProductForm
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              allSubCategories={allSubCategories}
              handleModalClose={closeModal}
              createProduct={createProduct}
              entityToEdit={entityToEdit}
              formMode={formMode}
            />
          </Modal>
        </ProductFormProvider>
      )}

      {isResultModalOpen && resultModalContent && (
        <Modal
          title={resultModalContent.success ? "Success" : "Error"}
          onCloseModal={closeResultModal}
        >
          <p className="mb-4">{resultModalContent.message}</p>
        </Modal>
      )}

      <div
        data-testid="interests-layout"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AddItemButton
          onClick={() => openModal("create")}
          label="Add a Product"
        />

        {products.data?.length > 0 &&
          products.data.map((product: any, index: number) => {
            return (
              <div
                key={index}
                className="bg-gray-200 w-full aspect-square flex group/card cursor-pointer relative hover:scale-90 transition-all shadow-lg "
                onClick={() => {
                  openModal("update", { ...product });
                }}
              >
                <div className=" text-white text-shadow absolute-center group-hover/card:scale-125 transition-all ">
                  <h1 className="text-2xl font-medium">{product.name}</h1>
                </div>
                {product.subProducts.map(({ color }: any) => (
                  <div
                    key={color._id}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${color.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ))}

                <button
                  className="absolute top-5 right-5 rounded-full size-12 bg-black-200 flex justify-center items-center hover:bg-gray-300 group/button"
                  type="button"
                  aria-label="Remove"
                  name="remove-item-button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product._id);
                  }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="24px"
                    height="24px"
                    fill="none"
                    className="fill-white group-hover/button:fill-none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                      d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25m0 0h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3"
                    ></path>
                  </svg>
                </button>
              </div>
            );
          })}
      </div>
    </QueryStatus>
  );
};

export default ProductPage;

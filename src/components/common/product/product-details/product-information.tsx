"use client";
import Link from "next/link";
import ProductColors from "@/components/common/product/product-details/product-colors";
import { accordionData } from "@/assets/data/accordion";
import { useState } from "react";
import { useCart } from "@/context/cart/cart.context";
import { CartItem } from "@/context/cart/cart.reducer";
import { Button } from "@/components/ui/buttons/button/button";
import Accordion from "../../accordion/Accordion";
import ProductSizeSelector from "./product-size-selector";
import ProductDetails from "./product-details";
import ProductImages from "./product-images";
import { useAddProductToWishlist } from "@/hooks/user/wishlist/use-add-product-to-wishlist.hook";
import { useModal } from "@/context/modal/modal.context";
import Modal from "@/components/ui/modals/modal";
import ProductImageSlider from "@/components/common/product/product-details/product-image-slider";

type ProductInformationProps = {
  product: any;
  selectedColor: string;
  selectedSize: string;
  setProductAddedToCart: React.Dispatch<any>;
  userId: string | undefined;
  onOpenModal: (context: string) => void;
};

const ProductInformation = ({
  product,
  selectedColor,
  selectedSize,
  setProductAddedToCart,
  userId,
  onOpenModal,
}: ProductInformationProps) => {
  const {
    name,
    subProductID,
    category,
    subProducts,
    subProduct,
    _id,
    slug,
    sku,
    discount,
    colors,
    sizes,
    quantity,
    shipping,
    priceAfterDiscount,
    priceBeforeDiscount,
  } = product || {};

  const {
    entityToEdit,
    isResultModalOpen,
    showResultModal,
    setResultModalContent,
    closeResultModal,
    resultModalContent,
    openModal,
    closeModal,
    isModalOpen,
    formMode,
  } = useModal();

  const handleResponse = (response: any) => {
    if (response.success) {
      // handleModalClose();
      setResultModalContent({ success: true, message: response.message });
      showResultModal();
    } else {
      setResultModalContent({
        success: false,
        message: `An error occurred: ${response.message}`,
      });
      // handleModalClose();
      showResultModal();
    }
  };

  const [productQuantity, setProductQuantity] = useState<number | undefined>(
    undefined
  );

  const [error, setError] = useState("");

  const { dispatch } = useCart();

  const addProductToWishlist = useAddProductToWishlist();

  // CartItem
  const cartProduct: CartItem = {
    cartID: `${_id}_${selectedColor}_${selectedSize}`,
    productID: _id,
    subProductID,
    name,
    slug,
    color: selectedColor,
    size: selectedSize,
    priceAfterDiscount,
    shipping,
    priceBeforeDiscount,
    image: colors?.find(
      (color: any) => color.name.toLocaleLowerCase() === selectedColor
    ).image,
    quantity: 1,
  };

  // addProductToCart
  function handleAddProductToCart() {
    setError("");
    if (!selectedSize) {
      setError("Please Select a size");
      return;
    }

    dispatch({ type: "ADD_ITEM", payload: cartProduct });
    setProductAddedToCart(cartProduct);
    onOpenModal("cart");
  }

  // addToWishlist
  async function handleAddProductToWishlist() {
    if (!userId || !slug || !selectedColor) return;

    setProductAddedToCart(cartProduct);

    try {
      const addToWishlist = await addProductToWishlist.mutateAsync({
        userId: userId as string,
        slug,
        color: selectedColor,
      });
      handleResponse(addToWishlist);
    } catch (error) {
      console.error(
        `Erreur lors de l'ajout du produit ${name} à la wishlist`,
        error
      );
    }

    // onOpenModal("wishlist");
  }

  // open size guide
  // const openSizeGuide = () => {
  //   onOpenModal("sizeGuide");
  // };

  return (
    <>
      {isResultModalOpen && resultModalContent && (
        <Modal
          title={resultModalContent.success ? "Success" : "Error"}
          onCloseModal={closeResultModal}
        >
          <p className="mb-4">{resultModalContent.message}</p>
        </Modal>
      )}

      <ProductDetails
        name={name}
        sku={sku}
        priceAfterDiscount={priceAfterDiscount}
        priceBeforeDiscount={priceBeforeDiscount}
        discount={discount}
        className="hidden max-[960px]:block max-[960px]:mb-4"
      />

      <ProductImageSlider images={product?.images} />

      <div className="max-w-[1200px] min-[960px]:mx-auto flex">
        <ProductImages images={product?.images} />
        <div className="w-full min-[960px]:w-[456px] flex flex-col gap-2 min-[960px]:mt-12 min-[960px]:mr-2 min-[960px]:pl-6 pt-1 min-[960px]:pr-12 font-medium ">
          <div className="mb-8">
            <ProductDetails
              name={name}
              sku={sku}
              priceAfterDiscount={priceAfterDiscount}
              priceBeforeDiscount={priceBeforeDiscount}
              discount={discount}
              className="hidden min-[960px]:block"
            />
            <ProductColors
              slug={slug}
              colors={colors}
              setError={setError}
              selectedColor={selectedColor}
              productQuantity={productQuantity}
              setProductQuantity={setProductQuantity}
            />
            <div>
              <ProductSizeSelector
                selectedSize={selectedSize}
                sizes={sizes}
                selectedColor={selectedColor}
                slug={slug}
                setError={setError}
                setProductQuantity={setProductQuantity}
                error={error}
              />

              <div className="space-y-3 mb-8 max-[960px]:px-6">
                <Button
                  size="large"
                  variant="primary"
                  fullWidth
                  onClick={handleAddProductToCart}
                  disabled={productQuantity != undefined && productQuantity < 1}
                >
                  Add to Bag
                </Button>
                <Button
                  size="large"
                  fullWidth
                  variant="outline"
                  className="bg-white"
                  onClick={handleAddProductToWishlist}
                >
                  <p className="flex items-center justify-center gap-1">
                    <span>Favourite</span>
                    <span className="btn-icon-wrapper">
                      <svg
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
                          d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451"
                        ></path>
                        <title>non-filled</title>
                      </svg>
                    </span>
                  </p>
                </Button>
              </div>

              <div className="py-6 max-[960px]:px-6">
                <p>Retrait gratuit</p>
                <Link
                  href="/"
                  className="underline underline-offset-8 font-medium  "
                >
                  <span>Trouver un magasin</span>
                </Link>
                <p className="font-thin text-gray-500 mt-5">
                  Option «&nbsp;click and collect&nbsp;» disponible au moment du
                  paiement
                </p>
              </div>

              <div className="mt-[40px] max-[960px]:px-6">
                <Accordion data={accordionData} />
              </div>

              <div className="flex pt-6 pb-10 max-[960px]:px-6">
                <picture>
                  <img
                    src="/images/triman.png"
                    className="mr-3 w-7 h-7"
                    alt=""
                  />
                </picture>
                <div className="flex items-center">
                  <p>Ce produit peut être recyclé. </p>
                  <Link href="/" className="ml-1 font-medium underline">
                    {" "}
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInformation;

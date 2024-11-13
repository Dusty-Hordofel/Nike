"use client";
import Link from "next/link";
import ProductSizes from "./product-size";
import ProductColors from "@/components/common/product/product-details/product-colors";
import { accordionData } from "@/assets/data/accordion";
import { useState } from "react";
import { useCart } from "@/context/cart/cart.context";
import { CartItem } from "@/context/cart/cart.reducer";
import { Button } from "@/components/ui/buttons/button/button";
import Accordion from "../../accordion/Accordion";

type ProductInformationProps = {
  product: any;
  selectedColor: string;
  selectedSize: string;
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProductAddedToCart: React.Dispatch<any>;
};

const ProductInformation = ({
  product,
  selectedColor,
  selectedSize,
  setShowCartModal,
  setProductAddedToCart,
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
  } = product;

  const [productQuantity, setProductQuantity] = useState<number | undefined>(
    undefined
  );
  // console.log("🚀 ~ productQuantity:COTOLI", productQuantity);

  const [error, setError] = useState("");

  const {
    // state: { cartItems: productsCart },
    dispatch,
  } = useCart();

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
    image: colors.find(
      (color: any) => color.name.toLocaleLowerCase() === selectedColor
    ).image,
    quantity: 1,
  };

  // addProductToCart
  function addProductToCart() {
    setError("");
    if (!selectedSize) {
      setError("Please Select a size");
      return;
    }

    // if (quantity === 0) {
    //   setError("This Product is out of stock.");
    //   return;
    // }

    dispatch({ type: "ADD_ITEM", payload: cartProduct });
    setShowCartModal(true);
    setProductAddedToCart(cartProduct);
  }

  return (
    <div className=" w-[456px] flex flex-col gap-2 mt-12 mr-2 pl-6 pt-1 pr-12  font-medium">
      <div className="mb-8">
        <p className="text-[#992E00] font-medium">Exclu membre</p>
        <div>
          <div>
            <h1 className="text-2xl">{name}</h1>
            <h2 className="pb-1">{sku}</h2>
            <h2 className="pb-1">Chaussure pour Homme</h2>
          </div>

          <div className="leading-7">
            <div style={{ display: "inline-block" }}>
              <div className="product-price__wrapper flex gap-3">
                <div
                  className="product-price"
                  data-test="product-price-reduced"
                >
                  {priceAfterDiscount}&nbsp;€
                </div>

                {discount > 0 && (
                  <>
                    <div
                      className="product-price line-through text-gray-600"
                      data-test="product-price"
                    >
                      <span className="sr-only">Réduction de</span>
                      {priceBeforeDiscount}&nbsp;€
                    </div>
                    <p className="text-primary" data-testid="OfferPercentage">
                      <span className="text-green-700">
                        {discount}&nbsp;% de réduction
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <ProductColors
          slug={slug}
          colors={colors}
          setError={setError}
          selectedColor={selectedColor}
          productQuantity={productQuantity}
          setProductQuantity={setProductQuantity}
        />
        <div>
          <fieldset className={`mt-5 mb-8 `}>
            <legend className="flex items-center justify-between w-full">
              <span className="">Sélectionner la taille</span>
              <Link href="/" className="flex ">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                  className="pb-1"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    d="M21.75 10.5v6.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V10.5m3.308-2.25h12.885"
                  ></path>
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    d="M15.79 5.599l2.652 2.65-2.652 2.653M8.21 5.599l-2.652 2.65 2.652 2.653M17.25 19v-2.5M12 19v-2.5M6.75 19v-2.5"
                  ></path>
                </svg>

                <span>Guide des tailles</span>
              </Link>
            </legend>
            <div
              className={`${error ? "border-red-600 border rounded-sm" : ""}`}
            >
              <ProductSizes
                selectedSize={selectedSize}
                sizes={sizes}
                selectedColor={selectedColor}
                slug={slug}
                setError={setError}
                setProductQuantity={setProductQuantity}
              />
            </div>
            <p
              className={`${
                error ? "block pt-3 text-red-600 font-normal" : "hidden"
              }`}
            >
              {error}
            </p>
          </fieldset>

          <div className="space-y-3 mb-8">
            <Button
              size="large"
              variant="primary"
              fullWidth
              onClick={addProductToCart}
              disabled={productQuantity != undefined && productQuantity < 1}
            >
              Ajouter au panier
            </Button>
            <Button size="large" fullWidth variant="outline">
              <p className="flex items-center justify-center gap-1">
                <span>Ajouter aux favoris</span>
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

          {/* lieu */}
          <div className="py-6 ">
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
          {/* Accordion */}
          <div className="mt-[40px]">
            <Accordion data={accordionData} />
          </div>
          {/* triman */}
          <div className="flex pt-6 pb-10">
            <picture>
              <img src="/images/triman.png" className="mr-3 w-7 h-7" alt="" />
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
  );
};

export default ProductInformation;

"use client";
import Link from "next/link";
import ProductSizes from "./product-size";
import ProductColors from "@/components/client/product/product-details/product-colors";
import { IProduct } from "@/models/Product";
import { Button } from "../../../ui/buttons/button/button";
import Accordion from "../../accordion/Accordion";
import { accordionData } from "@/assets/data/accordion";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/use-redux-hooks";
import { addProductToCart, CartItem } from "@/store/cartSlice";

type Props = {
  product: IProduct;
  productStyle: number;
  selectedSize: number;
};

const ProductInformation = ({ product, productStyle, selectedSize }: any) => {
  console.log("🚀 ~ ProductInformation ~ selectedSize:", selectedSize);
  const {
    name,
    category,
    subProducts,
    subProduct,
    _id,
    slug,
    sku, //not in the mode IProd
    discount,
    colors,
    sizes,
    quantity,
    shipping,
    priceAfterDiscount,
    priceBeforeDiscount,
  } = product;
  console.log("🚀 ~ ProductInformation ~ colors:", colors);

  const sizesInDatabase = sizes.map((size: any) => size.size);

  const [error, setError] = useState("");

  const { cartItems } = useAppSelector((state) => state.cart);
  console.log("🚀 ~ ProductInformation ~ cartItems:", cartItems);
  console.log("🚀 ~ ProductInformation ~ SIZE:", sizes[selectedSize]);

  const dispatch = useAppDispatch();

  const cartProduct: CartItem = {
    cartID: `${_id}_${productStyle}_${selectedSize}`,
    productID: _id,
    name,
    style: productStyle,
    size: sizes[selectedSize].size,
    color: colors[productStyle].color,
    price: priceAfterDiscount,
    shipping,
    priceBeforeDiscount,
    image: colors[productStyle].image,
    quantity: 1,
  };
  console.log("🚀 ~ ProductInformation ~ cartProduct: MONA", cartProduct);

  function addToCartHandler() {
    if (!selectedSize) {
      setError("Please Select a size");
      return;
    }

    if (quantity < 1) {
      setError("This Product is out of stock.");
    } else {
    }
    dispatch(addProductToCart(cartProduct));
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
          <div className="leading-7 mt-1 mb-6">
            <div
              className="headline-5 mt3-sm mr2-sm"
              style={{ display: "inline-block" }}
            >
              <div className="product-price__wrapper flex gap-3">
                <div
                  className="product-price"
                  data-test="product-price-reduced"
                >
                  {priceAfterDiscount}&nbsp;€
                </div>
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
              </div>
            </div>
          </div>
        </div>
        <ProductColors
          slug={slug}
          colors={colors}
          name={name}
          productStyle={productStyle}
        />
        <div className="mt-5 mb-3 w-full">
          <div className="flex items-center justify-between w-full">
            <span className="">Sélectionner la taille</span>
            <Link href="/">
              <span className="text-[#707072]">Guide des tailles</span>
            </Link>
          </div>
          <div className="mt-2">
            <ProductSizes
              selectedSize={selectedSize}
              sizesInDatabase={sizesInDatabase}
              productStyle={productStyle}
              slug={slug}
            />
          </div>

          <div className="space-y-3 mt-2 mb-6">
            <Button
              size="large"
              variant="primary"
              fullWidth
              onClick={addToCartHandler}
            >
              Ajouter au panier
            </Button>
            <Button size="large" fullWidth>
              Ajouter aux favories
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

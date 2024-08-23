"use client";
import { shoeSizes } from "@/assets/data/sizes";
import { Delete, FavorisIcon, Gift } from "@/assets/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/use-redux-hooks";
import {
  CartItem,
  emptyCart,
  removeItemFromCart,
  updateQuantity,
  updateSize,
} from "@/store/cartSlice";
import Link from "next/link";
import React, { ChangeEvent, FC, useState } from "react";

interface SelectProps {
  selected: string | number;
  type: "size" | "quantity";
  cartID: string;
  productID?: number;
  style?: string;
}

const CartProductDetails = ({
  cartItem: { productID, image, name, price, quantity, style, size, cartID },
}: {
  cartItem: CartItem;
}) => {
  const dispatch = useAppDispatch();

  const clearCartItems = () => {
    dispatch(emptyCart());
  };

  const removeCartItem = () => {
    dispatch(removeItemFromCart(cartID));
  };

  return (
    <>
      {/* <button onClick={clearCartItems}>Clear</button> */}
      <div className="flex text-base py-6 flex-col">
        <div className="flex">
          <CartProductImage image={image} />
          <div className="css-1muntc4 ei1batk0 flex-grow">
            <CartProductInfo
              name={name}
              productID={productID}
              size={size}
              style={style}
              cartID={cartID}
              quantity={quantity}
            />
            <CartProductActions removeCartItem={removeCartItem} />
          </div>
        </div>
        <div className="leading-7 text-base font-medium">
          <p>Retrait gratuit</p>
          <button className="pickup border-b border-black-100 hover:border-b-2">
            Trouver un magasin
          </button>
        </div>
      </div>
    </>
  );
};
{
}
const CartProductImage = ({ image }: { image: string }) => (
  <figure data-automation="item-product-thumbnail" className="pr-4">
    <Link href="/">
      <picture>
        <img className="w-[150px] h-[184px] pb-4" src={image} alt="Product" />
      </picture>
    </Link>
  </figure>
);

const CartProductInfo = ({
  name,
  productID,
  size,
  style,
  cartID,
  quantity,
}: {
  name: string;
  productID: number;
  size: string;
  style: string;
  cartID: string;
  quantity: number;
}) => (
  <div className="css-18o14p5 ezci20q3 flex justify-between text-[#707072]">
    <div className="flex flex-col leading-7 tracking-[0.06em]">
      <Link href="/">
        <h2 className="text-black-100">{name}</h2>
      </Link>
      <div className="css-bkv97y eneqjw10">Chaussure pour Homme</div>
      <div className="css-1jw2dak ezci20q2">
        Blanc/Blanc/Gris fumée clair/Gris fumée clair
      </div>
      <div className="flex">
        <div className="flex">
          <label className="css-vvuoo e3co8ie1">Taille / Pointure</label>
          <Select
            selected={size}
            cartID={cartID}
            productID={productID}
            style={style}
            type="size"
          />
        </div>
        <div className="flex">
          <label className="css-vvuoo e3co8ie1">Quantité</label>
          <Select selected={quantity} cartID={cartID} type="quantity" />
        </div>
      </div>
    </div>
    <Price />
    {/* <Price price={price} /> */}
  </div>
);

const CartProductActions = ({
  removeCartItem,
}: {
  removeCartItem: () => void;
}) => (
  <div data-testid="cart-item-product-actions" className="mt-6">
    <ul className="flex gap-4">
      <li className="css-1fqekfo e61j6oj0">
        <button
          className="css-ao99ai-TertiaryLightButton-disabledButtonStyles-commonUnderlineStyles-tertiaryDarkButtonStyles e61j6oj2"
          type="button"
          aria-label="Gift Options"
        >
          <Gift />
        </button>
      </li>
      <li className="css-1fqekfo e61j6oj0">
        <button
          className="css-ao99ai-TertiaryLightButton-disabledButtonStyles-commonUnderlineStyles-tertiaryDarkButtonStyles e61j6oj2"
          type="button"
          aria-label="Move to Favorites"
        >
          <FavorisIcon />
        </button>
      </li>
      <li className="css-1fqekfo e61j6oj0">
        <button
          className="css-ao99ai-TertiaryLightButton-disabledButtonStyles-commonUnderlineStyles-tertiaryDarkButtonStyles e61j6oj2"
          type="button"
          aria-label="Remove"
          onClick={removeCartItem}
        >
          <Delete />
        </button>
      </li>
    </ul>
  </div>
);

const Select: FC<SelectProps> = ({
  selected,
  type,
  cartID,
  productID,
  style,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(selected);
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (type === "quantity") {
      setSelectedValue(Number(value));
      dispatch(updateQuantity({ quantity: Number(value), cartID }));
    } else if (type === "size") {
      setSelectedValue(value);
      const newCartID = `${productID}_${style}_${shoeSizes.indexOf(value)}`;
      dispatch(updateSize({ size: value, cartID, newCartID }));
    }
  };

  const options =
    type === "quantity"
      ? Array.from({ length: 10 }, (_, index) => index + 1)
      : shoeSizes;

  return (
    <div className="css-123i213 e3co8ie2">
      <div className="css-1ilkyak e3co8ie3"></div>
      <select
        data-automation="quantity-select"
        className="css-46rwad e3co8ie4"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const Price = () => (
  // { price }: { price: string }
  <div>
    <p className="flex gap-4">
      <span>
        <span className="sr-only">Prix d&apos;origine</span>
        139,99&nbsp;€
      </span>
      <span className="text-black-200">
        <span className="sr-only">Prix de vente</span>
        90,97&nbsp;€
      </span>
    </p>
  </div>
);

export default CartProductDetails;

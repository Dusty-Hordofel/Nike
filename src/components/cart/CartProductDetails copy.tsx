"use client";
import { shoeSizes } from "@/assets/data/sizes";
import { Delete, FavorisIcon, Gift } from "@/assets/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hooks";
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
  const { cartItems } = useAppSelector((state) => state.cart);
  console.log("🚀 ~ cartItems:", cartItems);

  const dispatch = useAppDispatch();

  const clearCartItems = () => {
    dispatch(emptyCart());
  };

  const removeCartItem = () => {
    dispatch(removeItemFromCart(cartID));
  };

  return (
    <>
      <button onClick={clearCartItems}>Clear</button>

      <div className="flex text-base">
        <div data-testid="cart-item" className="py-6 flex flex-col">
          <div className="flex">
            <figure data-automation="item-product-thumbnail" className="pr-4">
              <Link
                data-version="__VERSION_HERE__"
                tabIndex={0}
                className=""
                href="/"
              >
                <picture>
                  <img
                    className="w-[150px] h-[184px] pb-4"
                    data-version="__VERSION_HERE__"
                    src={image}
                    id="13fc86f1-df6f-492a-990b-1a4e5c27c1bb"
                  />
                </picture>
              </Link>
            </figure>
            <div className="css-1muntc4 ei1batk0 ">
              <div className="css-18o14p5 ezci20q3 flex justify-between text-[#707072]">
                <div className="flex flex-col leading-7 tracking-[0.06em]">
                  <Link
                    data-version="__VERSION_HERE__"
                    tabIndex={0}
                    className=""
                    href="https://www.nike.com/fr/t/chaussure-react-vision-pour-0PFnM8/CD4373-101"
                  >
                    <h2
                      data-automation="cart-item-product-name"
                      className="text-black-100"
                    >
                      {name}
                    </h2>
                  </Link>
                  <div className="css-bkv97y eneqjw10">
                    Chaussure pour Homme
                  </div>
                  <div className="css-1jw2dak ezci20q2">
                    Blanc/Blanc/Gris fumée clair/Gris fumée clair
                  </div>
                  <div className="flex">
                    <div className="flex">
                      <label
                        id="size-select-13fc86f1-df6f-492a-990b-1a4e5c27c1bb"
                        className="css-vvuoo e3co8ie1"
                      >
                        Taille / Pointure
                      </label>
                      <Select
                        selected={size}
                        cartID={cartID}
                        productID={productID}
                        style={style}
                        type="size"
                      />
                    </div>
                    <div className="flex">
                      <label
                        id="quantity-select-13fc86f1-df6f-492a-990b-1a4e5c27c1bb"
                        className="css-vvuoo e3co8ie1"
                      >
                        Quantité
                      </label>
                      <Select
                        selected={quantity}
                        cartID={cartID}
                        type="quantity"
                      />
                    </div>
                  </div>
                </div>
                {/* 3 */}
                <Price />
              </div>
              {/* 4 */}
              <div data-testid="cart-item-product-actions" className="mt-6">
                <ul className="flex gap-4">
                  <li className="css-1fqekfo e61j6oj0">
                    <button
                      data-version="__VERSION_HERE__"
                      className="css-ao99ai-TertiaryLightButton-disabledButtonStyles-commonUnderlineStyles-tertiaryDarkButtonStyles e61j6oj2"
                      type="button"
                      aria-label="Gift Options"
                      data-automation="gift-options-button"
                      name="gift-options-button"
                    >
                      <Gift />
                    </button>
                  </li>
                  <li className="css-1fqekfo e61j6oj0">
                    <button
                      data-version="__VERSION_HERE__"
                      className="css-ao99ai-TertiaryLightButton-disabledButtonStyles-commonUnderlineStyles-tertiaryDarkButtonStyles e61j6oj2"
                      type="button"
                      aria-label="Move to Favorites"
                      data-automation="move-to-favorites-button"
                      name="move-to-favorites-button"
                    >
                      <FavorisIcon />
                    </button>
                  </li>
                  <li className="css-1fqekfo e61j6oj0">
                    <button
                      data-version="__VERSION_HERE__"
                      className="css-ao99ai-TertiaryLightButton-disabledButtonStyles-commonUnderlineStyles-tertiaryDarkButtonStyles e61j6oj2"
                      type="button"
                      aria-label="Remove"
                      data-automation="remove-item-button"
                      name="remove-item-button"
                      onClick={removeCartItem}
                    >
                      <Delete />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="leading-7 text-base font-medium">
            <p>Retrait gratuit</p>
            <button className="pickup border-b border-black-100 hover:border-b-2">
              Trouver un magasin
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProductDetails;

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
      console.log("SIMA", selectedValue, typeof selectedValue);
      dispatch(updateQuantity({ quantity: Number(value), cartID }));
    } else if (type === "size") {
      setSelectedValue(String(value));
      const newCartID = `${productID}_${style}_${shoeSizes.indexOf(value)}`;
      dispatch(updateSize({ size: value, cartID, newCartID }));
    }
  };

  let options =
    type === "quantity"
      ? Array.from({ length: 10 }, (_, index) => index)
      : shoeSizes;

  return (
    <div className="css-123i213 e3co8ie2">
      <div className="css-1ilkyak e3co8ie3"></div>
      <select
        data-automation="quantity-select"
        aria-labelledby="quantity-select-13fc86f1-df6f-492a-990b-1a4e5c27c1bb"
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

const Price = () => {
  return (
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
};

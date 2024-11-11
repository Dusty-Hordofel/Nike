"use client";
import { Button } from "@/components/ui/buttons/button/button";
import { useCart } from "@/context/cart/cart-context";
import { CartItem } from "@/context/cart/cart-reducer";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const CartProductDetails = ({
  cartItem: {
    productID,
    slug,
    subProductID,
    name,
    quantity,
    size,
    cartID,
    color,
    image,
    priceAfterDiscount,
    priceBeforeDiscount,
  },
  setSelectedCartItem,
}: {
  cartItem: CartItem;
  setSelectedCartItem: Dispatch<
    SetStateAction<{
      slug: string;
      color: string;
      size: string;
      cartID: string;
    } | null>
  >;
}) => {
  const { dispatch } = useCart();

  const updateQuantity = (cartID: string, quantity: number) => {
    dispatch({ type: "UPDATE_ITEM", payload: { cartID, quantity } });
  };

  const removeProductFromCart = (cartID: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: cartID });
  };

  return (
    <>
      <div className="flex text-base py-6 flex-col border-b-gray-200 border-b">
        <div className="flex">
          <CartProductImage
            image={image}
            name={name}
            color={color}
            size={size}
            slug={slug}
            subProductID={subProductID}
          />
          <div className="css-1muntc4 ei1batk0 flex-grow">
            <CartProductInfo
              name={name}
              productID={productID}
              size={size}
              color={color}
              cartID={cartID}
              quantity={quantity}
              slug={slug}
              subProductID={subProductID}
              priceAfterDiscount={priceAfterDiscount}
              priceBeforeDiscount={priceBeforeDiscount}
              setSelectedCartItem={setSelectedCartItem}
            />
          </div>
        </div>
        <CartProductActions
          quantity={quantity}
          cartID={cartID}
          updateQuantity={updateQuantity}
          removeProductFromCart={removeProductFromCart}
        />
        <div className="text-base font-medium pt-3">
          <p>Retrait gratuit</p>
          <button className="pickup border-b border-black-100 hover:border-b-2">
            Trouver un magasin
          </button>
        </div>
      </div>
    </>
  );
};

const CartProductImage = ({
  image,
  name,
  color,
  size,
  slug,
  subProductID,
}: {
  image: string;
  name: string;
  color: string;
  size: string;
  slug: string;
  subProductID: string;
}) => (
  <figure className="pr-4">
    <Link
      href={`/products/${slug}?color=${color.toLocaleLowerCase()}&size=${size.toLocaleLowerCase()}`}
    >
      <picture>
        <img className="w-[150px] h-[184px] pb-4" src={image} alt="Product" />
      </picture>
    </Link>
  </figure>
);

const CartProductInfo = ({
  name,
  productID,
  slug,
  subProductID,
  size,
  color,
  cartID,
  quantity,
  priceAfterDiscount,
  priceBeforeDiscount,
  setSelectedCartItem,
}: {
  name: string;
  productID: string;
  slug: string;
  subProductID: string;
  size: string;
  color: string;
  cartID: string;
  quantity: number;
  priceAfterDiscount: number;
  priceBeforeDiscount: number;
  setSelectedCartItem: Dispatch<
    SetStateAction<{
      slug: string;
      color: string;
      size: string;
      cartID: string;
    } | null>
  >;
}) => (
  <div className="flex justify-between text-[#707072]">
    <div className="flex flex-col leading-7 tracking-[0.06em]">
      <Link href="/">
        <h2 className="text-black-100 font-medium">{name}</h2>
      </Link>
      <div>Chaussure pour Homme</div>
      <div>{color.slice(0, 1).toLocaleUpperCase() + color.slice(1)}</div>
      <div className="flex">
        <div className="flex gap-x-2">
          <label>Taille / Pointure</label>
          <span
            className="underline cursor-pointer"
            onClick={() => setSelectedCartItem({ slug, color, size, cartID })}
          >
            {size.toLocaleUpperCase()}
          </span>
        </div>
      </div>
    </div>
    <Price
      priceAfterDiscount={priceAfterDiscount}
      priceBeforeDiscount={priceBeforeDiscount}
    />
  </div>
);

const CartProductActions = ({
  quantity,
  cartID,
  updateQuantity,
  removeProductFromCart,
}: {
  cartID: string;
  quantity: number;
  updateQuantity: (cartID: string, quantity: number) => void;
  removeProductFromCart: (cartID: string) => void;
}) => (
  <div className="flex gap-x-4 mt-2 mb-3">
    <div className="flex border-gray-300 bg-white border rounded-full">
      {quantity === 1 ? (
        <Button
          aria-label="remove item  from cart button"
          className=""
          type="button"
          variant="ghost"
          size="cart"
          onClick={() => removeProductFromCart(cartID)}
        >
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
              stroke-miterlimit="10"
              stroke-width="1.5"
              d="M13.75 10v7m-3.5-7v7m-3.5-8.5V17c0 1.24 1.01 2.25 2.25 2.25h6c1.24 0 2.25-1.01 2.25-2.25V7.75h2.25m-10-3h3.75c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H4.5"
            ></path>
          </svg>
        </Button>
      ) : (
        <Button
          aria-label="Reduce quantity"
          type="button"
          variant="ghost"
          size="cart"
          onClick={() => updateQuantity(cartID, -1)}
        >
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
              stroke-miterlimit="10"
              stroke-width="1.5"
              d="M18 12H6"
            ></path>
          </svg>
        </Button>
      )}
      <div className="flex justify-center items-center w-6 h-full bg-white text-center">
        {quantity}
      </div>
      <Button
        aria-label="Increase quantity"
        className=""
        type="button"
        variant="ghost"
        size="cart"
        onClick={() => updateQuantity(cartID, 1)}
      >
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
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M18 12H6m6 6V6"
          ></path>
        </svg>
      </Button>
    </div>
    <Button
      aria-label="Add to favorites"
      className="favorite-button bg-white border-gray-300 hover:bg-gray-300"
      type="button"
      variant="outline"
      size="cart"
    >
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
          d="M15.566 5.75c.984 0 1.91.385 2.606 1.082a3.707 3.707 0 010 5.228L12 18.25l-6.172-6.19a3.707 3.707 0 010-5.227A3.656 3.656 0 018.434 5.75c.985 0 1.91.385 2.606 1.082l.565.567.395.396.394-.396.566-.567a3.658 3.658 0 012.606-1.082"
        ></path>
      </svg>
    </Button>
  </div>
);

const Price = ({
  priceAfterDiscount,
  priceBeforeDiscount,
}: {
  priceAfterDiscount: number;
  priceBeforeDiscount: number;
}) => (
  <div>
    <p className="flex gap-4">
      {priceAfterDiscount !== priceBeforeDiscount && (
        <span>
          <span className="sr-only">Prix d&apos;origine</span>
          {priceBeforeDiscount}&nbsp;€
        </span>
      )}
      <span className="text-black-200">
        <span className="sr-only">Prix de vente</span>
        {priceAfterDiscount}&nbsp;€
      </span>
    </p>
  </div>
);

export default CartProductDetails;

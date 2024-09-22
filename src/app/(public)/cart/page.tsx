"use client";
import { Empty } from "@/components/client/cart";
import CartProductDetails from "@/components/client/cart/CartProductDetails";
import CartDetails from "@/components/client/cart/cart-details";
import { useAppSelector } from "@/hooks/redux/use-redux-hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const CartProductsPage = (props: Props) => {
  const { cartItems, cartTotal, orderTotal } = useAppSelector(
    (state) => state.cart
  );

  // const [items, setItems] = useState(cartItems);

  // useEffect(() => {
  //   setItems(cartItems);
  // }, [cartItems]);

  console.log("🚀 ~ CartProductsPage ~ cartItems:", cartItems);

  return (
    <main className="py-10  bg-yellow-500 max-w-[1280px]">
      <div className="flex bg-success w-max mx-auto">
        <div className="px-2 bg-blue-200">
          <div className="css-1rl87ye e15icfp90 p-3 mb-3 w-[664.750px] border border-[#E5E5E5]">
            <div className="css-ki09ja e15icfp92 leading-7 text-[#707072] text-[16px]">
              <h2 className="css-7v6ius e15icfp91 text-[#FF5000] text-xl font-bold leading-7">
                Livraison gratuite pour les membres.
              </h2>
              Deviens membre Nike pour profiter de livraisons rapides et
              gratuites.
              <Link
                href="/fr/cart?signInType=join"
                data-automation="membership-messaging-join"
                className="css-1qijc1q e153xtnw0 font-medium underline"
              >
                Rejoins-nous
              </Link>
              &nbsp;ou&nbsp;
              <Link
                href="/fr/cart?signInType=login"
                data-automation="membership-messaging-login"
                className="css-1qijc1q e153xtnw0 font-medium underline"
              >
                S&apos;identifier
              </Link>
            </div>
          </div>
          <div className="">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((cartItem) => (
                  <CartProductDetails
                    key={cartItem.cartID}
                    cartItem={cartItem}
                  />
                ))}
              </>
            ) : (
              <Empty />
            )}
          </div>
        </div>
        <div className=" bg-warning">
          <CartDetails />
        </div>
      </div>
    </main>
  );
};

export default CartProductsPage;

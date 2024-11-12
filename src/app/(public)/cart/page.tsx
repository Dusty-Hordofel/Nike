"use client";
import CartProducts from "@/components/common/cart/cart-products";
import Empty from "@/components/common/cart/empty/Empty";
import SelectedProductCartModal from "@/components/common/cart/selected-product-cart-modal";
import { useCart } from "@/context/cart/cart.context";
import Link from "next/link";
import { useState } from "react";
import CartSummary from "@/components/common/cart/cart-summary";

const CartProductsPage = () => {
  const {
    state: {
      cartItems,
      numItemsInCart,
      cartTotal,
      shipping,
      taxAmount,
      orderTotal,
      appliedCoupon,
      error,
    },
    // totalQuantity,
    // totalAmount,
    dispatch,
  } = useCart();

  console.log("🚀 ~ CartProductsPage ~ cartTotal:TOTAL", cartTotal);

  const [selectedCartItem, setSelectedCartItem] = useState<{
    cartID: string;
    slug: string;
    color: string;
    size: string;
  } | null>(null);

  console.log("🚀 ~ CartProductsPage ~ cartItems:", cartItems);

  return (
    <main className="py-10  bg-yellow-500 max-w-[1280px]">
      <div className="flex bg-success w-max mx-auto">
        {selectedCartItem && (
          <SelectedProductCartModal
            selectedCartItem={selectedCartItem}
            setSelectedCartItem={setSelectedCartItem}
            dispatch={dispatch}
          />
        )}

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

          <div>
            {cartItems.length > 0 ? (
              <CartProducts
                cartItems={cartItems}
                setSelectedCartItem={setSelectedCartItem}
              />
            ) : (
              <Empty />
            )}
          </div>
        </div>
        <div className=" bg-warning">
          <CartSummary
          // totalQuantity={totalQuantity}
          // totalAmount={totalAmount}
          />
        </div>
      </div>
    </main>
  );
};

export default CartProductsPage;

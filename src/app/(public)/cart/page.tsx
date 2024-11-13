"use client";
import CartProducts from "@/components/common/cart/cart-products";
import Empty from "@/components/common/cart/empty/Empty";
import SelectedProductCartModal from "@/components/common/cart/selected-product-cart-modal";
import { useCart } from "@/context/cart/cart.context";
import Link from "next/link";
import { useState } from "react";
import CartSummary from "@/components/common/cart/cart-summary";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user";
import { useRouter } from "next/navigation";

const CartProductsPage = () => {
  // const router = useRouter();
  const user = useCurrentUser();
  console.log("🚀 ~ CartProductsPage ~ user:", user);

  // if (!user /*&& userRole !== "user"*/) {
  //   router.push(`${window.location.origin}` || "/");
  // }

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

    dispatch,
  } = useCart();

  const tolo = useCart();
  console.log("🚀 ~ CartProductsPage ~ tolo:", tolo);

  console.log("🚀 ~ CartProductsPage ~ cartTotal:TOTAL", cartTotal);
  console.log("🚀 ~ CartProductsPage ~ cartItems:", cartItems);

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
          <MembershipMessaging user={user} />
          <div>
            {cartItems?.length > 0 ? (
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
            shipping={shipping}
            taxAmount={taxAmount}
            orderTotal={orderTotal}
            cartItems={cartItems}
            appliedCoupon={appliedCoupon}
            dispatch={dispatch}
          />
        </div>
      </div>
    </main>
  );
};

export default CartProductsPage;

const MembershipMessaging = ({ user }: any) => {
  return (
    <div
      className={`w-[664.750px] ${!user && "p-3 mb-3 border border-[#E5E5E5]"}`}
    >
      {!user && (
        <div className="leading-7 text-[#707072] text-[16px]">
          <h2 className=" text-[#FF5000] text-xl font-bold leading-7">
            Livraison gratuite pour les membres.
          </h2>
          Deviens membre Nike pour profiter de livraisons rapides et gratuites.
          <Link
            href="/fr/cart?signInType=join"
            data-automation="membership-messaging-join"
            className="font-medium underline"
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
      )}
    </div>
  );
};

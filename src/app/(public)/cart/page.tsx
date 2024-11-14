"use client";
import CartProducts from "@/components/common/cart/cart-products";
import Empty from "@/components/common/cart/empty/Empty";
import SelectedProductCartModal from "@/components/common/cart/selected-product-cart-modal";
import { useCart } from "@/context/cart/cart.context";
import Link from "next/link";
import { useState } from "react";
import CartSummary from "@/components/common/cart/cart-summary";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/buttons/button/button";
import { cn } from "@/lib/utils";
import { saveCartItems } from "@/actions/cart/user-cart.actions";

const CartProductsPage = () => {
  const user = useCurrentUser();
  console.log("🚀 ~ CartProductsPage ~ user:", user);

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

  const [selectedCartItem, setSelectedCartItem] = useState<{
    cartID: string;
    slug: string;
    color: string;
    size: string;
  } | null>(null);

  const handleSaveCart = async () => {
    const saveCart = await saveCartItems(cartItems, appliedCoupon?.couponCode);
    console.log("🚀 ~ saveCartHandler ~ saveCart:SAVE CART", saveCart);
  };

  return (
    <main className="py-10 flex flex-col  max-w-[1280px] mx-auto">
      {selectedCartItem && (
        <SelectedProductCartModal
          selectedCartItem={selectedCartItem}
          setSelectedCartItem={setSelectedCartItem}
          dispatch={dispatch}
        />
      )}
      <div className="min-[960px]:flex min-[960px]:flex-row">
        <div className="px-2">
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

        <CartSummary
          shipping={shipping}
          taxAmount={taxAmount}
          orderTotal={orderTotal}
          cartItems={cartItems}
          appliedCoupon={appliedCoupon}
          dispatch={dispatch}
          handleSaveCart={handleSaveCart}
        />
      </div>

      <Link
        href="/checkout"
        className={cn(
          buttonVariants({ variant: "primary", size: "large" }),
          "font-medium w-full p-0 m-0 rounded-none  min-[960px]:hidden flex justify-center items-center"
        )}
        onClick={handleSaveCart}
      >
        Paiement
      </Link>
    </main>
  );
};

export default CartProductsPage;

const MembershipMessaging = ({ user }: any) => {
  return (
    <div
      className={`max-w-[664.750px] w-full ${
        user && "p-3 mb-3 border border-[#E5E5E5]"
      }`}
    >
      {user && (
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

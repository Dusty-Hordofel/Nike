"use client";
import CartProducts from "@/components/common/cart/cart-products";
import Empty from "@/components/common/cart/empty/Empty";
import SelectedProductCartModal from "@/components/common/cart/selected-product-cart-modal";
import { useCart } from "@/context/cart/cart.context";
import Link from "next/link";
import { useState } from "react";
import CartSummary from "@/components/common/cart/cart-summary";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";
import { Button, buttonVariants } from "@/components/ui/buttons/button/button";
import { cn } from "@/lib/common/utils";
import { saveCartItems } from "@/actions/cart/user-cart.actions";
import { useGetProductsFromWishlist } from "@/hooks/user/wishlist/use-get-products-from-wishlist.hook";
import QueryStatus from "@/components/ui/query-status";

const CartProductsPage = () => {
  const [selectedCartItem, setSelectedCartItem] = useState<{
    cartID: string;
    slug: string;
    color: string;
    size: string;
  } | null>(null);

  const { state: cartState, dispatch } = useCart();

  const user = useCurrentUser();
  const wishlistQuery = useGetProductsFromWishlist(user);

  const handleSaveCart = async () => {
    await saveCartItems(
      cartState.cartItems,
      cartState.appliedCoupon?.couponCode
    );
  };

  return (
    <div>
      <div className="max-w-[1536px] px-2">
        <main className="pt-5 mb-10 flex flex-col  max-w-[1100px] w-full  mx-auto ">
          {selectedCartItem && (
            <SelectedProductCartModal
              selectedCartItem={selectedCartItem}
              setSelectedCartItem={setSelectedCartItem}
              dispatch={dispatch}
            />
          )}

          <div className="min-[960px]:flex min-[960px]:flex-row">
            <div className="px-2  min-[960px]:max-w-[66.6667%] w-full">
              {!user && <MembershipMessaging />}

              <div>
                <div className="max-[960px]:flex max-[960px]:flex-col max-[960px]:items-center max-[960px]:mb-6  ">
                  <h1 className="font-medium text-2xl">Bag</h1>
                  <div className="hidden max-[960px]:flex">
                    <span className="text-gray-400">
                      {cartState.cartItems?.length > 0
                        ? cartState.cartItems.length
                        : 0}{" "}
                    </span>
                    <span className="text-gray-400">
                      Item{cartState.cartItems?.length > 0 && "s"} |{" "}
                    </span>
                    <span>${cartState.orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                {cartState.cartItems?.length > 0 ? (
                  <CartProducts
                    cartItems={cartState.cartItems}
                    setSelectedCartItem={setSelectedCartItem}
                  />
                ) : (
                  <Empty />
                )}
              </div>
            </div>

            <CartSummary
              cartState={cartState}
              dispatch={dispatch}
              handleSaveCart={handleSaveCart}
            />
          </div>

          <QueryStatus
            isLoading={wishlistQuery.isLoading}
            isError={wishlistQuery.isError}
            error={wishlistQuery.error}
            className="h-56 min-[960px]:max-w-[66.6667%] w-full mx-0 "
          >
            <h2 className="mt-6 text-2xl font-medium">Favourites</h2>
            <div className="grid min-[960px]:grid-cols-2  grid-cols-1">
              {wishlistQuery.data?.length > 0 ? (
                wishlistQuery.data?.map(({ product }: any) => (
                  <div
                    key={product._id}
                    className="flex gap-x-4 py-6 max-[960px]:border-b max-[960px]:border-gray-300"
                  >
                    <figure>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}?color=${product.color}`}
                      >
                        <picture>
                          <img
                            className="size-[164px] object-cover"
                            src={product.images[0].url}
                            alt={product.name}
                          />
                        </picture>
                      </Link>
                    </figure>
                    <div className="text-sm">
                      <div>
                        <h2>{product.name}</h2>
                        <div className="text-gray-600">
                          <p>Men&apos;s jacket</p>
                          <p>{product.color}</p>
                        </div>
                        <Button
                          className="p-0 m-0 h-max text-sm text-gray-600"
                          variant="link"
                          size="medium"
                          // disabled
                        >
                          Select size
                        </Button>
                      </div>
                      <Button
                        className="mt-3 bg-white"
                        variant="outline"
                        size="small"
                        disabled
                      >
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-56 min-[960px]:max-w-[66.6667%] w-full mx-0  flex justify-center items-center">
                  <p>No products in your wishlist.</p>
                </div>
              )}
            </div>
          </QueryStatus>
        </main>
      </div>

      <div className="py-4 px-3 fixed bottom-0 w-full flex justify-center items-center bg-white min-[960px]:hidden border-t border-t-gray-200">
        <Link
          href="/checkout"
          className={cn(
            buttonVariants({ variant: "primary", size: "large" }),
            "font-medium w-full"
          )}
          onClick={handleSaveCart}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartProductsPage;

const MembershipMessaging = () => {
  return (
    <div
      className="max-w-[664.750px] w-full 
        p-3 mb-3 border border-[#E5E5E5]
      "
    >
      <div className="leading-7 text-[#707072] text-[16px]">
        <h2 className=" text-[#FF5000] text-xl font-bold leading-7">
          Free Delivery for Members.
        </h2>
        Become a Nike Member to get fast and free delivery.
        <Link href="/auth/register" className="font-medium underline">
          Join us
        </Link>
        &nbsp;or&nbsp;
        <Link href="/auth/login" className="font-medium underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

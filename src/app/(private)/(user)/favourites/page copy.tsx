"use client";
import QueryStatus from "@/components/ui/query-status";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";
import { useGetProductsFromWishlist } from "@/hooks/user/wishlist/use-get-products-from-wishlist.hook";
import Link from "next/link";
import React from "react";

const FavouritesPage = () => {
  const user = useCurrentUser();
  const wishlistQuery = useGetProductsFromWishlist(user);

  return (
    <QueryStatus
      isLoading={wishlistQuery.isLoading}
      isError={wishlistQuery.isError}
      error={wishlistQuery.error}
      // min-[960px]:max-w-[66.6667%]
      className="h-[calc(100vh-96px)] min-w-[320px] max-w-[1920px] w-full mx-0 bg-blue-300"
    >
      <>
        <header className="px-12 pt-12 pb-3 bg-warning flex items-start flex-wrap justify-between min-w-[320px] max-w-[1920px]">
          {/* ransform: scale(1);
    transform-origin: left center;
    transition: transform 200ms; */}
          <h1 className="local-nav__title flex-1 font-medium text-2xl">
            Favourites
          </h1>
          <div className="local-nav__actions"></div>
        </header>
      </>
    </QueryStatus>
  );
};

export default FavouritesPage;
{
  /* <div
          // className="bg-orange-300 w-[1536px]"
          // className="max-w-[1000px] bg-red-200 px-8"
        > */
}
{
  /* justify-around flex-wrap align-top */
}
<main className="pt-5 flex bg-green-400 w-[1100px]">
  <div className="w-[1536px] bg-pink-400">
    <h1>MOMO</h1>
  </div>
  {/* className="bg-orange-400 w-full" */}
  {/* <div>
              {wishlistQuery.data?.length > 0 ? (
                wishlistQuery.data?.map(({ product }: any) => (
                  <div>
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
                  </div>
                ))
              ) : (
                <div className="h-[calc(100vh-96px)] min-w-[320px] max-w-[1920px] mx-0  flex justify-center items-center bg-red-400">
                  <p>No products in your wishlist.</p>
                </div>
              )}
            </div> */}
</main>;
{
  /* </div> */
}

"use client";
import { Button } from "@/components/ui/buttons/button/button";
import QueryStatus from "@/components/ui/query-status";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";
import { useGetProductsFromWishlist } from "@/hooks/user/wishlist/use-get-products-from-wishlist.hook";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FavouritesPage = () => {
  const user = useCurrentUser();
  console.log("🚀 ~ FavouritesPage ~ user:", user);
  const router = useRouter();

  if (!user) router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`);

  const wishlistQuery = useGetProductsFromWishlist(user);
  console.log("🚀 ~ FavouritesPage ~ wishlistQuery:", wishlistQuery);

  return (
    <QueryStatus
      isLoading={wishlistQuery.isLoading}
      isError={wishlistQuery.isError}
      error={wishlistQuery.error}
      data={wishlistQuery.data}
      className="h-[calc(100vh-96px)] min-w-[320px] max-w-[1920px] w-full mx-0 bg-white"
    >
      <>
        <header className="min-[960px]:px-12 px-4 pt-4 min-[960px]:pt-12 pb-3  flex items-start flex-wrap justify-between min-w-[320px] max-w-[1920px]">
          <h1 className=" font-medium text-[20px] min-[960px]:text-2xl">
            Favourites
          </h1>
        </header>
        <main className="pt-5 flex  max-w-[1536px] min-[960px]:px-8">
          <div className=" max-w-[1100px] w-full grid grid-cols-2 min-[960px]:grid-cols-3 gap-2">
            {wishlistQuery.data?.length > 0 ? (
              wishlistQuery.data?.map(({ product }: any) => (
                <div
                  className="bg-white aspect-square  px-2 relative"
                  key={product._id}
                >
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}?color=${product.color}`}
                  >
                    <Image
                      src={product.images[0].url}
                      alt={`favorite product image ${product._id}`}
                      width={500}
                      height={500}
                      className="w-full h-full "
                      priority
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="cart"
                      aria-label="coup de cœur"
                      className="size-10 absolute top-4 right-4"
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
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
                          clip-rule="evenodd"
                        ></path>
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
                          clip-rule="evenodd"
                        ></path>
                        <path
                          stroke="currentColor"
                          stroke-width="1.5"
                          d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
                        ></path>
                      </svg>
                    </Button>
                  </Link>

                  <div className="flex flex-col min-[960px]:flex-row min-[960px]:justify-between mt-3">
                    <div className="text-sm min-[960px]:text-base">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}?color=${product.color}`}
                      >
                        <p>{product.name}</p>
                      </Link>
                      <p className="text-gray-500">
                        Sleeveless down running jacket for men
                      </p>
                    </div>

                    <p className="flex items-center justify-start min-[960px]:justify-end">
                      <span>{product.priceAfterDiscount}&nbsp;€</span>
                    </p>
                  </div>

                  <Button
                    className="mt-5 mb-10 bg-white"
                    size="small"
                    variant="outline"
                    disabled
                  >
                    Select size
                  </Button>
                </div>
              ))
            ) : (
              <div className="h-[calc(100vh-96px)] min-w-[320px] max-w-[1920px] mx-0  flex justify-center items-center bg-red-400">
                <p>No products in your wishlist.</p>
              </div>
            )}
          </div>
        </main>
      </>
    </QueryStatus>
  );
};

export default FavouritesPage;

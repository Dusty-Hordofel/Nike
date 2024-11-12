"use client";
import QueryStatus from "@/components/ui/query-status";
import { CartAction, CartItem } from "@/context/cart/cart.reducer";
import { Dispatch, SetStateAction } from "react";
import SelectedProductCartModalContent from "./selected-product-cart-modal-content";
import { useQuery } from "@tanstack/react-query";

const SelectedProductCartModal = ({
  selectedCartItem,
  setSelectedCartItem,
  dispatch,
}: // setCartItems,
{
  selectedCartItem: {
    cartID: string;
    slug: string;
    color: string;
    size: string;
  };
  dispatch: Dispatch<CartAction>;
  // setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  setSelectedCartItem: Dispatch<
    SetStateAction<{
      slug: string;
      color: string;
      size: string;
      cartID: string;
    } | null>
  >;
}) => {
  const productQuery = useQuery({
    queryKey: ["products", selectedCartItem.slug, selectedCartItem.color],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${selectedCartItem.slug}?color=${selectedCartItem.color}`
      ).then((res) => res.json()),
  });

  return (
    <div
      id="modal-root"
      className=" fixed inset-0 bg-[hsla(0,0%,7%,0.36)]  flex justify-center items-center z-[900]"
    >
      <div className="relative p-6 bg-white  rounded-3xl w-[928px] h-[480px] flex items-center justify-center">
        <QueryStatus
          isLoading={productQuery.isLoading}
          isError={productQuery.isError}
          error={productQuery.error}
        >
          <SelectedProductCartModalContent
            data={productQuery.data?.product}
            setSelectedCartItem={setSelectedCartItem}
            selectedCartItem={selectedCartItem}
            dispatch={dispatch}
            // setCartItems={setCartItems}
          />
        </QueryStatus>
      </div>
    </div>
  );
};

export default SelectedProductCartModal;

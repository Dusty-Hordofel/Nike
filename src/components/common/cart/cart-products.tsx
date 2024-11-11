import { Dispatch, SetStateAction } from "react";
import { CartItem } from "@/context/cart/cart-reducer";
import CartProductDetails from "@/components/common/cart/cart-product-details";

function CartProducts({
  cartItems,
  setSelectedCartItem,
}: {
  cartItems: CartItem[];
  setSelectedCartItem: Dispatch<
    SetStateAction<{
      slug: string;
      color: string;
      size: string;
      cartID: string;
    } | null>
  >;
}) {
  return (
    <>
      {cartItems.map((cartItem) => (
        <CartProductDetails
          key={cartItem.cartID}
          cartItem={cartItem}
          setSelectedCartItem={setSelectedCartItem}
        />
      ))}
    </>
  );
}

export default CartProducts;

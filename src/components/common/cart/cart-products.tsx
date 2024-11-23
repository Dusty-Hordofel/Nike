import { Dispatch, SetStateAction } from "react";
import { CartItem } from "@/context/cart/cart.reducer";
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
    <div className=" max-[960px]:border-t max-[960px]:border-gray-200 max-[960px]:pt-2">
      {cartItems.map((cartItem) => (
        <CartProductDetails
          key={cartItem.cartID}
          cartItem={cartItem}
          setSelectedCartItem={setSelectedCartItem}
        />
      ))}
    </div>
  );
}

export default CartProducts;

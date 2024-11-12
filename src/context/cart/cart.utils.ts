import { CartItem, Coupon } from "./cart-reducer";

const calculateCartTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (total, item) => total + item.priceAfterDiscount * item.quantity,
    0
  );
};

const calculateTaxAmount = (cartItems: CartItem[], taxRate: number) => {
  return cartItems.reduce(
    (total, item) => total + item.priceAfterDiscount * item.quantity * taxRate,
    0
  );
};

const calculateShippingAmount = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (total, item) => total + item.shipping * item.quantity,
    0
  );
};

const calculateNumberOfItemsInCart = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const applyCoupon = (cartTotal: number, coupon?: Coupon) => {
  if (coupon) {
    return cartTotal * (1 - coupon.discountPercentage / 100);
  }
  return cartTotal;
};

export {
  calculateCartTotal,
  calculateTaxAmount,
  calculateShippingAmount,
  calculateNumberOfItemsInCart,
  applyCoupon,
};

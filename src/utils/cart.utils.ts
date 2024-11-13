import { CartItem, Coupon } from "../context/cart/cart.reducer";

const calculateOrderTotalWithoutDiscount = (
  cartItems: CartItem[],
  taxRate: number
) => {
  const cartTotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingAmount(cartItems);
  const taxAmount = calculateTaxAmount(cartTotal, taxRate);

  return cartTotal + shipping + taxAmount;
};
const calculateOrderTotalWithDiscount = (
  cartItems: CartItem[],
  taxRate: number,
  discount: number
) => {
  const cartTotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingAmount(cartItems);
  const taxAmount = calculateTaxAmount(cartTotal, taxRate);
  const cartTotalAfterDiscount = cartTotal - discount;

  return cartTotalAfterDiscount + shipping + taxAmount;
};

const calculateCartTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (total, item) => total + item.priceAfterDiscount * item.quantity,
    0
  );
};

const calculateTaxAmount = (cartTotal: number, taxRate: number) => {
  return cartTotal * taxRate;
};
// const calculateTaxAmount = (cartItems: CartItem[], taxRate: number) => {
//   return cartItems.reduce(
//     (total, item) => total + item.priceAfterDiscount * item.quantity * taxRate,
//     0
//   );
// };

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
  calculateOrderTotalWithoutDiscount,
  calculateOrderTotalWithDiscount,
  applyCoupon,
};

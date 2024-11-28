import React from "react";
import CheckoutHeader from "@/components/common/checkout/checkout-section-title";

type Product = {
  image: string;
  size: string;
  quantity: number;
  price: number;
};

type Cart = {
  cartTotal: number;
  products: Product[];
};

type OrderSummaryProps = {
  cart: Cart | null;
};

const OrderSummary = ({ cart }: any) => {
  return (
    <div>
      <CheckoutHeader title="In Your Bag" isComplete={false} showEditLink />
      <div className="summary-section p-5">
        <div className="summary-item flex justify-between items-center">
          <div className="flex items-center">
            <span aria-label="subtotalText">Subtotal</span>
            <span id="subtotalTooltipWrapper" className="ml-2 top-1 relative">
              <button id="subtotalTooltip" aria-label="Détails du sous-total">
                <div className="css-1ou3w6b">
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
                      d="M12 20a8 8 0 100-16 8 8 0 000 16zm.75-4.5V17h-1.5v-1.5h1.5zM10.5 10c0-.918.831-1.644 1.764-1.472h.006c.6.106 1.096.603 1.201 1.202v.001a1.502 1.502 0 01-.82 1.63 2.411 2.411 0 00-1.401 2.189V14h1.5v-.45a.91.91 0 01.532-.828l.01-.005a3.002 3.002 0 001.657-3.248 3.008 3.008 0 00-2.416-2.417C10.647 6.706 9 8.179 9 10h1.5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </span>
          </div>
          <div className="subtotal-amount">${cart?.data?.cart?.cartTotal}</div>
        </div>

        <div className="summary-item flex justify-between items-center">
          <div className="shipping-label">Estimated Shipping</div>
          <div className="shipping-amount">$0,00</div>
        </div>
        {/* <div className="summary-item flex justify-between items-center">
          <div className="flex items-center">
            <span aria-label="subtotalText" className="bg-blue-100">
              Estimated Tax
            </span>

            <span id="subtotalTooltipWrapper" className="ml-2 top-1 relative">
              <button id="subtotalTooltip" aria-label="Détails du sous-total">
                <div className="css-1ou3w6b">
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
                      d="M12 20a8 8 0 100-16 8 8 0 000 16zm.75-4.5V17h-1.5v-1.5h1.5zM10.5 10c0-.918.831-1.644 1.764-1.472h.006c.6.106 1.096.603 1.201 1.202v.001a1.502 1.502 0 01-.82 1.63 2.411 2.411 0 00-1.401 2.189V14h1.5v-.45a.91.91 0 01.532-.828l.01-.005a3.002 3.002 0 001.657-3.248 3.008 3.008 0 00-2.416-2.417C10.647 6.706 9 8.179 9 10h1.5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </span>
          </div>
        </div> */}

        <div className="summary-item  flex justify-between items-center mt-2">
          <div className="total-label">
            <span>Total </span>
          </div>
          <div className="total-amount">${cart?.data?.cart?.cartTotal}</div>
        </div>
      </div>

      <div className="cart-details-section pt-6 mx-2">
        <header>
          <h3 className="delivery-date">Arrives by Thu, Dec 5</h3>
        </header>
        {cart?.data?.cart?.products.map((product: any) => {
          return (
            <div className=" cart-item py-4" key={product._id}>
              <figure className="cart-item-figure flex">
                <div className="cart-item-image">
                  <img
                    alt="Chaussure Nike Cortez Textile pour femme"
                    src={product.image}
                    width="60"
                    className="cloud-cart-item-image"
                  />
                </div>
                <figcaption className="cart-item-details pl-5 text-gray-500">
                  <div className="cart-item-name text-black-200">
                    Chaussure Nike Cortez Textile pour femme
                  </div>
                  <div className="cart-item-reference">
                    Réf. article : DZ2795-601
                  </div>
                  <div>
                    <span className="cart-item-size">
                      Taille : {product.size}
                    </span>
                  </div>
                  <div className="cart-item-color">
                    Couleur : Picante Red/University Blue/Coconut Milk/Sail
                  </div>
                  <div className="cart-item-quantity">
                    Quantité : {product.quantity} @ {product?.price} €
                  </div>
                  <div className="cart-item-price">
                    {product?.price * product.quantity} €
                  </div>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderSummary;

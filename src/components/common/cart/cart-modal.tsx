import { Button, buttonVariants } from "@/components/ui/buttons/button/button";
import { CartItem } from "@/context/cart/cart.reducer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type CartModalProps = {
  numItemsInCart: number;
  productAddedToCart: CartItem | null;
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartModal = ({
  numItemsInCart,
  productAddedToCart,
  setShowCartModal,
}: CartModalProps) => {
  return (
    <div className=" fixed inset-0 bg-[hsla(0,0%,7%,0.36)]  flex justify-center items-center z-50 fade-out">
      {/* transform: translate3d(0px, 0px, 0px); */}
      <div
        className="bg-white min-[960px]:min-w-[300px] min-[960px]:max-w-[428px] w-full min-[960px]:top-0 min-[960px]:right-12 absolute min-[960px]:max-h-[calc(100%-120px)] max-h-[calc(100%-60px)]  overflow-hidden rounded-3xl fade-out max-[960px]:left-0"
        role="modal"
        aria-labelledby="modal-ajout--au-panier"
      >
        <section className="cart-modal-container p-6 overflow-auto no-scrollbar bg-white flex flex-col relative max-[960px]:max-h-[calc(-60px+100vh)] ">
          <Button
            aria-label="Close modal"
            className={cn(
              buttonVariants({ variant: "secondary", size: "cart" }),
              "close-btn-container absolute top-6 right-6  bg-gray-200"
            )}
            onClick={() => setShowCartModal(false)}
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
                stroke="currentColor"
                stroke-width="1.5"
                d="M18.973 5.027L5.028 18.972m0-13.945l13.944 13.945"
              ></path>
            </svg>
          </Button>

          <div className="cart-modal-header w-[80%] flex gap-x-2">
            <svg
              aria-hidden="true"
              className="text-color-success mr3-sm text-green-600"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M12 1.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5zm-1.06 14l-3.18-3.18 1.06-1.06 2.12 2.12 4.24-4.24 1.06 1.06-5.3 5.3z"
              ></path>
            </svg>
            <h2 className="nds-text css-1rhjrcc e1yhcai00 appearance-body1Strong color-primary weight-regular">
              Ajouté au panier
            </h2>
          </div>
          <div className="cart-modal-content py-6 flex">
            <img
              src={productAddedToCart?.image}
              alt="Pantalon de jogging Nike Sportswear Club Fleece"
              className="bg-[#F5F5F5] size-[100px]"
            />
            <div className="pl-3">
              <p className="nds-text css-1rhjrcc e1yhcai00 appearance-body1Strong color-primary weight-regular font-medium">
                {productAddedToCart?.name}
              </p>
              <p className="nds-text css-fwd1nn e1yhcai00 appearance-body1 color-secondary weight-regular">
                Pantalon de jogging
              </p>
              <p className="nds-text nike-size css-fwd1nn e1yhcai00 appearance-body1 color-secondary weight-regular">
                <span>
                  Taille {productAddedToCart?.size.toLocaleUpperCase()}
                </span>
              </p>
              <div id="price-container" className="space-x-4">
                {productAddedToCart?.priceAfterDiscount !==
                  productAddedToCart?.priceBeforeDiscount && (
                  <span>{productAddedToCart?.priceAfterDiscount}&nbsp;€</span>
                )}
                <span
                  className={`${
                    productAddedToCart?.priceAfterDiscount !==
                      productAddedToCart?.priceBeforeDiscount &&
                    "text-gray-500 line-through"
                  }`}
                >
                  {productAddedToCart?.priceBeforeDiscount}&nbsp;€
                </span>
              </div>
            </div>
          </div>
          <div className="cart-modal-content space-y-2">
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/cart`}
              className={cn(
                buttonVariants({ variant: "outline", fullWidth: true }),
                "text-black-200 font-medium space-x-2"
              )}
            >
              <span>Afficher le panier </span>
              <span>({numItemsInCart})</span>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/checkout`}
              className={cn(
                buttonVariants({ variant: "primary", fullWidth: true })
              )}
            >
              Paiement
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartModal;

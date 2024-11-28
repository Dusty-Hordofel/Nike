import ProductUnavailable from "@/components/common/product/product-details/product-unavailable";
import { Button } from "@/components/ui/buttons/button/button";
import { CartAction, CartItem } from "@/context/cart/cart.reducer";
import { cn } from "@/lib/common/utils";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const SelectedProductCartModalContent = ({
  data,
  setSelectedCartItem,
  selectedCartItem,
  dispatch,
}: {
  data: any;
  selectedCartItem: {
    cartID: string;
    slug: string;
    color: string;
    size: string;
  };
  dispatch: Dispatch<CartAction>;
  setSelectedCartItem: Dispatch<
    SetStateAction<{
      slug: string;
      color: string;
      size: string;
      cartID: string;
    } | null>
  >;
}) => {
  const handleSizeChange = (size: string, cartID: string) => {
    // updateCartItemInLocalStorage(cartID, size);
    dispatch({ type: "UPDATE_ITEM", payload: { cartID, size } });
    setSelectedCartItem(null);
  };

  const updateCartItemInLocalStorage = (cartID: string, newSize: string) => {
    const cart = JSON.parse(localStorage.getItem("cart") as string) || [];

    const updatedCart = cart.map((item: any) =>
      item.cartID === cartID ? { ...item, size: newSize } : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // setCartItems(updatedCart);
  };
  return (
    <>
      {data && Object.keys(data).length > 0 && (
        <section className="  grid grid-cols-2 h-full gap-x-4 w-full">
          <div className="relative ">
            <Image
              src={data.images[0].url}
              alt={data.name}
              fill
              quality={100}
              objectFit="cover"
            />
          </div>

          <div className="  grid grid-rows-[auto_1fr_auto]">
            <div>
              <p className="font-medium">
                Chaussure de trail imperméable pour homme
              </p>
              <h2 className="font-medium text-3xl">{data.name}</h2>
              <p>
                <span className="sr-only">Prix d&apos;origine</span>
                <span>{data.priceBeforeDiscount} €</span>
              </p>
            </div>
            <div className="bg-warning pt-10">
              <div>
                <span>Sélectionner la taille</span>
              </div>
              <div className="grid grid-cols-5 gap-[6px] overflow-y-auto">
                {data.sizes.map(
                  ({
                    _id,
                    qty,
                    size,
                  }: {
                    _id: string;
                    qty: number;
                    size: string;
                  }) => (
                    <div key={`${_id}-${size}`}>
                      <label
                        htmlFor={`size-${_id}-${size}`}
                        className={cn(
                          qty > 0 ? "bg-white" : "bg-gray-100 text-gray-300",
                          "font-normal flex items-center justify-center border hover:border-black-100  rounded-lg border-gray-200 h-12 relative",
                          size.toLocaleLowerCase() === selectedCartItem.size &&
                            " border-black-100"
                        )}
                        style={{
                          cursor: qty > 0 ? "pointer" : "default",
                        }}
                      >
                        {size}
                        <input
                          type="radio"
                          aria-label={size}
                          id={`size-${_id}-${size}`}
                          name="size"
                          value={size}
                          onChange={(e) => {
                            setSelectedCartItem({
                              ...selectedCartItem,
                              size: e.target.value.toLocaleLowerCase(),
                            });
                          }}
                          // hidden
                          checked={
                            selectedCartItem.size === size.toLocaleLowerCase()
                          }
                          disabled={qty === 0}
                        />
                        {qty === 0 && (
                          <ProductUnavailable className="bg-white/30 " />
                        )}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <Button
              fullWidth
              className="mt-5"
              onClick={() => {
                handleSizeChange(
                  selectedCartItem.size,
                  selectedCartItem.cartID
                );
              }}
            >
              Mets à jour la taille
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default SelectedProductCartModalContent;

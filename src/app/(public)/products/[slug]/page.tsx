"use client";
import { bannerVideo } from "@/assets/data/banner";
import ProductImages from "@/components/common/product/product-details/product-images";
import ProductInformation from "@/components/common/product/product-details/product-information";
import Link from "next/link";
import React, { useState } from "react";
import CarouselContent from "@/components/ui/carousels/carousel-content";
import { NewThisWeek } from "@/assets/data/slides";
import { useQuery } from "@tanstack/react-query";
import MediaCarousel from "@/components/ui/carousels/media-carousel";
import {
  HeroBanner as VideoBanner,
  HeroBanner as ImageBanner,
} from "@/components/ui/banner/hero-banner";
import CartModal from "@/components/common/cart/cart-modal";
import { CartItem } from "@/context/cart/cart.reducer";
import { useCart } from "@/context/cart/cart.context";
import { useAddProductToWishlist } from "@/hooks/user/wishlist/use-add-product-to-wishlist.hook";
import { useCurrentUser } from "@/hooks/user/auth/use-current-user.hook";
import { useModal } from "@/context/modal/modal.context";

interface ProductPageParams {
  slug: string;
}
interface ProductPageSearchParams {
  [key: string]: string | string[] | undefined;
}

interface ProductPageProps {
  params: ProductPageParams;
  searchParams: ProductPageSearchParams;
}

const ProductPage = ({ params, searchParams }: ProductPageProps) => {
  const { slug: productSlug } = params;
  const {
    state: {
      cartItems,
      numItemsInCart,
      cartTotal,
      shipping,
      taxAmount,
      orderTotal,
      appliedCoupon,
      error,
    },

    dispatch,
  } = useCart();

  const user = useCurrentUser();

  const [productAddedToCart, setProductAddedToCart] = useState<null | CartItem>(
    null
  );
  const [showCartModal, setShowCartModal] = useState(false);
  const [modalContext, setModalContext] = useState<null | string>(null);

  const selectedColor = searchParams.color as string;
  const selectedSize = searchParams.size as string;

  const productQuery = useQuery({
    queryKey: ["products", productSlug, selectedColor],
    queryFn: () =>
      fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/products/${productSlug}?color=${encodeURIComponent(
          selectedColor
        )}`
      ).then((res) => res.json()),
  });

  if (productQuery.isLoading) return <p>Loading...</p>;
  if (productQuery.isError) return <p>Error...</p>;

  const { product } = productQuery.data;

  const handleOpenModal = (context: string) => {
    setModalContext(context);
    setShowCartModal(true);
  };

  const handleCloseModal = () => {
    setShowCartModal(false);
    setModalContext(null);
  };

  return (
    <div className="min-h-screen">
      {showCartModal && (
        <CartModal
          numItemsInCart={numItemsInCart}
          productAddedToCart={productAddedToCart}
          modalContext={modalContext}
          handleCloseModal={handleCloseModal}
        />
      )}

      <ProductInformation
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        setProductAddedToCart={setProductAddedToCart}
        onOpenModal={handleOpenModal}
        userId={user?._id}
      />

      <div className="px-12 mt-40">
        <VideoBanner
          mediaType="video"
          showContent={false}
          bannerClassName="h-[740px]"
          {...bannerVideo}
        />
      </div>
      <div className="mt-16 max-[960px]:px-6 min-[960px]:max-w-[692px] w-full text-center min-[960px]:mx-auto  overflow-hidden">
        <h3 className="text-3xl min-[960px]:text-4xl font-medium">
          Ça, c&apos;est Nike Tech
        </h3>

        <p className="mt-4 text-lg/8  min-[960px]:text-xl/8">
          Certaines personnes pensent que Nike Tech était déjà très bien comme
          ça. Pas nous. Même si elle est toujours aussi stylée et culte
          qu&rsquo;il y a 10&nbsp;ans, on l&rsquo;a rendue plus chaude et plus
          douce que jamais, sans être plus lourde. Tout le plaisir est pour
          nous&nbsp;!
          <br />
          <br />
          <Link target="_blank" href="">
            Voir toute la collection
          </Link>
        </p>
      </div>

      <div className="px-12 mt-40">
        <ImageBanner
          mediaType="image"
          showContent={false}
          bannerClassName="h-[740px]"
          href="#"
          alt=""
          src="https://res.cloudinary.com/dgsc66scx/image/upload/v1717781346/nike/image_rppxjq.webp"
        />
      </div>

      <div className="mt-16 max-[960px]:px-6 min-[960px]:max-w-[692px] w-full text-center min-[960px]:mx-auto  overflow-hidden">
        <h3 className="text-3xl min-[960px]:text-4xl font-medium">
          Plus de chaleur
        </h3>
        <p className="mt-4 text-lg/8  min-[960px]:text-xl/8">
          Depuis toujours, Nike Tech procure la chaleur, la légèreté et le
          confort nécessaires pour bouger librement. Sans entrer dans les
          détails, les vêtements Nike Tech sont maintenant plus chauds, sans
          être plus lourds.
        </p>
      </div>

      <div className="my-24">
        <h3 className="px-12 text-2xl">Ces articles devraient te plaire</h3>
        <MediaCarousel title="" data={NewThisWeek}>
          {(slide) => (
            <CarouselContent carouselContentClassName="mt-[36px]">
              <>
                <h4 className="text-base font-medium">{slide.title}</h4>
                <p className="w-full text-gray-500">{slide.type}</p>
                <p className="pt-2 font-medium">{slide.prix}</p>
              </>
            </CarouselContent>
          )}
        </MediaCarousel>
      </div>
    </div>
  );
};

export default ProductPage;

"use client";
import { bannerVideo } from "@/assets/data/banner";
import ProductImages from "@/components/common/product/product-details/product-images";
import ProductInformation from "@/components/common/product/product-details/product-information";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CarouselContent from "@/components/ui/carousels/carousel-content";
import { NewThisWeek } from "@/assets/data/slides";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { saveCartItems } from "@/actions/cart/user-cart.actions";
import QueryStatus from "@/components/ui/query-status";
import { usePrefetchAllProductVariants } from "@/hooks/user/products/use-get-product.hook";
import { getProduct } from "@/services/user/products.service";

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
    state: cartState,

    dispatch,
  } = useCart();

  const user = useCurrentUser();
  const queryClient = useQueryClient();

  const [productAddedToCart, setProductAddedToCart] = useState<null | CartItem>(
    null
  );
  const [showCartModal, setShowCartModal] = useState(false);
  const [modalContext, setModalContext] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // const containerRef = useRef<HTMLDivElement>(null);
  // console.log("🚀 ~ ProductPage ~ containerRef:REF", containerRef);
  console.log("🚀 ~ ProductPage ~ activeIndex:", activeIndex);

  const selectedColor = searchParams.color as string;
  const selectedSize = searchParams.size as string;

  // const productQuery = useQuery({
  //   queryKey: ["products", productSlug, selectedColor],
  //   queryFn: () =>
  //     fetch(
  //       `${
  //         process.env.NEXT_PUBLIC_BASE_URL
  //       }/api/products/${productSlug}?color=${encodeURIComponent(
  //         selectedColor
  //       )}`
  //     ).then((res) => res.json()),
  // });

  // const queryClient = useQueryClient();`

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedColor || !productSlug) return;

      // Check if data is cached
      const cachedData = queryClient.getQueryData([
        "product",
        selectedColor,
        productSlug,
      ]);

      if (cachedData) {
        // If data is already cached, no need to load
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Preload data into cache if unavailable
        await queryClient.prefetchQuery({
          queryKey: ["product", selectedColor, productSlug],
          queryFn: () => getProduct(productSlug, selectedColor),
        });
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Une erreur inconnue s'est produite"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedColor, productSlug, queryClient]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!selectedColor || !productSlug) return;

  //     setLoading(true);
  //     setError(null);

  //     try {
  //       // Précharger les données dans le cache
  //       await queryClient.prefetchQuery({
  //         queryKey: ["product", selectedColor, productSlug],
  //         queryFn: () => getProduct(productSlug, selectedColor),
  //       });
  //     } catch (err: any) {
  //       // setError(error);
  //       if (err instanceof Error) {
  //         setError(err);
  //       } else {
  //         setError(new Error("Une erreur inconnue s'est produite"));
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [selectedColor, productSlug, queryClient]);

  // if (productQuery.isLoading) return <p>Loading...</p>;
  // if (productQuery.isError) return <p>Error...</p>;

  // const { product } = productQuery.data;

  const handleOpenModal = (context: string) => {
    setModalContext(context);
    setShowCartModal(true);
  };

  const handleCloseModal = () => {
    setShowCartModal(false);
    setModalContext(null);
  };

  const handleSaveCart = async () => {
    await saveCartItems(
      cartState.cartItems,
      cartState.appliedCoupon?.couponCode
    );
  };

  const data: any = queryClient.getQueryData(["product", selectedColor]);

  console.log("🚀 ~ ProductPage ~ data:DATA-CACHE", data?.product);

  return (
    <QueryStatus
      isLoading={loading || !data}
      isError={!!error}
      error={error}
      // isLoading={productQuery.isLoading}
      // isError={productQuery.isError}
      // error={productQuery.error}
      className="h-[calc(100vh-96px)] min-w-[320px] max-w-[1920px] w-full mx-0"
    >
      <div className="min-h-screen">
        {showCartModal && (
          <CartModal
            numItemsInCart={cartState.numItemsInCart}
            productAddedToCart={productAddedToCart}
            modalContext={modalContext}
            handleCloseModal={handleCloseModal}
            handleSaveCart={handleSaveCart}
          />
        )}

        <ProductInformation
          product={data?.product}
          // product={productQuery?.data?.product}
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
    </QueryStatus>
  );
};

export default ProductPage;

// another possibility is to use all the colors of the product concerned

// const { data, isLoading, isError, error } = useQuery({
//   queryKey: ["product", selectedColor],
//   queryFn: () => getProduct(productSlug, selectedColor),
//   enabled: !!selectedColor && !!productSlug, // Exécute uniquement si les valeurs sont valides
// });//to get alls colors

// export const usePrefetchAllProductVariants = async (
//   slug: string,
//   colors: { _id: string; hexCode: string; image: string; name: string }[],
//   queryClient: any
// ) => {
//  // Pre-load all product variants into cache
//   await Promise.all(
//     colors.map(({ name: color }) =>
//       queryClient.prefetchQuery({
//         enabled: !!color && !!slug,
//         queryKey: ["product", slug, color],
//         queryFn: () => getProduct(slug, color),
//       })
//     )
//   );
// };

//   // useEffect to retrieve data from the cache or preload them
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!productSlug || !productColors || productColors.length === 0) return;

//       setLoading(true);
//       setError(null);

//      // Check if data is already in the cache
//       const cachedData = productColors.every(({ name: color }) =>
//         queryClient.getQueryData(["product", productSlug, color])
//       );

//       // If the data are all in the cache, there's no need to preload them again
//       if (cachedData) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // If data is missing, preload data
//         await usePrefetchAllProductVariants(productSlug, productColors, queryClient);
//       } catch (err: any) {
//         if (err instanceof Error) {
//           setError(err);
//         } else {
//           setError(new Error("Une erreur inconnue s'est produite"));
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [productSlug, productColors, queryClient]);

//  // Check if data is in cache or display loading/error
//   const data = productColors.map(({ name: color }) =>
//     queryClient.getQueryData(["product", productSlug, color])
//   );

//   if (loading) return <div>Chargement...</div>;
//   if (error) return <div>Erreur : {error.message}</div>;

//   if (!data || data.some((item) => item === undefined)) {
//     return <div>Produit introuvable</div>;
//   }

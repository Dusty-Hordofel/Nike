import { getProduct } from "@/services/client/user/products.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProduct = (slug: string, color: string) => {
  const queryClient = useQueryClient();
  const cachedProduct = queryClient.getQueryData(["product", slug, color]);

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery({
    enabled: !!color && !!slug,
    queryKey: ["product", slug, color],
    staleTime: 1000 * 60 * 60 * 24 * 30,
    gcTime: 1000 * 60 * 60 * 24 * 30,
    queryFn: async () => {
      const { product } = await getProduct(slug, color);
      return product;
    },
    initialData: cachedProduct,
  });

  return {
    product,
    isProductLoading,
    isProductError,
    productError,
    // cachedProduct,
  };
};

// const SubProductComponent = ({ selectedColor }) => {
//   const { data: subProduct, isLoading } = useQuery(
//     ['subProduct', selectedColor],
//     () => fetchSubProductByColor(selectedColor),
//     { enabled: !!selectedColor }
//   );

//   if (isLoading) return <p>Chargement...</p>;

//   return (
//     <div>
//       {/* Affichage des détails de sous-produit ici */}
//     </div>
//   );
// };
// type color = {
//   _id: string;
//   hexCode: string;
//   image: string;
//   name: string;
// };
// hexCode: "#F5F5DC";
// image: "https://res.cloudinary.com/dgsc66scx/image/upload/v1729633102/yosqx9c8ezrrnwvxv7tw.webp";
// name: "Beige";
// _id: "67181b4fa75cb246c5dae571";

export const usePrefetchAllProductVariants = async (
  slug: string,
  colors: { _id: string; hexCode: string; image: string; name: string }[],
  queryClient: any
) => {
  await Promise.all(
    colors.map(({ name: color }) =>
      queryClient.prefetchQuery({
        enabled: !!color && !!slug,
        queryKey: ["product", slug, color],
        queryFn: () => getProduct(slug, color),
        staleTime: 1000 * 60 * 60 * 24 * 30,
        gcTime: 1000 * 60 * 60 * 24 * 30,
      })
    )
  );
};

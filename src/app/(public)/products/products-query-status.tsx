import Loader from "@/components/ui/loader";
import { cn } from "@/lib/common/utils";

export const ProductsQueryStatus = ({
  isLoading,
  isError,
  error,
  data,
  children,
  className,
}: any) => {
  const isEmpty =
    !data?.products ||
    !Array.isArray(data.products) ||
    data.products.length === 0;

  //   console.log("🚀 ~ isEmpty:EMPTY", isEmpty);
  //   console.log("🚀 ~ isEmpty:LOLO", isLoading);
  //   console.log("🚀 ~ isEmpty:DATA QUERY ", data);

  if (isLoading && isEmpty) {
    return (
      <div
        className={cn(
          "max-w-[1090px] px-[6px] mx-auto h-screen bg-white",
          className
        )}
      >
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {error?.message}</h1>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center text-gray-500">Aucun produit disponible.</div>
    );
  }

  return <>{children}</>;
};

// Utilisation du composant
//   <ProductsQueryStatus isLoading={isLoading} isError={isError} error={error} data={data}>
//     <ProductsList
//       filteredProducts={data.products}
//       isLargeScreen={isLargeScreen}
//       showSidebar={showSidebar}
//     />
//   </ProductsQueryStatus>

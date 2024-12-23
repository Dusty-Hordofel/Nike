import Loader from "@/components/ui/loader";
import { cn } from "@/lib/common/utils";

export const ProductsQueryStatus = ({
  isLoading,
  isError,
  error,
  data,
  children,
  className,
  isSuccess,
}: any) => {
  const isEmpty =
    !data?.products ||
    !Array.isArray(data.products) ||
    data.products.length === 0;

  console.log("🚀 ~ isEmpty:", isEmpty);
  console.log("🚀 ~ DATA:TALA", data);
  // console.log("🚀 ~ DATA:", data.products);
  console.log("🚀 ~ ISuccess:", isSuccess);

  //   console.log("🚀 ~ isEmpty:EMPTY", isEmpty);
  //   console.log("🚀 ~ isEmpty:LOLO", isLoading);
  //   console.log("🚀 ~ isEmpty:DATA QUERY ", data);

  // if (isLoading && isEmpty) {
  //   return (
  //     <div
  //       className={cn(
  //         "max-w-[1090px] px-[6px] mx-auto h-screen bg-white",
  //         className
  //       )}
  //     >
  //       <div className="flex justify-center items-center h-full">
  //         <Loader />
  //       </div>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="max-w-[1090px] px-[6px] mx-auto h-screen">
  //       <div className="flex justify-center items-center h-full">
  //         <h1>Error: {error?.message}</h1>
  //       </div>
  //     </div>
  //   );
  // }

  // if (isEmpty) {
  //   return (
  //     <div className="text-center text-gray-500">Aucun produit disponible.</div>
  //   );
  // }

  // const { data, isLoading, isError, isSuccess } = queryResult;

  const isOnline = navigator.onLine;

  if (!isOnline) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          No Internet connection. Please check your network.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          Something went wrong while fetching Products. Please try again later.
        </div>
      </div>
    );
  }

  if (isSuccess && isEmpty === true) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          No products available.
        </div>
      </div>
    );
  }

  return null;
};

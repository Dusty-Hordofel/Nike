import { getProducts } from "@/services/client/user/products.service";
import React, { Suspense } from "react";
import ProductsPage from "./products-page";

const ProductsPageServer = async () => {
  const data = await getProducts();
  console.log("🚀 ~ ProductsPageServer ~ products:", data);

  return (
    // <Suspense
    //   fallback={
    //     <div className="w-full h-screen flex items-center justify-center">
    //       <h2 className="font-extrabold text-4xl min-[450px]:text-5xl  sm:text-6xl md:text-7xl">
    //         <Loader />
    //       </h2>
    //     </div>
    //   }
    // >
    <ProductsPage data={data} />
    // </Suspense>
  );
};

export default ProductsPageServer;

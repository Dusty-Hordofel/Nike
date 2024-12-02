//Mise en place de la récupération des produits côté server coté server
import { getProducts } from "@/services/client/user/products.service";
import React, { Suspense } from "react";
import ProductsList from "../../products/products-list";
import Loader from "@/components/ui/loader";

type Props = {};

const page = async (props: Props) => {
  const products = await getProducts();
  console.log("🚀 ~ page ~ products:", products);

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
    <ProductsList
      filteredProducts={products}
      // isLargeScreen={isLargeScreen}
      // showSidebar={showSidebar}
    />
    // </Suspense>
  );
};

export default page;

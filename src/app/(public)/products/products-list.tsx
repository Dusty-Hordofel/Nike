import { Product } from "@/@types/admin/admin.products.interface";
import ProductCard from "@/components/common/product/product-card/product-card";
import Loader from "@/components/ui/loader";

import { cn } from "@/lib/common/utils";

const ProductsList = ({
  showSidebar,
  isLargeScreen,
  filteredProducts,
}: any) => {
  // console.log("🚀 ~ filteredProducts:FILTER-PRODUCTS", filteredProducts);
  // const handleMouseEnter = () => {};

  return (
    <section
      className={cn(
        filteredProducts.length > 0
          ? "grid grid-cols-2 min-[960px]:grid-cols-3 gap-4 min-[960px]:px-11"
          : "flex items-center justify-center",
        "h-max w-full"
      )}
    >
      {filteredProducts.length > 0 ? (
        filteredProducts?.map((product: Product) => (
          <ProductCard product={product} key={Number(product._id)} />
        ))
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <h2 className="font-extrabold text-4xl min-[450px]:text-5xl  sm:text-6xl md:text-7xl">
            No Product Found
            {/* <Loader /> */}
          </h2>
        </div>
      )}
    </section>
  );
};

export default ProductsList;

import { Product } from "@/@types/admin/admin.products.interface";
import ProductCard from "@/components/common/product/product-card/product-card";

const ProductsList = ({
  showSidebar,
  isLargeScreen,
  filteredProducts,
}: any) => {
  console.log("🚀 ~ filteredProducts:OLOM", filteredProducts);

  return (
    <section
      className={`${filteredProducts.length > 0 ? "grid grid-cols-2 min-[960px]:grid-cols-3 gap-4 px-11 overflow-y-auto" : "flex items-center justify-center"} h-[calc(100vh-56px)] w-full`}
    >
      {filteredProducts.length > 0 ? (
        filteredProducts?.map((product: Product) => (
          <ProductCard product={product} key={Number(product._id)} />
        ))
      ) : (
        <div className=" w-full h-full flex items-center justify-center">
          <h2 className="font-extrabold text-4xl min-[450px]:text-5xl  sm:text-6xl md:text-7xl">
            Product Not Found
          </h2>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
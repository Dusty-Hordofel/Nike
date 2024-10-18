import ProductCard from "@/components/common/product/product-card/product-card";
import { IProduct } from "@/models/product.model";

const ProductsList = ({
  showSidebar,
  isLargeScreen,
  filteredProducts,
}: any) => {
  return (
    <section
      className={`grid grid-cols-2 min-[960px]:grid-cols-3 gap-4 px-11 bg-blue-300 overflow-y-auto ${showSidebar && isLargeScreen ? "w-[83%]" : "w-full"} transition-all duration-200 h-max`}
    >
      {filteredProducts?.map((product: IProduct) => (
        <ProductCard product={product} key={Number(product._id)} />
      ))}
    </section>
  );
};

export default ProductsList;

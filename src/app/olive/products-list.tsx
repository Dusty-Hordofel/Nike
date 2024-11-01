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
      className={`grid grid-cols-2 min-[960px]:grid-cols-3 gap-4 px-11 overflow-y-auto  h-[calc(100vh-56px)] w-full`}
    >
      {filteredProducts?.map((product: Product) => (
        <ProductCard product={product} key={Number(product._id)} />
      ))}
    </section>
  );
};

export default ProductsList;

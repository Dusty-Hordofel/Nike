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
      className={`grid grid-cols-2 min-[960px]:grid-cols-3 gap-4 px-11 bg-blue-300 overflow-y-auto ${showSidebar && isLargeScreen ? "w-[83%]" : "w-full"} transition-all duration-200 h-max`}
    >
      {filteredProducts?.map((product: Product) => (
        <ProductCard product={product} key={Number(product._id)} />
      ))}
      {/* {filteredProducts?.map((product: Product) => {
        const filteredSubproducts =
          product.subProducts.length > 0 &&
          product.subProducts.map((subProduct: any) => {
            console.log(
              "🚀 ~ product.subProducts.map ~ subProduct:",
              subProduct
            );

            return (
              <div className="flex flex-col">
                <picture className="product-card-image">
                  <img
                    src={subProduct.images[0].url}
                    alt={`${product.name} ${product.category} ${subProduct.id}`}
                    className="aspect-square object-cover"
                    // className="h-[200px]  w-full object-cover"
                    // className="h-[372px] w-full object-cover"
                  />
                </picture>
                <p>{subProduct.price}</p>
              </div>
            );
          });
        console.log(
          "🚀 ~ {filteredProducts?.subProducts?.map ~ filteredSubproducts:SUBIBOR",
          filteredSubproducts
        );

        return filteredSubproducts;
        // <ProductCard product={product} key={Number(product._id)} />
      })} */}
    </section>
  );
};

export default ProductsList;

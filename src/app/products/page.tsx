"use client";
import ProductCard from "@/components/product/product-card/product-card";
import { useProducts } from "@/hooks/useProductData";
import { IProduct } from "@/models/Product";

interface IProducts {
  products: IProduct[];
  isProductsLoading: boolean;
  isProductsError: boolean;
}

const ProductsPage = () => {
  const { products, isProductsLoading, isProductsError }: IProducts =
    useProducts();

  if (isProductsLoading) return <p>Loading...</p>;
  if (isProductsError) return <p>Error...</p>;

  return (
    <div className="flex py-10">
      <div className="h-screen w-[260px] bg-blue-200"></div>
      <main className="min-h-screen flex-1">
        <section className="grid grid-cols-3 gap-4 px-11">
          {products.map((product) => {
            return <ProductCard product={product} key={Number(product._id)} />;
          })}
        </section>
      </main>
    </div>
  );
};

export default ProductsPage;

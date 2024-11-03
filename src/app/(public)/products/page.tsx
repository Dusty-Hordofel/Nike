"use client";

import { useQuery } from "@tanstack/react-query";

const ProductsPage = () => {
  const productsQuery =
    useQuery({
      queryKey: ["products"],
      queryFn: () => fetch(`/api/products`).then((res) => res.json()),
    }) || [];

  if (productsQuery.isLoading) return <p>Loading...</p>;
  if (productsQuery.isError) return <p>Error...</p>;

  const { products } = productsQuery.data;

  return (
    <div className="flex py-10">
      <div className="h-screen w-[260px] bg-blue-200"></div>
      <main className="min-h-screen flex-1">
        {/* <section className="grid grid-cols-3 gap-4 px-11">
          {products.map((product: IProduct) => {
            return <ProductCard product={product} key={Number(product._id)} />;
          })}
        </section> */}
      </main>
    </div>
  );
};

export default ProductsPage;

"use client";
import ProductCard from "@/components/products/productCard/ProductCard";
import ProductCardImage from "@/components/products/productCard/ProductCardImage";
import { useProducts } from "@/hooks/useProductData";
import { IProduct } from "@/models/Product";
import { useState } from "react";

interface IProducts {
  products: IProduct[];
  isProductsLoading: boolean;
  isProductsError: boolean;
}

const ProductsPage = () => {
  const { products, isProductsLoading, isProductsError }: IProducts =
    useProducts();
  console.log("OLIB", window.innerWidth);

  console.log(process.env.NEXT_PUBLIC_BASE_URL);

  if (isProductsLoading) return <p>Loading...</p>;
  if (isProductsError) return <p>Error...</p>;

  console.log("🚀 ~ ProductsPage ~ productsFF:", products);
  const bestSeller = true;
  const newRelease = false;

  return (
    <>
      <div className="grid-container">
        <div className="card">
          <h2>Card 1</h2>
          <p className="group">
            MOLO Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            <p className="oli hidden group-hover:block">
              {" "}
              500px.Content with a height of 500px. Content with a height of
              500px. Content with a height of 500px. Content with a height of
              500px.Content with a height of 500px. Content with a height of
              500px
            </p>
          </p>
        </div>
        <div className="card">
          <h2>Card 2</h2>
          <p>Content with a height of 300px.</p>
        </div>
        <div className="card">
          <h2>Card 3</h2>
          <p>Content with a height of 600px.</p>
        </div>
      </div>
      {/* 2 */}
      <div className="flex py-10">
        <div className="h-screen w-[20%] bg-blue-200"></div>
        <main className="min-h-screen w-[80%] bg-blue-400">
          <section className="grid grid-cols-3 gap-4 px-11 bg-blue-100 ">
            {products.map((product, index) => {
              return (
                <figure key={Number(product._id)} className="bg-warning">
                  {/* <ProductCardImage =/> */}

                  {/* <picture className="product-card-image">
                    <img
                      src={product.subProducts[index]?.images[index].url}
                      alt=""
                      // alt={`${product.subProducts[index].}`}
                      className="h-[372px] w-full object-cover"
                    />
                  </picture> */}
                  <div className="product-card-info pt-3 pb-[2px]">
                    {newRelease || bestSeller ? (
                      <div className=" product-card-announcement font-medium text-[#9E3500]">
                        {newRelease ? "Dernières sorties" : "Meilleure vente"}
                      </div>
                    ) : null}
                    <div className="product-card-titles">
                      <div className="product-card-title font-medium">
                        {product.name}
                      </div>
                      <div className="product-card-subtitle text-gray-500">
                        Chaussure pour Homme
                      </div>
                    </div>

                    <div className="product-card-colors text-gray-500 pb-[10px]">
                      1 Couleur
                    </div>
                    <div className="product-price">89,99 €</div>
                  </div>
                </figure>
              );
            })}
          </section>
        </main>
      </div>
      {/* 3 */}
      <div className="flex py-10">
        <div className="h-screen w-[20%] bg-blue-200"></div>
        <main className="min-h-screen w-[80%] bg-blue-400">
          <section className="grid grid-cols-3 gap-4 px-11 bg-blue-100">
            {products.map((product, index) => {
              return (
                <ProductCard product={product} key={Number(product._id)} />
              );
            })}
          </section>
        </main>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <figure className="bg-orange">
          <h2>Card 1</h2>
          <p className="group">
            MOLO Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of MOLO
            Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of MOLO
            Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of MOLO
            Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            500px.Content with a height of 500px. Content with a height of
            <p className="oli hidden group-hover:block">
              {" "}
              500px.Content with a height of 500px. Content with a height of
              500px. Content with a height of 500px. Content with a height of
              500px.Content with a height of 500px. Content with a height of
              500px
            </p>
          </p>
        </figure>
        <figure className="bg-yellow-400">
          <h2>Card 2</h2>
          <p>Content with a height of 300px.</p>
        </figure>
        <figure className="bg-blue-200">
          <h2>Card 3</h2>
          <p>Content with a height of 600px.</p>
        </figure>
      </div>
    </>
  );
};

export default ProductsPage;

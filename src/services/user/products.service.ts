const getProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  );
  const { products } = await response.json();
  return products;
};

const getProduct = async (slug: string, color: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${slug}?color=${color}`
  );
  const product = await response.json();
  return product;
};

export { getProducts, getProduct };

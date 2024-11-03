const getProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  );
  const { products } = await response.json();
  return products;
};

const getProduct = async (slug: string, style: number, size: number) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      style,
      size,
      slug,
    }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}?style=${style}&size=${size}`,
    requestOptions
  );
  const product = await response.json();
  return product;
};

export { getProducts, getProduct };

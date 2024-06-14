const getProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  );
  const data = await response.json();
  return data;
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

export const lookupEmail = async (email: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/lookup`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
};

export { getProducts, getProduct };

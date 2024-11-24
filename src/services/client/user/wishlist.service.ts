const addProductToWishlist = async (productInformation: {
  userId: string;
  slug: string;
  color: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${productInformation.userId}/wishlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: productInformation.slug,
        color: productInformation.color,
      }),
    }
  );
  return response.json();
};

export { addProductToWishlist };

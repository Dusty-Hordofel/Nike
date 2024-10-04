import { IProduct } from "@/models/Product";

// Omit<IProduct, "Document">
const createProduct = async (productInformation: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productInformation),
    }
  );
  return response.json();
};

export { createProduct };

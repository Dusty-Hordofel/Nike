import { IProduct } from "@/models/product.model";

// Omit<IProduct, "Document">
const adminCreateProduct = async (productInformation: any) => {
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

const adminGetProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/products`
  );
  if (!response.ok) throw new Error("Failed to fetch categories.");

  const data = await response.json();

  return data.products;
};

const adminDeleteProduct = async (productInformation: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/products`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productInformation),
    }
  );
  return response.json();
};

const adminDeleteProductVariant = async ({
  productId,
  subProductId,
  subProductIndex,
}: {
  productId: string;
  subProductId: string;
  subProductIndex: number;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/products/${productId}/subproducts/${subProductId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subProductIndex }),
    }
  );
  return response.json();
};

// : {
//   id: string;
//   name: string;
//   image: string;
//   parent: string;
// }

const adminUpdateProduct = async (productInformation: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/products`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productInformation),
    }
  );
  return response.json();
};

export {
  adminCreateProduct,
  adminGetProducts,
  adminDeleteProduct,
  adminUpdateProduct,
  adminDeleteProductVariant,
};

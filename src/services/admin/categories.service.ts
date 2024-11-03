import { FetchCategoriesResponse } from "@/@types/admin/admin.categories.interface";
import { Item } from "@/@types/admin/admin.item.interface";

// services/categoryService.ts

const createCategory = async (categoryInformation: {
  name: string;
  image: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/categories`,
    {
      method: "POST",
      body: JSON.stringify(categoryInformation),
    }
  );
  return response.json();
};

const getCategories = async (): Promise<[] | Item[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/categories`
  );
  if (!response.ok) throw new Error("Failed to fetch categories.");

  // const { categories } = await response.json();
  // return categories;

  const data: FetchCategoriesResponse = await response.json();

  return data.categories;
};

const updateCategory = async (categoryInformation: {
  id: string;
  name: string;
  image: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/categories`,
    {
      method: "PUT",
      body: JSON.stringify(categoryInformation),
    }
  );
  return response.json();
};

const deleteCategory = async (categoryInformation: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/categories`,
    {
      method: "DELETE",
      body: JSON.stringify(categoryInformation),
    }
  );
  return response.json();
};

export { createCategory, getCategories, updateCategory, deleteCategory };

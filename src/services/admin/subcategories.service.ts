// import { SubCategory } from "./../../@types/admin/admin.subcategories.interface";
import { Item } from "@/@types/admin/admin.item.interface";
import { FetchSubCategoriesResponse } from "@/@types/admin/admin.subcategories.interface";
// import { isvalidParentId } from "@/lib/utils";
import mongoose from "mongoose";

const createSubCategory = async (subCategoryInformation: {
  name: string;
  image: string;
  parent: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subCategoryInformation),
    }
  );
  return response.json();
};

const deleteSubCategory = async (subCategoryInformation: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subCategoryInformation),
    }
  );
  return response.json();
};

const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

const getSubCategories = async (parent?: string): Promise<[] | Item[]> => {
  if (parent && !isValidObjectId(parent)) {
    throw new Error("Invalid parent ID format");
  }
  // if (parent && !isvalidParentId(parent)) {
  //   throw new Error("Invalid parent ID format");
  // }

  const url = parent
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories?parent=${encodeURIComponent(parent)}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`;

  // try {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data: FetchSubCategoriesResponse = await response.json();

  return data.subCategories;
  // } catch (error: any) {
  //   console.error("Error fetching subcategories:", error);
  //   throw new Error(error.message);
  // }
};

const updateSubCategory = async (subCategoryInformation: {
  id: string;
  name: string;
  image: string;
  parent: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subCategoryInformation),
    }
  );
  return response.json();
};

export {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  updateSubCategory,
};

import React from "react";
import { isValidObjectId } from "mongoose";

// Types pour la réponse attendue
interface SubCategory {
  _id: string;
  name: string;
  parent: {
    name: string;
  };
}

interface FetchSubCategoriesResponse {
  success: boolean;
  error: boolean;
  subCategories?: SubCategory[];
  message?: string;
}

type Props = {};

const OlivePage = (props: Props) => {
  return <div>OlivePage</div>;
};

export default OlivePage;

// Fonction pour valider l'ObjectId (si nécessaire)
const validateParentId = (parent: string | undefined): boolean => {
  if (!parent) return true; // Si `parent` est undefined, c'est valide
  return isValidObjectId(parent); // Si parent est défini, vérifier son format
};

// Fonction pour récupérer les sous-catégories
export const fetchSubCategories = async (
  parent?: string
): Promise<FetchSubCategoriesResponse> => {
  if (parent && !validateParentId(parent)) {
    throw new Error("Invalid parent ID format");
  }

  // Construire l'URL avec ou sans le paramètre `parent`subcategories
  const url = parent
    ? `/api/admin/olive?parent=${encodeURIComponent(parent)}`
    : "/api/admin/olive";

  try {
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

    if (data.error) {
      throw new Error(data.message || "An unknown error occurred");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching subcategories:", error);
    throw new Error(error.message);
  }
};

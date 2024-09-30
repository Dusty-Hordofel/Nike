import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";
import { isValidObjectId } from "mongoose";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//  const isValidObjectId = (id: string): boolean => {
//   return mongoose.Types.ObjectId.isValid(id);
// };

const isvalidParentId = (parent: string | undefined): boolean => {
  if (!parent) return true; // Si `parent` est undefined, c'est valide
  return isValidObjectId(parent); // Si parent est défini, vérifier son format
};

const getCardBrandImage = (brand: string) => {
  switch (brand?.toUpperCase()) {
    case "VISA":
      return "/images/visa.png"; // Chemin vers le logo Visa
    case "MASTERCARD":
      return "/images/mastercard.png"; // Chemin vers le logo Mastercard
    case "AMEX":
      return "/images/amex.png"; // Chemin vers le logo American Express
    default:
      return "/images/default-card.png"; // Image par défaut
  }
};

export { cn, isvalidParentId, getCardBrandImage };

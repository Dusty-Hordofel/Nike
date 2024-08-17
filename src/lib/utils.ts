import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const getCardBrandImage = (brand: string) => {
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

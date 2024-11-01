import { Types } from "mongoose";

export interface Review {
  reviewBy: Types.ObjectId;
  rating: number;
  review: string;
  size?: string;
  style?: {
    color: string;
    image: string;
  };
  fit?: string;
  images: string[];
  likes: Types.ObjectId[];
}

export interface SubProduct {
  _id: Types.ObjectId;
  images: [{ public_url: string; url: string }];
  description_images?: string[];
  color: {
    _id: string;
    name: string;
    hexCode: string;
    image: string;
  };
  price: number;
  sizes: {
    size: string;
    qty: number;
  }[];
  discount: number;
  sold?: number;
}

// Enum pour les genres d'adultes et d'enfants
export enum AdultGender {
  Male = "male",
  Female = "female",
  Unisex = "unisex",
}

export enum KidsGender {
  Boy = "boy",
  Girl = "girl",
  Unisex = "unisex",
}

// Enum pour les marques
export enum Brand {
  NikeSportswear = "Nike Sportswear",
  Jordan = "Jordan",
  NikeByYou = "Nike By You",
  NikeLab = "NikeLab",
  ACG = "ACG",
  NikePro = "Nike Pro",
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  slug?: string;
  category: string;
  subCategories: string[];
  details?: { name: string; value: string }[];
  questions?: { question: string; answer: string }[];
  reviews?: Review[];
  refundPolicy?: string;
  brand: Brand;
  featured?: boolean;
  rating?: number;
  numReviews?: number;
  shipping: number;
  productType: string;
  subProducts: SubProduct[];
  // adultGender?: AdultGender;
  // kidsGender?: KidsGender; // optionnel si "kids" est false
  // kids?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDocument extends Omit<Product, "_id">, Document {}

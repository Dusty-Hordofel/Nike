export interface TrendCrossProps {
  title: string;
  price: string;
}

export interface TrendSlidesProps {
  title: string;
  img: string;
  imageWidth: number;
  imageHeight: number;
  active: boolean;
  centered?: boolean;
  type?: string;
  exclusive?: string;
  prix?: string;
  cross?: TrendCrossProps[];
}

export interface Application {
  title?: string;
  img: string;
  category?: string;
}

export interface ApplicationCardProps {
  applications: Application[];
}

export interface UserData {
  email?: string | null;
  password?: string;
  genderPreference?: string;
  lastName?: string;
  firstName?: string;
}
export interface userEmail {
  email: string;
}

export type ProductColorProps = {
  name: string;
  color: string;
};

interface Review {
  reviewBy: { $oid: string };
  rating: number;
  review: string;
  size: string;
  style: { color: string; image: string };
  fit: string;
  images: Array<{ url: string; public_url: string }>;
  _id: { $oid: string };
  createdAt: { $date: string };
  updatedAt: { $date: string };
}

export interface Size {
  size: string;
  qty: number;
  price: number;
  _id: { $oid: string };
}

export interface SubProduct {
  sku?: string;
  discount: number;
  images: Array<{ url: string; public_url: string }>;
  description_images: Array<any>; // Ajoutez le type approprié pour description_images
  color: { color: string; image: string };
  sizes: Size[];
  _id: { $oid: string };
}

export type IProduct = {
  _id: { $oid: string };
  name: string;
  description: string;
  brand: string;
  slug: string;
  category: { $oid: string };
  subCategories: Array<{ $oid: string }>;
  details: Array<{ name: string; value: string; _id: { $oid: string } }>;
  questions: any[]; // Ajoutez le type approprié pour questions
  shipping: number;
  subProducts: SubProduct[];
  numReviews: number;
  rating: number;
  refundPolicy: string;
  reviews: Review[];
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
} & {
  bestSeller?: boolean;
  newRelease?: boolean;
};

export interface CardContentProps {
  prices: number[];
  subProducts: SubProduct[];
  active: number;
  name: string;
  category?: string;
  productColors: {
    image: string;
    color: string;
  }[];
  bestSeller: boolean;
  newRelease: boolean;
}

import { ISubProduct } from "@/models/product.model";

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

export interface CardContentProps {
  prices: number[];
  subProducts: ISubProduct[];
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

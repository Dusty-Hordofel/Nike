import { SubProduct } from "../admin/admin.products.interface";

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

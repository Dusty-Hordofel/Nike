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
  label?: string;
}

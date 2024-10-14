interface CardImageProps {
  images: { url: string }[];
  name: string;
  category?: string;
  active: number;
}
const ProductCardImage = ({
  images,
  name,
  category,
  active,
}: CardImageProps) => (
  <picture className="product-card-image">
    <img
      src={images[active].url}
      alt={`${name} ${category}`}
      className="h-[372px] w-full object-cover"
    />
  </picture>
);

export default ProductCardImage;

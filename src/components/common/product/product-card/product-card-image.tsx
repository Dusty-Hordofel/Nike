interface CardImageProps {
  images: { url: string; public_url: string }[];
  name: string;
  category?: string;
}
const ProductCardImage = ({ images, name, category }: CardImageProps) => {
  return (
    <>
      {images?.length > 0 && (
        <picture className="product-card-image">
          <img
            src={images[0].url}
            alt={`${name} ${category}`}
            className="aspect-square object-cover"
          />
        </picture>
      )}
    </>
  );
};

export default ProductCardImage;

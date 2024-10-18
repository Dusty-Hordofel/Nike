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
            // className="h-[200px]  w-full object-cover"
            // className="h-[372px] w-full object-cover"
          />
        </picture>
      )}
    </>
  );
};

export default ProductCardImage;

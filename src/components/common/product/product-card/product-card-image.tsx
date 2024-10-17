interface CardImageProps {
  images: { url: string; public_url: string }[];
  name: string;
  category?: string;
  active: number;
}
const ProductCardImage = ({
  images,
  name,
  category,
  active,
}: CardImageProps) => {
  console.log("🚀 ~ images:IMG", images?.length > 0);
  // console.log("🚀 ~ images:IMG", images[0]);

  return (
    <>
      {images?.length > 0 && (
        <picture className="product-card-image">
          <img
            src={images[0].url}
            alt={`${name} ${category}`}
            className="h-[372px] w-full object-cover"
          />
        </picture>
      )}
    </>
  );
};

export default ProductCardImage;

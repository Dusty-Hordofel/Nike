import { SubProduct } from "@/@types/admin/admin.products.interface";
import { cn } from "@/lib/common/utils";

interface CardColorProps {
  productColors: {
    _id: string;
    name: string;
    hexCode: string;
    image: string;
  }[];
  subProducts: SubProduct[];
  setImages: React.Dispatch<
    React.SetStateAction<
      [
        {
          public_url: string;
          url: string;
        }
      ]
    >
  >;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const ProductCardColor = ({
  productColors,
  subProducts,
  setImages,
  setActive,
}: CardColorProps) => {
  // console.log("🚀 ~ productColors:COLOR VOIR", productColors);
  return (
    <div className=" gap-2 pb-[10px]  group-hover:flex hidden">
      {productColors
        ? productColors.map(({ image, hexCode, name, _id }, index) => {
            return image ? (
              <picture key={`${name}-${_id}-${hexCode}`}>
                <img
                  src={image}
                  alt="image card color"
                  className={cn(
                    // i === active && "outline border border-black-200",
                    "w-10 h-10 object-cover"
                  )}
                  onMouseOver={() => {
                    // setImages(subProducts[index].images);
                    // setImages(subProducts[index].images);
                    setActive(index);
                  }}
                />
              </picture>
            ) : (
              <span
                key={index}
                style={{ backgroundColor: `${hexCode}` }}
                onMouseOver={() => {
                  // setImages(subProducts[index].images);
                  setActive(index);
                }}
              ></span>
            );
          })
        : null}
    </div>
  );
};

export default ProductCardColor;

import { SubProduct } from "@/@types/admin/admin.products.interface";
import { cn } from "@/lib/utils";
// import { ISubProduct } from "@/models/product.model";
// import { SubProduct } from "@/types/types";
import Image from "next/image";

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
        },
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
  // active
}: CardColorProps) => {
  // console.log("🚀 ~ subProducts:SUBPRO", subProducts);

  return (
    <div className=" gap-2 pb-[10px]  group-hover:flex hidden">
      {productColors
        ? productColors.map(({ image, hexCode }, index) => {
            // console.log(`🚀 INDEX ${index}`, subProducts[index]);
            return image ? (
              <picture key={index}>
                <img
                  src={image}
                  alt="image card color"
                  className={cn(
                    // i === active && "outline border border-black-200",
                    "w-10 h-10 object-cover"
                  )}
                  onMouseOver={() => {
                    setImages(subProducts[index].images);
                    setActive(index);
                  }}
                />
              </picture>
            ) : (
              <span
                key={index}
                style={{ backgroundColor: `${hexCode}` }}
                onMouseOver={() => {
                  setImages(subProducts[index].images);
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

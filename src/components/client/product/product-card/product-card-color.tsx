import { cn } from "@/lib/utils";
import { ISubProduct } from "@/models/Product";
// import { SubProduct } from "@/types/types";
import Image from "next/image";

interface CardColorProps {
  productColors: {
    image: string;
    color: string;
  }[];
  subProducts: ISubProduct[];
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
}: CardColorProps) => (
  <div className=" gap-2 pb-[10px]  group-hover:flex hidden">
    {productColors
      ? productColors.map(({ image, color }, index) =>
          image ? (
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
              style={{ backgroundColor: `${color}` }}
              onMouseOver={() => {
                setImages(subProducts[index].images);
                setActive(index);
              }}
            ></span>
          )
        )
      : null}
  </div>
);

export default ProductCardColor;

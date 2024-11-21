"use client";
// import { Chevron } from "@/assets/icons";
import Image from "next/image";
import { useState } from "react";
import { ArrowButton } from "../../../ui/buttons/arrow-button/arrow-button";

interface ProductImagesProps {
  images: {
    public_url: string;
    url: string;
  }[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    if (currentIndex === 0) {
      return setCurrentIndex(images.length - 1);
    }
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  const nextSlide = () => {
    if (currentIndex === images.length - 1) {
      return setCurrentIndex(0);
    }
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

  const handleImageChange = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <div className="hidden min-[960px]:flex w-[calc(100%-456px)]   h-[669px] pl-12 mt-12 gap-x-4 mx-2 sticky top-0">
      <ul className="flex flex-col gap-2 overflow-y-scroll">
        {images?.map(({ url }, index) => {
          return (
            <li
              key={index}
              className={`${
                index === currentIndex
                  ? "after:opacity-40 after:w-full after:h-full after:rounded after:content-[''] after:absolute after:bg-black-100"
                  : "after:hidden hover:after:block after:opacity-40 after:w-full after:h-full after:rounded after:content-[''] after:absolute after:bg-black-100 "
              } flex flex-col gap-4 relative`}
              onMouseOver={() => handleImageChange(index)}
            >
              <div className="rounded object-cover w-[60px] h-[60px] bg-gray-400">
                <Image
                  src={url}
                  width={60}
                  height={60}
                  alt="slides"
                  className="rounded-[4px] object-cover w-[60px] h-[60px]"
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="relative overflow-hidden rounded w-[535px]">
        <Image
          height={100}
          width={535}
          priority
          src={images[currentIndex]?.url}
          alt="slides"
          key={images[currentIndex]?.url}
          className="bg-gray-200 h-full"
        />
        <div className="absolute flex gap-2 bottom-6 right-6">
          <ArrowButton direction="left" onClick={prevSlide} />
          <ArrowButton onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;

import React, { useRef, useState } from "react";

interface Image {
  url: string;
}

const ProductImageSlider = ({ images }: { images: Image[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.offsetWidth;

      const newIndex = Math.round(scrollLeft / containerWidth);
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="relative w-full aspect-square bg-white hidden max-[960px]:block">
      <div
        ref={containerRef}
        className="w-full overflow-x-scroll flex snap-x snap-mandatory gap-x-1 scrollbar-hide"
        onScroll={handleScroll}
      >
        {images?.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Slide ${index}`}
            className="snap-center w-full aspect-square object-cover "
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images?.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              activeIndex === index ? "bg-black-200" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;

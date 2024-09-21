// import React from "react";

// type Props = {};

// const ThumbnailCard = (props: Props) => {
//   return <div>ThumbnailCard</div>;
// };

// export default ThumbnailCard;

import React from "react";

interface ItemCardProps {
  image: string;
  name: string;
  onClick?: () => void;
}

const ItemCard = ({ image, name, onClick }: ItemCardProps) => {
  return (
    <div
      className="bg-gray-200 w-full aspect-square flex justify-center items-center group cursor-pointer "
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onClick}
    >
      <h1 className="text-2xl text-white font-medium group-hover:scale-125 text-shadow transition-all">
        {name}
      </h1>
    </div>
  );
};

export default ItemCard;

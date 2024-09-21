import { Button } from "@/components/ui/buttons/button/button";
import useAdminDeleteCategory from "@/hooks/api/admin/categories/use-admin-delete-category";
import React from "react";

interface ItemCardProps {
  category: { _id: string; name: string; image: string };
  onClick?: () => void;
}

const ItemCard = ({ category, onClick }: ItemCardProps) => {
  const deleteCategory = useAdminDeleteCategory();
  return (
    <div
      className="bg-gray-200 w-full aspect-square flex justify-center items-center group/card cursor-pointer relative"
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${category.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onClick}
    >
      <h1 className="text-2xl text-white font-medium group-hover/card:scale-125 text-shadow transition-all">
        {category.name}
      </h1>

      <button
        className="absolute top-5 right-5 rounded-full size-12 bg-black-200 flex justify-center items-center hover:bg-gray-300 group/button"
        type="button"
        aria-label="Remove"
        name="remove-item-button"
        onClick={async (e) => {
          e.stopPropagation();
          await deleteCategory.mutateAsync({ id: category._id });
        }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          role="img"
          width="24px"
          height="24px"
          fill="none"
          className="fill-white group-hover/button:fill-none"
        >
          <path
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25m0 0h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ItemCard;

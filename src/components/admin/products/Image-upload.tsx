"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const ImageUpload = ({
  register,
  subProductIndex,
  errors,
  existingImages = [],
}: {
  register: any;
  subProductIndex: number;
  errors: any;
  existingImages: { public_url: string; url: string }[];
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (existingImages?.length > 0) {
      const previews = existingImages.map((image) => image.public_url); // ou `image.url` selon ton besoin
      setImagePreviews(previews);
    }
  }, [existingImages]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("🚀 ~ handleImageChange ~ files:", files);
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(fileArray);
    }
  };

  return (
    <div
      className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
    >
      <label className="text-lg">Images</label>
      <Input
        type="file"
        accept="image/*"
        {...register(`subProducts.${subProductIndex}.images` as const)}
        multiple
        onChange={handleImageChange}
      />
      {errors.subProducts?.[subProductIndex]?.images && (
        <p className="px-4 pt-[6px] text-xs ">
          {errors.subProducts[subProductIndex]?.images?.message}
        </p>
      )}

      {/* Afficher les aperçus des images */}
      <div className="image-preview-container flex gap-x-4 mt-4 overflow-x-auto">
        {imagePreviews.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index}`}
            className="w-20 h-20"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;

"use client";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./product-schema";

const ProductForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      subProducts: [{ images: [], color: { color: "", image: "" }, sizes: [] }],
    },
  });

  const {
    fields: subProductFields,
    append: appendSubProduct,
    remove: removeSubProduct,
  } = useFieldArray({
    control,
    name: "subProducts",
  });

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    console.log("DATA", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nom du produit</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>} {/* Validation message */}
      </div>

      {subProductFields.map((subProduct, index) => (
        <SubProductForm
          key={subProduct.id}
          index={index}
          control={control}
          removeSubProduct={removeSubProduct}
          setValue={setValue}
          errors={errors}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          appendSubProduct({
            images: [],
            color: { color: "", image: "" },
            sizes: [],
          })
        }
      >
        Ajouter un sous-produit
      </button>

      <button type="submit">Soumettre</button>
    </form>
  );
};

const SubProductForm = ({
  index,
  control,
  removeSubProduct,
  setValue,
  errors,
}: any) => {
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: `subProducts.${index}.images`,
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `subProducts.${index}.sizes`,
  });

  // Liste de couleurs disponibles
  // const colors = ["noir", "rouge", "jaune", "bleu"];
  // Liste des couleurs avec leurs valeurs hexadécimales
  // const colors = [
  //   { name: "Noir", value: "#000000" },
  //   { name: "Rouge", value: "#FF0000" },
  //   { name: "Jaune", value: "#FFFF00" },
  //   { name: "Bleu", value: "#0000FF" },
  // ];

  return (
    <div>
      <h3>Sous-produit {index + 1}</h3>
      <div>
        <label>Couleur</label>
        <Controller
          name={`subProducts.${index}.color.color`}
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors?.subProducts?.[index]?.color?.color && (
          <p>{errors.subProducts[index].color.color.message}</p>
        )}
        <label>Image de couleur</label>
        <Controller
          name={`subProducts.${index}.color.image`}
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors?.subProducts?.[index]?.color?.image && (
          <p>{errors.subProducts[index].color.image.message}</p>
        )}
      </div>

      <div>
        <label>Images</label>
        {imageFields.map((image, imageIndex) => (
          <div key={image.id}>
            <input
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  const updatedImage = { file: files[0] };
                  setValue(
                    `subProducts.${index}.images.${imageIndex}`,
                    updatedImage
                  );
                }
              }}
            />
            <button type="button" onClick={() => removeImage(imageIndex)}>
              Supprimer l'image
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendImage({ file: undefined })}>
          Ajouter une image
        </button>
        {errors?.subProducts?.[index]?.images && (
          <p>{errors.subProducts[index].images.message}</p>
        )}
      </div>

      <div>
        <h4>Tailles</h4>
        {sizeFields.map((size, sizeIndex) => (
          <div key={size.id}>
            <label>Taille</label>
            <Controller
              name={`subProducts.${index}.sizes.${sizeIndex}.size`}
              control={control}
              render={({ field }) => <input {...field} />}
            />
            {errors?.subProducts?.[index]?.sizes?.[sizeIndex]?.size && (
              <p>{errors.subProducts[index].sizes[sizeIndex].size.message}</p>
            )}
            <label>Quantité</label>
            <Controller
              name={`subProducts.${index}.sizes.${sizeIndex}.qty`}
              control={control}
              render={({ field }) => <input {...field} />}
            />
            {errors?.subProducts?.[index]?.sizes?.[sizeIndex]?.qty && (
              <p>{errors.subProducts[index].sizes[sizeIndex].qty.message}</p>
            )}
            <label>Prix</label>
            <Controller
              name={`subProducts.${index}.sizes.${sizeIndex}.price`}
              control={control}
              render={({ field }) => <input {...field} />}
            />
            {errors?.subProducts?.[index]?.sizes?.[sizeIndex]?.price && (
              <p>{errors.subProducts[index].sizes[sizeIndex].price.message}</p>
            )}
            <button type="button" onClick={() => removeSize(sizeIndex)}>
              Supprimer la taille
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendSize({ size: "", qty: "", price: "" })}
        >
          Ajouter une taille
        </button>
      </div>

      <button type="button" onClick={() => removeSubProduct(index)}>
        Supprimer le sous-produit
      </button>
    </div>
  );
};

export default ProductForm;

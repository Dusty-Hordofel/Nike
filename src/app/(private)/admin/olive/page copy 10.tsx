"use client";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./product-schema";
import { z } from "zod";

const ProductForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      subProducts: [
        {
          images: [],
          color: "",
          sizes: [{ size: "", qty: "", price: "" }],
          discount: 0, // Valeur par défaut
          sold: 0, // Valeur par défaut
        },
      ],
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
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      {subProductFields.map((subProduct, index) => (
        <SubProductForm
          key={subProduct.id}
          index={index}
          control={control}
          removeSubProduct={removeSubProduct}
          errors={errors}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          appendSubProduct({
            images: [],
            color: "",
            sizes: [{ size: "", qty: "", price: "" }],
            discount: 0,
            sold: 0,
          })
        }
      >
        Ajouter un sous-produit
      </button>

      <button type="submit">Soumettre</button>
    </form>
  );
};

const SubProductForm = ({ index, control, removeSubProduct, errors }: any) => {
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

  const colors = [
    { name: "Noir", value: "#000000" },
    { name: "Rouge", value: "#FF0000" },
    { name: "Jaune", value: "#FFFF00" },
    { name: "Bleu", value: "#0000FF" },
  ];

  return (
    <div>
      <h3>Sous-produit {index + 1}</h3>

      <div>
        <label>Couleur</label>
        <Controller
          name={`subProducts.${index}.color`}
          control={control}
          // render={({ field }) => <input {...field} placeholder="#000000" />}
          render={({ field }) => (
            <div>
              <select {...field}>
                <option value="">Sélectionner une couleur</option>
                {colors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>

              {/* Div qui affiche la couleur choisie */}
              {field.value && (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: field.value,
                    border: "1px solid #000",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
          )}
        />
        {errors?.subProducts?.[index]?.color && (
          <p>{errors.subProducts[index].color.message}</p>
        )}
      </div>

      <div>
        {imageFields.map((image, imgIndex) => (
          <div key={image.id}>
            <label>Image {imgIndex + 1}</label>
            <Controller
              name={`subProducts.${index}.images.${imgIndex}.file`}
              control={control}
              render={({ field }) => <input type="file" {...field} />}
            />
            <button type="button" onClick={() => removeImage(imgIndex)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendImage({ file: null })}>
          Ajouter une image
        </button>
        {errors?.subProducts?.[index]?.images && (
          <p>{errors.subProducts[index].images.message}</p>
        )}
      </div>

      <div>
        {sizeFields.map((size, sizeIndex) => (
          <div key={size.id}>
            <label>Taille {sizeIndex + 1}</label>
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

      <div>
        <label>Discount</label>
        <Controller
          name={`subProducts.${index}.discount`}
          control={control}
          render={({ field }) => <input {...field} type="number" />}
        />
        {errors?.subProducts?.[index]?.discount && (
          <p>{errors.subProducts[index].discount.message}</p>
        )}
      </div>

      <div>
        <label>Sold</label>
        <Controller
          name={`subProducts.${index}.sold`}
          control={control}
          render={({ field }) => <input {...field} type="number" />}
        />
        {errors?.subProducts?.[index]?.sold && (
          <p>{errors.subProducts[index].sold.message}</p>
        )}
      </div>

      <button type="button" onClick={() => removeSubProduct(index)}>
        Supprimer le sous-produit
      </button>
    </div>
  );
};

export default ProductForm;

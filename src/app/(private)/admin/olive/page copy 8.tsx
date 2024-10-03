import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./product-schema";

// Importez votre schéma ici
// import { productSchema, ProductFormData } from "./your-schema-file"; // Remplacez par le chemin réel de votre schéma

const ProductForm: React.FC = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      subProducts: [{ images: [], color: { color: "", image: "" }, sizes: [] }],
    },
  });

  const {
    fields: subProductFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "subProducts",
  });

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    console.log(data);
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
      </div>

      {subProductFields.map((subProduct, index) => (
        <div key={subProduct.id}>
          <h3>Sous-produit {index + 1}</h3>

          <div>
            <label>Couleur</label>
            <Controller
              name={`subProducts.${index}.color.color`}
              control={control}
              render={({ field }) => <input {...field} />}
            />
            <label>Image de couleur</label>
            <Controller
              name={`subProducts.${index}.color.image`}
              control={control}
              render={({ field }) => <input {...field} />}
            />
          </div>

          <div>
            <label>Images</label>
            <Controller
              name={`subProducts.${index}.images`}
              control={control}
              render={({ field }) => (
                <>
                  {field.map((image, imageIndex) => (
                    <div key={imageIndex}>
                      <input
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            field[imageIndex].file = files[0];
                          }
                        }}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => field.push({ file: null })}
                  >
                    Ajouter une image
                  </button>
                </>
              )}
            />
          </div>

          <div>
            <h4>Tailles</h4>
            <Controller
              name={`subProducts.${index}.sizes`}
              control={control}
              render={({ field }) => (
                <>
                  {field.map((size, sizeIndex) => (
                    <div key={sizeIndex}>
                      <label>Taille</label>
                      <Controller
                        name={`subProducts.${index}.sizes.${sizeIndex}.size`}
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                      <label>Quantité</label>
                      <Controller
                        name={`subProducts.${index}.sizes.${sizeIndex}.qty`}
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                      <label>Prix</label>
                      <Controller
                        name={`subProducts.${index}.sizes.${sizeIndex}.price`}
                        control={control}
                        render={({ field }) => <input {...field} />}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => field.push({ size: "", qty: "", price: "" })}
                  >
                    Ajouter une taille
                  </button>
                </>
              )}
            />
          </div>

          <button type="button" onClick={() => remove(index)}>
            Supprimer le sous-produit
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ images: [], color: { color: "", image: "" }, sizes: [] })
        }
      >
        Ajouter un sous-produit
      </button>

      <button type="submit">Soumettre</button>
    </form>
  );
};

export default ProductForm;

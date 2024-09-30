"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "./product-schema";
// import { productSchema } from "./validation-schemas"; // Importez le schéma

const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema), // Utilisez le schéma Zod
  });

  // Gestion dynamique des details et questions
  const {
    fields: detailsFields,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    name: "details",
  });

  const {
    fields: questionsFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  // Gestion dynamique des subProducts
  const {
    fields: subProductsFields,
    append: appendSubProduct,
    remove: removeSubProduct,
  } = useFieldArray({
    control,
    name: "subProducts",
  });

  // Gestion du submit du formulaire
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Nom */}
      <div className="flex flex-col">
        <label>Nom du produit</label>
        <input {...register("name")} placeholder="Nom" />
        {/* {errors.name && <span>{errors.name.message}</span>} */}
        {errors.name?.message && <span>{String(errors.name.message)}</span>}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label>Description</label>
        <textarea {...register("description")} placeholder="Description" />
        {errors.description && (
          <span>{String(errors.description.message)}</span>
        )}
      </div>

      {/* Catégorie */}
      <div className="flex flex-col">
        <label>Catégorie</label>
        <input {...register("category")} placeholder="Catégorie" />
        {errors.category && <span>{String(errors.category.message)}</span>}
      </div>

      {/* Sous-catégories */}
      <div className="flex flex-col">
        <label>Sous-catégories</label>
        <input {...register("subCategories")} placeholder="Sous-catégories" />
        {errors.subCategories && (
          <span>{String(errors.subCategories.message)}</span>
        )}
      </div>

      {/* Détails */}
      <div className="flex flex-col">
        <label>Détails</label>
        {detailsFields.map((item, index) => (
          <div key={item.id}>
            <input
              {...register(`details.${index}.name`)}
              placeholder="Nom du détail"
            />
            <input
              {...register(`details.${index}.value`)}
              placeholder="Valeur"
            />
            <button type="button" onClick={() => removeDetail(index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendDetail({ name: "", value: "" })}
        >
          Ajouter un détail
        </button>
      </div>

      {/* Questions fréquentes */}
      <div>
        <label>Questions fréquentes</label>
        {questionsFields.map((item, index) => (
          <div key={item.id}>
            <input
              {...register(`questions.${index}.question`)}
              placeholder="Question"
            />
            <input
              {...register(`questions.${index}.answer`)}
              placeholder="Réponse"
            />
            <button type="button" onClick={() => removeQuestion(index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendQuestion({ question: "", answer: "" })}
        >
          Ajouter une question
        </button>
      </div>

      {/* Gestion dynamique des SubProducts */}
      <div>
        <label>SubProducts</label>
        {subProductsFields.map((subProduct, subProductIndex) => (
          <div key={subProduct.id} style={{ marginBottom: "20px" }}>
            {/* SKU */}
            <div>
              <label>SKU</label>
              <input
                {...register(`subProducts.${subProductIndex}.sku`)}
                placeholder="SKU"
              />
              {/* {errors.subProducts?.[subProductIndex]?.sku && <span>{errors.subProducts[subProductIndex].sku.message}</span>} */}

              {/* {errors.subProducts?.[subProductIndex]?.sku && (
  <span>{(errors.subProducts as any)[subProductIndex]?.sku?.message}</span>
)} */}

              {Array.isArray(errors.subProducts) &&
                errors.subProducts[subProductIndex]?.sku && (
                  <span>
                    {errors.subProducts[subProductIndex]?.sku?.message}
                  </span>
                )}
            </div>

            {/* Images */}
            <div className="flex flex-col">
              <label>Images</label>
              <div className="flex gap-x-4">
                <input
                  {...register(`subProducts.${subProductIndex}.images[0].url`)}
                  placeholder="URL de l'image"
                />
                <input
                  {...register(
                    `subProducts.${subProductIndex}.images[0].public_url`
                  )}
                  placeholder="URL publique de l'image"
                />
              </div>
            </div>

            {/* Couleur */}
            <div className="flex flex-col">
              <label>Couleur</label>
              <div className="flex gap-x-4">
                <input
                  {...register(`subProducts.${subProductIndex}.color.color`)}
                  placeholder="Couleur"
                />
                <input
                  {...register(`subProducts.${subProductIndex}.color.image`)}
                  placeholder="URL de l'image de couleur"
                />
              </div>
            </div>

            {/* Gestion dynamique des Sizes */}
            <div>
              <label>Tailles</label>
              <div>
                {/* Gestion dynamique des tailles pour chaque SubProduct */}
                <SizeFields
                  control={control}
                  register={register}
                  subProductIndex={subProductIndex}
                  errors={errors}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeSubProduct(subProductIndex)}
            >
              Supprimer ce subProduct
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendSubProduct({
              sku: "",
              images: [{ url: "", public_url: "" }],
              color: { color: "", image: "" },
              sizes: [],
            })
          }
        >
          Ajouter un SubProduct
        </button>
      </div>

      <button type="submit">Soumettre</button>
    </form>
  );
};

// Composant SizeFields pour gérer les tailles dynamiques pour chaque SubProduct
const SizeFields = ({ control, register, subProductIndex, errors }: any) => {
  const {
    fields: sizesFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `subProducts.${subProductIndex}.sizes`,
  });

  return (
    <div>
      {sizesFields.map((sizeField, sizeIndex) => (
        <div key={sizeField.id}>
          <input
            {...register(
              `subProducts.${subProductIndex}.sizes.${sizeIndex}.size`
            )}
            placeholder="Taille"
          />
          <input
            {...register(
              `subProducts.${subProductIndex}.sizes.${sizeIndex}.qty`
            )}
            placeholder="Quantité"
            type="number"
          />
          <input
            {...register(
              `subProducts.${subProductIndex}.sizes.${sizeIndex}.price`
            )}
            placeholder="Prix"
            type="number"
          />
          <button type="button" onClick={() => removeSize(sizeIndex)}>
            Supprimer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendSize({ size: "", qty: 0, price: 0 })}
      >
        Ajouter une taille
      </button>
    </div>
  );
};

export default CreateProductForm;

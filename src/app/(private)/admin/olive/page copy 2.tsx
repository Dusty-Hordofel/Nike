"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { productSchema } from "./schemas"; // Importe le schéma de validation

const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string(),
  brand: z.string(),
  sku: z.string(),
  discount: z.number().min(0, "Le rabais doit être supérieur ou égal à 0."),
  images: z.array(z.string()),
  description_images: z.array(z.string()),
  parent: z.string().optional(),
  category: z.string().min(1, "La catégorie est requise."),
  subCategories: z.array(z.string()),
  color: z.object({
    color: z.string(),
    image: z.string().optional(),
  }),
  sizes: z.array(
    z.object({
      size: z.string(),
      qty: z.number().min(1, "La quantité doit être au moins 1."),
      price: z.number().min(0, "Le prix doit être supérieur ou égal à 0."),
    })
  ),
  details: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  shippingFee: z
    .number()
    .min(0, "Les frais de port doivent être supérieurs ou égaux à 0."),
});

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    resolver: zodResolver(productSchema),
  });

  const {
    fields: sizesFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

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

  const onSubmit = (data: any) => {
    console.log("Produit créé:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nom du produit</label>
        <input {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Marque</label>
        <input {...register("brand")} />
      </div>

      <div>
        <label>SKU</label>
        <input {...register("sku")} />
      </div>

      <div>
        <label>Remise (%)</label>
        <input type="number" {...register("discount")} />
        {errors.discount && <span>{errors.discount.message}</span>}
      </div>

      {/* Images */}
      <div>
        <label>Images du produit</label>
        <input type="file" {...register("images")} multiple />
      </div>

      {/* Couleur et Image de couleur */}
      <div>
        <label>Couleur</label>
        <input {...register("color.color")} />
      </div>
      <div>
        <label>Image de la couleur</label>
        <input type="file" {...register("color.image")} />
      </div>

      {/* Sizes */}
      <div>
        <label>Tailles</label>
        {sizesFields.map((item, index) => (
          <div key={item.id}>
            <input {...register(`sizes.${index}.size`)} placeholder="Taille" />
            <input {...register(`sizes.${index}.qty`)} placeholder="Quantité" />
            <input {...register(`sizes.${index}.price`)} placeholder="Prix" />
            <button type="button" onClick={() => removeSize(index)}>
              Supprimer
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

      {/* Details */}
      <div>
        <label>Détails</label>
        {detailsFields.map((item, index) => (
          <div key={item.id}>
            <input {...register(`details.${index}.name`)} placeholder="Nom" />
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

      {/* Questions */}
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

      {/* Bouton de soumission */}
      <button type="submit">Créer le produit</button>
    </form>
  );
};

export default CreateProduct;

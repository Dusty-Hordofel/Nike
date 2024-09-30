// PAS BON AU NIVEAU DES SIZES
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type ProductTypes = "clothing" | "shoes";
type Countries = "france" | "usa";

// Définitions des tailles en fonction des pays et des types de produits
const sizeOptions: Record<Countries, Record<ProductTypes, string[]>> = {
  france: {
    clothing: ["S", "M", "L", "XL"],
    shoes: ["38", "39", "40", "41"],
  },
  usa: {
    clothing: ["S", "M", "L", "XL"],
    shoes: ["8", "9", "10", "11"],
  },
};

// Fonction pour obtenir les options de taille en fonction du pays et du type de produit
const getSizeOptions = (country: Countries, productType: ProductTypes) => {
  return sizeOptions[country]?.[productType] || [];
};

// Mapping des codes de pays dynamiques vers les pays pris en charge
const countryMap: Record<string, Countries> = {
  FR: "france",
  US: "usa",
  // Ajouter plus de mappings si nécessaire
};

// Schéma de validation du produit
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

  // Exemple : Obtenir le pays et le type de produit dynamiquement
  const countryCode: string = "FR"; // Simulé comme venant d'un formulaire
  const productType: ProductTypes = "clothing"; // Type de produit (par exemple, vêtements)

  // Mapper le code pays pour obtenir le pays valide
  const country = countryMap[countryCode];

  // Valider si le pays est pris en charge
  const sizes = country ? getSizeOptions(country, productType) : [];

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
        <label>Tailles disponibles</label>
        {sizes.length > 0 ? (
          sizes.map((size, index) => (
            <div key={index}>
              <span>{size}</span>
              <input
                {...register(`sizes.${index}.qty`)}
                placeholder="Quantité"
              />
              <input {...register(`sizes.${index}.price`)} placeholder="Prix" />
            </div>
          ))
        ) : (
          <div>Aucune taille disponible pour ce pays ou produit.</div>
        )}
        <button
          type="button"
          onClick={() => appendSize({ size: "", qty: "", price: "" })}
        >
          Ajouter une taille manuellement
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

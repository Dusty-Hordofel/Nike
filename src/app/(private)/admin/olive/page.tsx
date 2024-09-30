"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "./product-schema";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/buttons/button/button";
// import { productSchema } from "./validation-schemas"; // Importez le schéma

// Taille française pour les vêtements et les chaussures
const sizeOptions: Record<string, string[]> = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  shoes: Array.from({ length: 12 }, (_, i) => (38 + i).toString()), // Génère des tailles de 38 à 49
};

// Fonction pour obtenir les tailles en fonction du type de produit
const getSizeOptions = (productType: string) => {
  return sizeOptions[productType] || [];
};

const sizeOptionsForProduct = getSizeOptions("shoes");
console.log("🚀 ~ sizeOptionsForProduct:", sizeOptionsForProduct);

const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
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
  // Conversion explicite vers unknown, puis vers string
  // const productType = watch("productType") as unknown as string;
  const productType = watch("productType") as string;
  console.log("🚀 ~ CreateProductForm ~ productType:PTV", productType);

  // Options de tailles dynamiques en fonction du type de produit
  // const sizeOptionsForProduct = productType ? getSizeOptions(productType) : [];
  // console.log(
  //   "🚀 ~ CreateProductForm ~ sizeOptionsForProduct:SIZE",
  //   sizeOptionsForProduct
  // );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Sélection du type de produit */}
      <label>Type de produit</label>
      <select
        {...register("productType", { required: "Type de produit requis" })}
      >
        <option value="">Sélectionner un type de produit</option>
        <option value="clothing">Vêtements</option>
        <option value="shoes">Chaussures</option>
      </select>

      {/* Affichage des erreurs de type de produit */}
      {errors.productType && <span>{String(errors.productType.message)}</span>}

      {/* <SizeFields
        control={control}
        register={register}
        subProductIndex={0} // Index du subProduct
        errors={errors}
        // productType={productType} // Passer le type de produit ici
      /> */}

      {/* Nom */}
      <div className="flex flex-col">
        <label>Nom du produit</label>
        <input {...register("name")} placeholder="Nom" />
        {/* {errors.name && <span>{errors.name.message}</span>} */}
        {errors.name?.message && <span>{String(errors.name.message)}</span>}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <div
          // className={cn(
          //   "w-full py-4 pr-4 pl-3 rounded-lg border-default border focus:outline-none transition-all flex justify-between relative gap-x-2 bg-green-400 cursor-pointer",
          //   errors.images ? "text-red-600" : "text-black-200"
          // )}
          className="space-y-1"
        >
          <label>Description</label>
          {/* <textarea {...register("description")} placeholder="Description" /> */}
          <Textarea
            id={`input-textarea`}
            {...register("description")}
            rows={5}

            // className={cn(
            //   "p-4 rounded-lg focus:outline-none",
            //   errors.de ? "text-red-600" : "text-black-200",

            // )}
          />
        </div>
        {errors.description && (
          <p className="px-4 pt-[6px] text-xs text-red-600">
            {String(errors.description.message)}
          </p>
        )}
      </div>

      {/* Catégorie */}
      <div className="flex flex-col">
        <label>Catégorie</label>
        <Input {...register("category")} placeholder="Catégorie" />
        {errors.category && (
          <p className="px-4 pt-[6px] text-xs text-red-600">
            {String(errors.category.message)}
          </p>
        )}
      </div>

      {/* Sous-catégories */}
      <div className="flex flex-col">
        <label>Sous-catégories</label>
        <Input {...register("subCategories")} placeholder="Sous-catégories" />
        {errors.subCategories && (
          <p className="px-4 pt-[6px] text-xs text-red-600">
            {String(errors.subCategories.message)}
          </p>
        )}
      </div>

      {/* Détails */}
      <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
        <label className="text-2xl font-bold">Détails du produit</label>
        <div className="space-y-5">
          {detailsFields.map((item, index) => (
            <div key={item.id} className="flex gap-x-4">
              <Input
                {...register(`details.${index}.name`)}
                placeholder="Nom du détail"
              />
              <Input
                {...register(`details.${index}.value`)}
                placeholder="Valeur"
              />
              <Button type="button" onClick={() => removeDetail(index)}>
                Supprimer
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={() => appendDetail({ name: "", value: "" })}
        >
          Ajouter un détail
        </Button>
      </div>

      {/* Questions fréquentes */}
      <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
        <label className="text-2xl font-bold">Questions fréquentes</label>
        <div className="space-y-5"></div>
        {questionsFields.map((item, index) => (
          <div key={item.id} className="flex gap-x-4">
            <Input
              {...register(`questions.${index}.question`)}
              placeholder="Question"
            />
            <Input
              {...register(`questions.${index}.answer`)}
              placeholder="Réponse"
            />
            <Button type="button" onClick={() => removeQuestion(index)}>
              Supprimer
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendQuestion({ question: "", answer: "" })}
        >
          Ajouter une question
        </Button>
      </div>

      {/* Gestion dynamique des SubProducts */}
      <div className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5">
        <label className="text-2xl font-bold">SubProducts</label>
        {subProductsFields.map((subProduct, subProductIndex) => (
          <div
            key={subProduct.id}
            style={{ marginBottom: "20px" }}
            className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5"
          >
            {/* SKU */}
            <div>
              <label>SKU</label>
              <Input
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
                <Input
                  {...register(`subProducts.${subProductIndex}.images[0].url`)}
                  placeholder="URL de l'image"
                />
                <Input
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
                <Input
                  {...register(`subProducts.${subProductIndex}.color.color`)}
                  placeholder="Couleur"
                />
                <Input
                  {...register(`subProducts.${subProductIndex}.color.image`)}
                  placeholder="URL de l'image de couleur"
                />
              </div>
            </div>

            {/* Gestion dynamique des Sizes */}
            <div
            // className="flex flex-col font-medium rounded-md border border-black-100 p-6 gap-y-5"
            >
              <label className="text-xl font-medium">Tailles</label>
              <div>
                {/* Gestion dynamique des tailles pour chaque SubProduct */}
                <SizeFields
                  control={control}
                  register={register}
                  subProductIndex={subProductIndex}
                  errors={errors}
                  productType={productType} // On passe le productType ici
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={() => removeSubProduct(subProductIndex)}
            >
              Supprimer ce subProduct
            </Button>
          </div>
        ))}

        <Button
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
        </Button>
      </div>

      <Button type="submit">Créer le produit</Button>
    </form>
  );
};

export default CreateProductForm;

const SizeFields = ({
  control,
  register,
  subProductIndex,
  errors,
  productType,
}: any) => {
  const {
    fields: sizesFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `subProducts.${subProductIndex}.sizes`,
  });

  // console.log("TOLO", productType);
  // // Obtenir les options de taille en fonction du type de produit
  const sizeOptionsForProduct = getSizeOptions(productType);
  console.log("🚀 ~ sizeOptionsForProduct:22", sizeOptionsForProduct);

  // const sizeOptionsForProduct = productType ? getSizeOptions(productType) : [];
  // console.log(
  //   "🚀 ~ CreateProductForm ~ sizeOptionsForProduct:SIZE",
  //   sizeOptionsForProduct
  // );

  return (
    <div>
      {sizesFields.map((sizeField, sizeIndex) => (
        <div key={sizeField.id} className="flex">
          {/* Sélection des tailles */}
          <label className="sr-only">Taille</label>
          <select
            {...register(
              `subProducts.${subProductIndex}.sizes.${sizeIndex}.size`
            )}
            defaultValue=""
          >
            <option value="" disabled>
              Choisir une taille
            </option>
            {sizeOptionsForProduct.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>

          {/* Affichage des erreurs pour la taille */}
          {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]?.size && (
            <span>
              {
                errors.subProducts[subProductIndex].sizes[sizeIndex]?.size
                  .message
              }
            </span>
          )}

          {/* Champ pour la quantité */}
          <label className="sr-only">Quantité</label>
          <Input
            {...register(
              `subProducts.${subProductIndex}.sizes.${sizeIndex}.qty`
            )}
            placeholder="Quantité"
            type="number"
          />
          {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]?.qty && (
            <span>
              {
                errors.subProducts[subProductIndex].sizes[sizeIndex]?.qty
                  .message
              }
            </span>
          )}

          {/* Champ pour le prix */}
          <label className="sr-only">Prix</label>
          <Input
            {...register(
              `subProducts.${subProductIndex}.sizes.${sizeIndex}.price`
            )}
            placeholder="Prix"
            type="number"
          />
          {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]
            ?.price && (
            <span>
              {
                errors.subProducts[subProductIndex].sizes[sizeIndex]?.price
                  .message
              }
            </span>
          )}

          {/* Bouton pour supprimer la taille */}
          <Button type="button" onClick={() => removeSize(sizeIndex)}>
            Supprimer
          </Button>
        </div>
      ))}

      {/* Bouton pour ajouter une nouvelle taille */}
      <Button
        type="button"
        onClick={() => appendSize({ size: "", qty: 0, price: 0 })}
      >
        Ajouter une taille
      </Button>
    </div>
  );
};

// export default SizeFields;

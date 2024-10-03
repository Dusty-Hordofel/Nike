import { Button } from "@/components/ui/buttons/button/button";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";

// Taille française pour les vêtements et les chaussures
const sizeOptions: Record<string, string[]> = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  shoes: Array.from({ length: 12 }, (_, i) => (38 + i).toString()), // Génère des tailles de 38 à 49
};

// Fonction pour obtenir les tailles en fonction du type de produit
const getSizeOptions = (productType: string) => {
  return sizeOptions[productType] || [];
};

const SizeFields = ({
  control,
  register,
  subProductIndex,
  errors,
  productType,
  watch,
}: any) => {
  const {
    fields: sizesFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `subProducts.${subProductIndex}.sizes`,
  });

  const sizeOptionsForProduct = getSizeOptions(productType);

  // Utiliser watch pour surveiller les valeurs des tailles
  const sizesValues = watch(`subProducts.${subProductIndex}.sizes`);

  const selectedSizes = sizesValues
    .map((field: any) => field.size)
    .filter((size: any) => size);

  return (
    <div className="space-y-4">
      {sizesFields.map((sizeField, sizeIndex) => (
        <div key={sizeField.id} className="flex flex-col gap-y-4">
          {/* Sélection des tailles */}

          <div
            className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
            <label className="sr-only">Taille</label>
            <select
              {...register(
                `subProducts.${subProductIndex}.sizes.${sizeIndex}.size`
              )}
              className="px-3 py-2  h-10  rounded-md border w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Choisir une taille
              </option>
              {sizeOptionsForProduct.map((sizeOption) => (
                <option
                  key={sizeOption}
                  value={sizeOption}
                  disabled={selectedSizes.includes(sizeOption)}
                >
                  {sizeOption}
                </option>
              ))}
              {/* {availableSizeOptions.map((sizeOption, index) => (
                  <option key={index} value={sizeOption}>
                    {sizeOption}
                  </option>
                ))} */}
            </select>

            {/* Affichage des erreurs pour la taille */}
            {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]
              ?.size && (
              <p className="px-4 pt-[6px] text-xs ">
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.size
                    .message
                }
              </p>
            )}
          </div>

          {/* Champ pour la quantité */}
          <div
            className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
            <label className="sr-only">Quantité</label>
            <Input
              {...register(
                `subProducts.${subProductIndex}.sizes.${sizeIndex}.qty`
              )}
              placeholder="Quantité"
              type="number"
            />
            {errors?.subProducts?.[subProductIndex]?.sizes?.[sizeIndex]
              ?.qty && (
              <p className="px-4 pt-[6px] text-xs ">
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.qty
                    .message
                }
              </p>
            )}
          </div>
          {/* Champ pour le prix */}
          <div
            className={`${errors.name ? "text-red-600" : "text-black-200"}  flex flex-col`}
          >
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
              <p className="px-4 pt-[6px] text-xs ">
                {
                  errors.subProducts[subProductIndex].sizes[sizeIndex]?.price
                    .message
                }
              </p>
            )}
          </div>

          {/* Afficher l'erreur de taille si elle existe */}
          {/* {sizeError && <span className="text-red-500">{sizeError}</span>} */}

          {/* Bouton pour supprimer la taille */}

          <Button
            type="button"
            variant="destructive"
            onClick={() => removeSize(sizeIndex)}
            fullWidth
          >
            <span className="text-white">Supprimer</span>
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

export default SizeFields;

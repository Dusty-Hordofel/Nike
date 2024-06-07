interface ProductCardDescriptionProps {
  name: string;
  category?: string;
  productColors: {
    image: string;
    color: string;
  }[];
  bestSeller: boolean;
  newRelease: boolean;
}

const ProductCardDescription = ({
  name,
  category,
  productColors,
  bestSeller,
  newRelease,
}: ProductCardDescriptionProps) => (
  <>
    {newRelease || bestSeller ? (
      <div className=" product-card-announcement font-medium text-[#9E3500]">
        {newRelease ? "Dernières sorties" : "Meilleure vente"}
      </div>
    ) : null}

    <div className="group-hover:hidden block">
      <div className="product-card-titles">
        <div className="product-card-title font-medium">{name}</div>
        <div className="product-card-subtitle text-gray-500">
          Chaussure pour Homme
        </div>
      </div>

      <div
        aria-label={`Disponible en ${productColors.length} ${
          productColors.length > 1 ? "couleurs" : "couleur"
        }`}
        className="text-gray-500 pb-[10px]"
      >
        {productColors.length}{" "}
        {productColors.length > 1 ? "couleurs" : "couleur"}
      </div>
    </div>
  </>
);

export default ProductCardDescription;

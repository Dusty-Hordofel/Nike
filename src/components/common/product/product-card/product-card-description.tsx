interface ProductCardDescriptionProps {
  name: string;
  category?: string;
  productColors: {
    _id: string;
    name: string;
    hexCode: string;
    image: string;
  }[];
  bestSeller: boolean;
  newRelease: boolean;
  isLargeScreen: boolean;
}

const ProductCardDescription = ({
  name,
  category,
  productColors,
  bestSeller,
  newRelease,
  isLargeScreen,
}: ProductCardDescriptionProps) => (
  <div className="max-[960px]:mx-3 max-[960px]:mt-3 max-[960px]:text-[14px]">
    {newRelease || bestSeller ? (
      <div className=" product-card-announcement font-medium text-[#9E3500]">
        {newRelease ? "Dernières sorties" : "Meilleure vente"}
      </div>
    ) : null}

    <div
      className={`${
        productColors.length > 1 && isLargeScreen && "group-hover:hidden block"
      }`}
    >
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
  </div>
);

export default ProductCardDescription;

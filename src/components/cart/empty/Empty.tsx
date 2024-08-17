import React from "react";

const Empty = () => {
  return (
    <div className="leading-6">
      <h1 className="font-medium text-2xl mb-3">Panier</h1>
      <div className="col-sm-12">
        <p data-automation="no-items" className="text-base">
          Il n&apos;y a aucun article dans ton panier.
        </p>
      </div>
    </div>
  );
};

export default Empty;

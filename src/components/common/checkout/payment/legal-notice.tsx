import Link from "next/link";
import React from "react";

const LegalNotice = () => {
  return (
    <section className="text-gray-500">
      <div className=""></div>
      <div>
        <p data-attr="legal-links-copy" className="css-vvcwww">
          <span>
            <span>
              En cliquant sur le bouton «&nbsp;Soumettre le paiement&nbsp;», tu
              confirmes avoir lu, compris et accepté nos{" "}
            </span>
            <Link
              href="http://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&amp;uxId=com.nike.commerce.checkout.web&amp;country=fr&amp;language=fr&amp;requestType=redirect"
              className="underline underline-offset-4 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions d&lsquo;utilisation
            </Link>
            <span>, </span>
            <Link
              href="http://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfSale&amp;uxId=com.nike.commerce.checkout.web&amp;country=fr&amp;language=fr&amp;requestType=redirect"
              className="underline underline-offset-4 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions de vente
            </Link>
            <span> et </span>
            <Link
              href="https://www.nike.com/fr/help/a/conditions-de-retour-ue"
              className="underline underline-offset-4 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Politique de retour
            </Link>
            <span>, et avoir lu la </span>
            <Link
              href="http://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&amp;uxId=com.nike.commerce.checkout.web&amp;country=fr&amp;language=fr&amp;requestType=redirect"
              className="underline underline-offset-4 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Politique de confidentialité
            </Link>
            <span> de Nike.</span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default LegalNotice;

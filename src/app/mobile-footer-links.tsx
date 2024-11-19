import Link from "next/link";
import React from "react";

type MobileFooterLinksProps = {};

const MobileFooterLinks = () => {
  return (
    <div
      data-testid="mobile-footer-menu"
      className="css-13z4jna hidden max-[960px]:block"
    >
      <div className="mobile-footer-accordion css-chugcn">
        <div>
          <div
            className="nds-accordion css-1e2fy0l e1whplt30"
            data-nr-component="accordion"
          >
            <details
              className="nds-details accordion-details is-animated is-open css-3rxweh e196znjh0 border-b border-[#E5E5E5]"
              id="footer-accordion__accordion-panel-0"
              data-nr-accordion-panel="accordion-panel-0"
              open={false}
            >
              <summary className="accordion-panel-wrapper py-6 ">
                <span className="nds-summary-wrapper flex justify-between items-center">
                  <p className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular">
                    Ressources
                  </p>
                  <span className="nds-summary-icons">
                    <svg
                      aria-hidden="true"
                      className="nds-summary-control"
                      focusable="false"
                      viewBox="0 0 24 24"
                      role="img"
                      width="24px"
                      height="24px"
                      fill="none"
                    >
                      <path
                        stroke="currentColor"
                        stroke-width="1.5"
                        d="M18.966 8.476L12 15.443 5.033 8.476"
                      ></path>
                    </svg>
                  </span>
                </span>
              </summary>
              <div className="content-wrapper">
                <div className="children-wrapper text-gray-500 mb-[30px] gap-3 flex flex-col">
                  <Link
                    aria-label="resources,gift cards"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/cartes-cadeaux"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Cartes cadeaux
                    </p>
                  </Link>
                  <Link
                    aria-label="resources,find a store"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/retail/"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Trouver un magasin
                    </p>
                  </Link>
                  <Link
                    aria-label="resources,nike journal"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/articles"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Nike Journal
                    </p>
                  </Link>
                  <Link
                    aria-label="resources,become a member"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/adhesion"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Devenir membre
                    </p>
                  </Link>
                  <Link
                    aria-label="resources,student discount"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/student-discount"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Réduction pour étudiants
                    </p>
                  </Link>
                  <Link
                    aria-label="resources,site feedback"
                    className="footer-link"
                    data-testid="link"
                    href="#site-feedback"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Commentaires
                    </p>
                  </Link>
                  <Link
                    aria-label="resources,promo codes"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/code-promo"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Codes promo
                    </p>
                  </Link>
                </div>
              </div>
            </details>
            <details
              className="nds-details accordion-details untouched is-animated css-3rxweh e196znjh0 border-b border-[#E5E5E5]"
              id="footer-accordion__accordion-panel-1"
              data-nr-accordion-panel="accordion-panel-1"
            >
              <summary className="accordion-panel-wrapper py-6 ">
                <span className="nds-summary-wrapper flex justify-between items-center">
                  <p className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular">
                    Aide
                  </p>
                  <span className="nds-summary-icons">
                    <svg
                      aria-hidden="true"
                      className="nds-summary-control"
                      focusable="false"
                      viewBox="0 0 24 24"
                      role="img"
                      width="24px"
                      height="24px"
                      fill="none"
                    >
                      <path
                        stroke="currentColor"
                        stroke-width="1.5"
                        d="M18.966 8.476L12 15.443 5.033 8.476"
                      ></path>
                    </svg>
                  </span>
                </span>
              </summary>
              <div className="content-wrapper">
                <div className="children-wrapper text-gray-500 mb-[30px] gap-3 flex flex-col">
                  <Link
                    aria-label="help,get help"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/help"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Aide
                    </p>
                  </Link>
                  <Link
                    aria-label="help,order status"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/orders/details"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Statut de la commande
                    </p>
                  </Link>
                  <Link
                    aria-label="help,shipping and delivery"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/help/a/expedition-livraison-ue"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Expédition et livraison
                    </p>
                  </Link>
                  <Link
                    aria-label="help,returns"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/help/a/conditions-de-retour-ue"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Retours
                    </p>
                  </Link>
                  <Link
                    aria-label="help,payment options"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/help/a/modes-de-paiement-ue"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Modes de paiement
                    </p>
                  </Link>
                  <Link
                    aria-label="help,contact us"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/help/#contact"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Nous contacter
                    </p>
                  </Link>
                  <Link
                    aria-label="help,reviews"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/help/a/avis"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Avis
                    </p>
                  </Link>
                  <Link
                    aria-label="help,promo code help"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/help/a/appliquer-promo-ue"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Aide - Codes promo Nike
                    </p>
                  </Link>
                </div>
              </div>
            </details>
            <details
              className="nds-details accordion-details untouched is-animated css-3rxweh e196znjh0 border-b border-[#E5E5E5]"
              id="footer-accordion__accordion-panel-2"
              data-nr-accordion-panel="accordion-panel-2"
            >
              <summary className="accordion-panel-wrapper py-6 ">
                <span className="nds-summary-wrapper flex justify-between items-center">
                  <p className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular">
                    Entreprise
                  </p>
                  <span className="nds-summary-icons">
                    <svg
                      aria-hidden="true"
                      className="nds-summary-control"
                      focusable="false"
                      viewBox="0 0 24 24"
                      role="img"
                      width="24px"
                      height="24px"
                      fill="none"
                    >
                      <path
                        stroke="currentColor"
                        stroke-width="1.5"
                        d="M18.966 8.476L12 15.443 5.033 8.476"
                      ></path>
                    </svg>
                  </span>
                </span>
              </summary>
              <div className="content-wrapper">
                <div className="children-wrapper text-gray-500 mb-[30px] gap-3 flex flex-col">
                  <Link
                    aria-label="company,about nike"
                    className="footer-link"
                    data-testid="link"
                    href="https://about.nike.com/"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      À propos de Nike
                    </p>
                  </Link>
                  <Link
                    aria-label="company,news"
                    className="footer-link"
                    data-testid="link"
                    href="https://news.nike.com/"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Actualités
                    </p>
                  </Link>
                  <Link
                    aria-label="company,careers"
                    className="footer-link"
                    data-testid="link"
                    href="https://jobs.nike.com/"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Carrières
                    </p>
                  </Link>
                  <Link
                    aria-label="company,investors"
                    className="footer-link"
                    data-testid="link"
                    href="https://investors.nike.com/"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Investisseurs
                    </p>
                  </Link>
                  <Link
                    aria-label="company,sustainability"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/developpement-durable"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Développement durable
                    </p>
                  </Link>
                  <Link
                    aria-label="company,accessibility"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/accessibility/statement"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Accessibilité: partiellement conforme
                    </p>
                  </Link>
                  <Link
                    aria-label="company,purpose"
                    className="footer-link"
                    data-testid="link"
                    href="https://www.nike.com/fr/mission"
                  >
                    <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular">
                      Mission
                    </p>
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
      <div
        className="language-tunnel css-171zxca"
        data-testid="language-tunnel"
      >
        <button
          aria-label="Lieu sélectionné: France"
          className="nds-btn css-x8wy1 ex41m6f0 cta-primary-dark btn-responsive flex gap-x-1 items-center py-6"
          type="submit"
          title="Lieu sélectionné: France"
          data-testid="link"
        >
          <span className="btn-icon-wrapper ">
            <svg
              aria-hidden="true"
              className="css-npy3on"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
            >
              <path
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="1.5"
                d="M21.75 12A9.75 9.75 0 0112 21.75M21.75 12A9.75 9.75 0 0012 2.25M21.75 12c0 2.071-4.365 3.75-9.75 3.75S2.25 14.071 2.25 12m19.5 0c0-2.071-4.365-3.75-9.75-3.75S2.25 9.929 2.25 12M12 21.75A9.75 9.75 0 012.25 12M12 21.75c2.9 0 5.25-4.365 5.25-9.75S14.9 2.25 12 2.25m0 19.5c-2.9 0-5.25-4.365-5.25-9.75S9.1 2.25 12 2.25M2.25 12A9.75 9.75 0 0112 2.25"
              ></path>
            </svg>
          </span>
          France
        </button>
      </div>
      <div className="css-dwqs4p"></div>
    </div>
  );
};

export default MobileFooterLinks;

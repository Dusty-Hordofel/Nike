import Link from "next/link";
import React from "react";

type NikeTermsProps = {};

const NikeTerms = (props: NikeTermsProps) => {
  return (
    <div className="css-wd0dnb text-gray-500">
      <ul
        aria-label="sub footer"
        className="footer-list flex min-[960px]:flex-row  flex-col gap-x-6 flex-wrap  gap-y-3"
      >
        <li className="css-uu6h57">
          <p className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular text-nowrap">
            <span>©&nbsp; 2024 Nike, Inc. Tous droits réservés</span>
          </p>
        </li>
        <li>
          <div className="css-s8yvqs" data-testid="Guides-sub-footer-dropdown">
            <details className=" css-1qehhq">
              <summary
                aria-expanded="false"
                aria-haspopup="menu"
                aria-label="Menu Guides"
                className="drop-down-accessibility-button flex items-center"
                role="menuitem"
                tabIndex={0}
              >
                <p
                  className="nds-text css-175n91z e1yhcai00 appearance-body2Strong color-secondary weight-regular"
                  data-testid="desktop-user-menu-item-message-Guides"
                >
                  Guides
                </p>
                <svg
                  aria-hidden="true"
                  className="summary-caret"
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
                    d="M17.5 9.25l-5.5 5.5-5.5-5.5"
                  ></path>
                </svg>
              </summary>
              <div
                className="footer-drop-down"
                data-testid="dropdown-details-container"
              >
                <div className="link-container css-w3vz3o" role="menu">
                  <ul aria-label="Nike Air">
                    <li className="dropdown__sub_list_item">
                      <Link
                        role="menuitem"
                        className=""
                        href="https://www.nike.com/fr/air"
                      >
                        <p
                          className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
                          role="presentation"
                        >
                          Nike Air
                        </p>
                      </Link>
                    </li>
                    <li className="dropdown__sub_list_item">
                      <Link
                        role="menuitem"
                        className=""
                        href="https://www.nike.com/fr/air-max"
                      >
                        <p
                          className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
                          role="presentation"
                        >
                          Nike Air Max
                        </p>
                      </Link>
                    </li>
                    <li className="dropdown__sub_list_item">
                      <Link
                        role="menuitem"
                        className=""
                        href="https://www.nike.com/fr/flyease"
                      >
                        <p
                          className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
                          role="presentation"
                        >
                          Nike FlyEase
                        </p>
                      </Link>
                    </li>
                    <li className="dropdown__sub_list_item">
                      <Link
                        role="menuitem"
                        className=""
                        href="https://www.nike.com/fr/running/runningzoom-pegasus-37"
                      >
                        <p
                          className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
                          role="presentation"
                        >
                          Nike Pegasus
                        </p>
                      </Link>
                    </li>
                    <li className="dropdown__sub_list_item">
                      <Link
                        role="menuitem"
                        className=""
                        href="https://www.nike.com/fr/react"
                      >
                        <p
                          className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
                          role="presentation"
                        >
                          Nike React
                        </p>
                      </Link>
                    </li>
                    <li className="dropdown__sub_list_item">
                      <Link
                        role="menuitem"
                        className=""
                        href="https://www.nike.com/fr/running/vaporfly"
                      >
                        <p
                          className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
                          role="presentation"
                        >
                          Nike Vaporfly
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </details>
          </div>
        </li>
        <li>
          <Link
            aria-label="terms of use"
            className="css-1isz5ne"
            href="https://agreementservice.svs.nike.com/gb/en_gb/rest/agreement?agreementType=termsOfUse&amp;uxId=com.nike&amp;country=FI&amp;language=en&amp;requestType=redirect"
          >
            <p
              className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
              style={{ paddingLeft: "0px" }}
            >
              Conditions d&apos;utilisation
            </p>
          </Link>
        </li>
        <li>
          <Link
            aria-label="terms of use"
            className="css-1isz5ne"
            href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfSale&amp;uxId=com.nike.tos&amp;country=FR&amp;language=fr&amp;requestType=redirect"
          >
            <p
              className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
              style={{ paddingLeft: "0px" }}
            >
              Conditions générales de vente
            </p>
          </Link>
        </li>
        <li>
          <Link
            aria-label="company details"
            className="css-1isz5ne"
            href="https://www.nike.com/gb/help/Link/company-details"
          >
            <p
              className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
              style={{ paddingLeft: "0px" }}
            >
              Informations sur l&apos;entreprise
            </p>
          </Link>
        </li>
        <li>
          <Link
            aria-label="privacy cookie policy"
            className="css-1isz5ne"
            href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&amp;uxId=com.nike.commerce.nikedotcom.web&amp;country=fr&amp;language=fr&amp;requestType=redirect"
          >
            <p
              className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
              style={{ paddingLeft: "0px" }}
            >
              Politique de confidentialité et de gestion des cookies
            </p>
          </Link>
        </li>
        <li>
          <Link
            aria-label="cookie settings"
            className="css-1isz5ne"
            href="https://www.nike.com/fr/guest/settings/privacy"
          >
            <p
              className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
              style={{ paddingLeft: "0px" }}
            >
              Paramètres de confidentialité et de cookies
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NikeTerms;

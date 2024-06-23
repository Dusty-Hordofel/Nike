import React from "react";
import CheckoutHeader from "../checkout-header";
import { Button } from "@/components/ui/buttons/button/button";
import CheckoutLoader from "./loading";
import CheckoutTerms from "./checkout-terms";

const OrderSummary = () => {
  return (
    <section className="mb5-sm" id="orderreview">
      <span className="css-1qgj8yk">
        Récapitulatif de la commande Étape 3 sur 3 Étape en cours
      </span>
      <CheckoutHeader title="Récapitulatif de la commande" />
      <div>
        <div className="ncss-container">
          <div className="d-sm-h">
            <div className="ncss-col-sm-12 pb12-sm">
              <div className="ncss-container ta-sm-c u-full-height">
                <div className="ncss-row u-full-height u-full-width d-sm-t ta-sm-c pt6-sm pb6-sm pt12-lg pb12-lg">
                  <div className="ncss-col-sm-12 d-sm-tc va-sm-m">
                    <CheckoutLoader />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ncss-row">
            <div className="ncss-col-sm-12 pt5-sm pt0-sm prl5-sm">
              {/* <div className="d-lg-h pb5-sm">
                <div className="mr2-lg ml2-lg pt6-lg" data-attr="cart-details">
                  <div>
                    <header>
                      <h3 className="css-5oevkg">
                        Livraison d'ici le&nbsp;mar. 25 juin
                      </h3>
                    </header>
                    <div className="d-sm-t bs5">
                      <figure
                        className="d-sm-tr pb5-sm css-u420t4"
                        data-attr="cloud-cart-item"
                      >
                        <div className="d-sm-tc va-sm-t">
                          <img
                            alt="Chaussure Nike Cortez Textile pour femme"
                            data-attr="cloud-cart-image"
                            src="https://images.nike.com/is/image/DotCom/DZ2795_601_A_PREM?wid=80&amp;hei=80&amp;align=0,1&amp;cropN=0,0,0,0&amp;fmt=png-alpha&amp;resMode=sharp&amp;defaultImage=DotCom/SEARCH_002"
                            width="60"
                            className="css-16i8mcp"
                          />
                        </div>
                        <figcaption className="d-sm-tc va-sm-t pl5-sm">
                          <div className="css-1qpib4x">
                            Chaussure Nike Cortez Textile pour femme
                          </div>
                          <div>Réf. article : DZ2795-601</div>
                          <div>
                            <span data-attr="itemSize">Taille : 42</span>
                          </div>
                          <div className="css-ydw93h">
                            Couleur : Picante Red/University Blue/Coconut
                            Milk/Sail
                          </div>
                          <div>Quantité : 2 @ 89,99&nbsp;€</div>
                          <div data-attr="checkout-cart-item-price">
                            179,98&nbsp;€
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="ncss-row" data-attr="summaryComponent">
                  <div className="ncss-col-sm-12 p5-lg mb1-sm css-1qpib4x">
                    <div className="ncss-row">
                      <div className="ncss-col-sm-8 va-sm-t">
                        <div className="d-sm-ib">
                          <span data-attr="subtotalText">Sous-total</span>
                          <span
                            id="subtotalTooltipWrapper"
                            className="css-178g4y"
                          >
                            <button
                              className="d-sm-ib css-9a7n2d"
                              id="subtotalTooltip"
                              aria-label="Détails du sous-total"
                            >
                              <div className="css-1ou3w6b">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  role="img"
                                  width="24px"
                                  height="24px"
                                  fill="none"
                                >
                                  <path
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    d="M12 20a8 8 0 100-16 8 8 0 000 16zm.75-4.5V17h-1.5v-1.5h1.5zM10.5 10c0-.918.831-1.644 1.764-1.472h.006c.6.106 1.096.603 1.201 1.202v.001a1.502 1.502 0 01-.82 1.63 2.411 2.411 0 00-1.401 2.189V14h1.5v-.45a.91.91 0 01.532-.828l.01-.005a3.002 3.002 0 001.657-3.248 3.008 3.008 0 00-2.416-2.417C10.647 6.706 9 8.179 9 10h1.5z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                              <div
                                className="p4-sm z2 css-17f46hh"
                                data-attr="test-message"
                                hidden={false}
                              >
                                <p className="">
                                  Le sous-total correspond au prix total de la
                                  commande, TVA incluse, avant l'application de
                                  réductions. Il n'inclut pas les frais
                                  d'expédition.
                                </p>
                              </div>
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="ncss-col-sm-4 va-sm-t ta-sm-r">
                        <div data-attr="subtotal">179,98&nbsp;€</div>
                      </div>
                    </div>
                    <div className="ncss-row">
                      <div className="ncss-col-sm-9 va-sm-t">
                        <div data-attr="shippingText">
                          Frais d'expédition estimés
                        </div>
                      </div>
                      <div className="ncss-col-sm-3 va-sm-t ta-sm-r">
                        <div data-attr="shippingTotal">0,00&nbsp;€</div>
                      </div>
                    </div>
                    <div className="ncss-row mt2-sm">
                      <div className="ncss-col-sm-8 va-sm-t">
                        <div data-attr="totalText" className="css-5oevkg">
                          <span>Total </span>
                        </div>
                      </div>
                      <div className="ncss-col-sm-4 va-sm-t ta-sm-r">
                        <div data-attr="cart-total" className="css-5oevkg">
                          179,98&nbsp;€
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <CheckoutTerms />
              <section id="place-order" className="d-lg-h z3 css-1b23r9m">
                <div className="mt-6 bg-warning flex justify-end">
                  <Button
                    size="medium"
                    className="nds-btn css-b4ij8a ex41m6f0 btn-primary-dark  btn-md"
                    type="button"
                    data-attr="continueToOrderReviewBtn"
                  >
                    Soumettre le paiement
                    <span className="ripple"></span>
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="mr5-sm ml5-sm css-10uhelw"></div>
    </section>
  );
};

export default OrderSummary;

import CheckoutHeader from "@/components/Checkout/checkout-header";
import React from "react";

const OrderSummary = ({ deliveryStep }: any) => {
  return (
    // Récapitulatif de la commande
    <section className="mb5-sm">
      {/* <CheckoutHeader title="Dans ton panier" /> */}
      {/* <header className="pt5-sm pb3-sm prl5-sm pt3-md u-clearfix">
    <h2 className="fl-sm-l css-1rkogn0">Dans ton panier</h2>
    <button
      aria-label="Modifier"
      className="nds-btn fl-sm-r css-121t4vg ex41m6f0 cta-primary-dark underline btn-md"
      type="button"
    >
      Modifier<span className="ripple"></span>
    </button>
  </header> */}
      <span className="sr-only">Paiement Étape 3 sur 3 Étape en cours</span>
      <CheckoutHeader title="Récapitulatif de la commande" />
      <div className={`mt-2 ${deliveryStep === 4 ? "block" : "hidden"}`}>
        {/* PART 1 */}
        <div className="ncss-row" data-attr="summaryComponent">
          <div className="ncss-col-sm-12 p5-lg mb1-sm css-1qpib4x p-5">
            {/* 1 */}
            <div className="flex justify-between items-center">
              <div className="ncss-col-sm-8 va-sm-t">
                <div className="d-sm-ib flex items-center">
                  <span data-attr="subtotalText" className="bg-blue-100">
                    Sous-total
                  </span>
                  <span
                    id="subtotalTooltipWrapper"
                    className="css-178g4y  ml-2 top-1 relative"
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
                      {/* <div
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
                  </div> */}
                    </button>
                  </span>
                </div>
              </div>
              <div className="ncss-col-sm-4 va-sm-t ta-sm-r">
                <div data-attr="subtotal">179,98&nbsp;€</div>
              </div>
            </div>
            {/* 2 */}
            <div className="flex justify-between items-center">
              <div className="ncss-col-sm-9 va-sm-t">
                <div data-attr="shippingText">Frais d'expédition estimés</div>
              </div>
              <div className="ncss-col-sm-3 va-sm-t ta-sm-r">
                <div data-attr="shippingTotal">0,00&nbsp;€</div>
              </div>
            </div>
            {/* 3 */}
            <div className="flex justify-between items-center mt-2">
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
        <div className="mb5-sm">
          <div
            className="border-top-light-grey mr2-lg ml2-lg pt6-lg pt-6 mx-2"
            data-attr="cart-details"
          >
            <div>
              <header>
                <h3 className="css-5oevkg">
                  Livraison d'ici le&nbsp;mar. 25 juin
                </h3>
              </header>
              <div className="d-sm-t bs5">
                <figure className="flex" data-attr="cloud-cart-item">
                  <div className="d-sm-tc va-sm-t">
                    <img
                      alt="Chaussure Nike Cortez Textile pour femme"
                      data-attr="cloud-cart-image"
                      src="https://images.nike.com/is/image/DotCom/DZ2795_601_A_PREM?wid=80&amp;hei=80&amp;align=0,1&amp;cropN=0,0,0,0&amp;fmt=png-alpha&amp;resMode=sharp&amp;defaultImage=DotCom/SEARCH_002"
                      width="60"
                      className="css-16i8mcp"
                    />
                  </div>
                  <figcaption className="d-sm-tc va-sm-t pl5-sm pl-5 text-gray-500">
                    <div className="css-1qpib4x text-black-200">
                      Chaussure Nike Cortez Textile pour femme
                    </div>
                    <div>Réf. article : DZ2795-601</div>
                    <div>
                      <span data-attr="itemSize">Taille : 42</span>
                    </div>
                    <div className="css-ydw93h">
                      Couleur : Picante Red/University Blue/Coconut Milk/Sail
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
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;

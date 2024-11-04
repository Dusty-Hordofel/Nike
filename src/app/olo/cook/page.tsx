import { Button } from "@/components/ui/buttons/button/button";
import React from "react";

// bottom: auto;
// top: 50%;
// left: 50%;
// transform: translate3d(-50%, -50%, 0px);

const CookiesPage = () => {
  return (
    <>
      <div
        className="backdrop-blur-sm fixed inset-0 bg-[hsla(0,0%,7%,0.36)] backdrop-filter"
        data-testid="dialog-backdrop"
        style={{ visibility: "visible", zIndex: 2100 }}
      >
        <div
          //   className="cookie-dialog-base base dialog-base css-1n4pc9d ewzu9hy0 "
          className="max-w-[560px] rounded-3xl   h-[calc(100%-120px)] bg-white absolute  -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-hidden"
          role="dialog"
          aria-labelledby="dialog-"
          data-testid="cookie-dialog-root"
        >
          <section
            className="dialog-backdrop-container css-518m28  e1yn52e40 relative"
            //   appearance="base"
            data-testid="cookie-dialog"
          >
            <div
              //   className="dialog-main css-15zin7s e16f1y9y0"
              className="px-[60px] pt-12 pb-[36px] overflow-scroll css-15zin7s"
            >
              <div className="dialog-header-container">
                <header>
                  <h1
                    className="nds-text title-heading headline-3 appearance-heading1 color-primary weight-regular"
                    id="dialog-"
                    data-testid="dialog-header-title"
                  ></h1>
                </header>
              </div>
              <div className="dialog-content css-oz7col e4rebre0">
                <div data-testid="cookie-modal-content">
                  <h2
                    className="nds-text css-mubwpn appearance-heading2 color-primary weight-regular"
                    data-testid="header-metadata-title"
                  >
                    Bonjour Dusty Hordofel, paramétrons tes préférences de
                    confidentialité
                  </h2>
                  <p
                    className="nds-text css-1dy36ap appearance-body2 color-primary weight-regular"
                    data-testid="header-metadata-description"
                  >
                    Si tu as déjà fait ces choix avant, nous les avons
                    pré-remplis ici pour te faciliter la tâche. Vérifie tes
                    choix ou modifie-les ci-dessous. Tous tes choix seront
                    appliqués sur Nike.com et les apps Nike que tu utilises.
                    Nous utilisons des cookies et des technologies similaires,
                    appartenant à Nike ou à des tiers. Tu peux modifier tes
                    préférences à tout moment en cliquant sur
                    «&nbsp;Confidentialité&nbsp;» dans les Paramètres, ou en
                    cliquant sur le lien «&nbsp;Paramètres de confidentialité et
                    de cookies&nbsp;» au bas de la page Nike.com. Pour en savoir
                    plus, consulte notre
                    <a
                      target="_blank"
                      style={{ textDecoration: "underline", font: "inherit" }}
                      id="privacyPolicyLinkData"
                      href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&amp;uxId=com.nike.commerce.nikedotcom.web&amp;country=FR&amp;language=fr&amp;requestType=redirect"
                    >
                      Politique de confidentialité et de gestion des cookies
                    </a>
                    .
                  </p>
                  <div
                    className="nds-box css-foe94v e161jrzw0"
                    data-testid="separator"
                  ></div>
                  <div
                    className="nds-box css-dhzfjr e161jrzw0"
                    data-testid="always-on-disclosure"
                  >
                    <div className="nds-box css-1lgadan e161jrzw0">
                      <h5 className="nds-text css-1m8fjbo e1yhcai00 appearance-heading5 color-primary weight-regular">
                        Strictement nécessaires (toujours activés)
                      </h5>
                    </div>
                    <p className="nds-text css-gv2gi2 e1yhcai00 appearance-body3 color-secondary weight-regular">
                      Permet aux fonctionnalités principales de mémoriser ta
                      langue, ton emplacement et le contenu de ton panier.
                      Assure aussi la sécurité, la gestion du réseau et
                      l&apos;accessibilité.
                    </p>
                  </div>
                  <div
                    className="nds-box css-foe94v e161jrzw0"
                    data-testid="separator"
                  ></div>
                  <div
                    className="nds-box css-18bik8i e161jrzw0"
                    data-testid="radio-button-component"
                  >
                    <div className="nds-radio-set css-1c1dymp">
                      <fieldset
                        className="css-12y15ch e5ue6ze0 nds-fieldset custom-fieldset light"
                        aria-label="Performances et analyses"
                      >
                        <legend className="nds-selection-set-legend">
                          <h3>Performances et analyses</h3>
                        </legend>
                        <div className="nds-box css-vdup32 e161jrzw0">
                          <div className="nds-box css-1eth16k e161jrzw0">
                            <p className="nds-text css-gv2gi2 e1yhcai00 appearance-body3 color-secondary weight-regular">
                              Autorise l&apos;utilisation des données
                              comportementales pour optimiser les performances,
                              étudier tes interactions avec nos sites et apps et
                              améliorer l&apos;expérience Nike.
                            </p>
                          </div>
                        </div>
                        <div className="nds-selection-children-container custom-children-container">
                          <div className="nds-radio custom-radio-field css-11laa0v">
                            <input
                              type="radio"
                              name="8cdd41d5-d916-4d3e-b75e-89ebec9787e9"
                              className=""
                              id="8cdd41d5-d916-4d3e-b75e-89ebec9787e9-acceptLabel"
                              value="true"
                              checked={false}
                            />
                            <span className="radio-circle"></span>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                              role="img"
                              width="24px"
                              height="24px"
                            >
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g transform="translate(2.000000, 2.000000)">
                                  <circle
                                    className="radio-outline"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    cx="10"
                                    cy="10"
                                    r="9.25"
                                  ></circle>
                                  <circle
                                    className="radio-fill"
                                    fill="currentColor"
                                    cx="10"
                                    cy="10"
                                    r="5"
                                  ></circle>
                                </g>
                              </g>
                            </svg>
                            <label htmlFor="8cdd41d5-d916-4d3e-b75e-89ebec9787e9-acceptLabel">
                              Autoriser l’utilisation des données pour améliorer
                              l’expérience
                            </label>
                          </div>
                          <div className="nds-radio custom-radio-field css-11laa0v">
                            <input
                              type="radio"
                              name="8cdd41d5-d916-4d3e-b75e-89ebec9787e9"
                              className=""
                              id="8cdd41d5-d916-4d3e-b75e-89ebec9787e9-declineLabel"
                              value="false"
                            />
                            <span className="radio-circle"></span>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                              role="img"
                              width="24px"
                              height="24px"
                            >
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g transform="translate(2.000000, 2.000000)">
                                  <circle
                                    className="radio-outline"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    cx="10"
                                    cy="10"
                                    r="9.25"
                                  ></circle>
                                  <circle
                                    className="radio-fill"
                                    fill="currentColor"
                                    cx="10"
                                    cy="10"
                                    r="5"
                                  ></circle>
                                </g>
                              </g>
                            </svg>
                            <label htmlFor="8cdd41d5-d916-4d3e-b75e-89ebec9787e9-declineLabel">
                              Ne pas autoriser l’utilisation des données pour
                              améliorer l’expérience
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div
                    className="nds-box css-foe94v e161jrzw0"
                    data-testid="separator"
                  ></div>
                  <div
                    className="nds-box css-18bik8i e161jrzw0"
                    data-testid="radio-button-component"
                  >
                    <div className="nds-radio-set css-1c1dymp">
                      <fieldset
                        className="css-12y15ch e5ue6ze0 nds-fieldset custom-fieldset light"
                        aria-label="Expériences personnalisées"
                      >
                        <legend className="nds-selection-set-legend">
                          <h3>Expériences personnalisées</h3>
                        </legend>
                        <div className="nds-box css-vdup32 e161jrzw0">
                          <div className="nds-box css-1eth16k e161jrzw0">
                            <p className="nds-text css-gv2gi2 e1yhcai00 appearance-body3 color-secondary weight-regular">
                              Autorise l&apos;utilisation des données
                              comportementales, avec, entre autres, des cookies,
                              pour améliorer ton expérience et te proposer du
                              contenu pertinent sur les plateformes et dans les
                              communications Nike.
                            </p>
                          </div>
                        </div>
                        <div className="nds-selection-children-container custom-children-container">
                          <div className="nds-radio custom-radio-field css-11laa0v">
                            <input
                              type="radio"
                              name="5b258c22-cdcb-429c-8e19-61d5944a3231"
                              className=""
                              id="5b258c22-cdcb-429c-8e19-61d5944a3231-acceptLabel"
                              value="true"
                              checked={false}
                            />
                            <span className="radio-circle"></span>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                              role="img"
                              width="24px"
                              height="24px"
                            >
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g transform="translate(2.000000, 2.000000)">
                                  <circle
                                    className="radio-outline"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    cx="10"
                                    cy="10"
                                    r="9.25"
                                  ></circle>
                                  <circle
                                    className="radio-fill"
                                    fill="currentColor"
                                    cx="10"
                                    cy="10"
                                    r="5"
                                  ></circle>
                                </g>
                              </g>
                            </svg>
                            <label htmlFor="5b258c22-cdcb-429c-8e19-61d5944a3231-acceptLabel">
                              Autoriser les expériences personnalisées
                            </label>
                          </div>
                          <div className="nds-radio custom-radio-field css-11laa0v">
                            <input
                              type="radio"
                              name="5b258c22-cdcb-429c-8e19-61d5944a3231"
                              className=""
                              id="5b258c22-cdcb-429c-8e19-61d5944a3231-declineLabel"
                              value="false"
                            />
                            <span className="radio-circle"></span>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                              role="img"
                              width="24px"
                              height="24px"
                            >
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g transform="translate(2.000000, 2.000000)">
                                  <circle
                                    className="radio-outline"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    cx="10"
                                    cy="10"
                                    r="9.25"
                                  ></circle>
                                  <circle
                                    className="radio-fill"
                                    fill="currentColor"
                                    cx="10"
                                    cy="10"
                                    r="5"
                                  ></circle>
                                </g>
                              </g>
                            </svg>
                            <label htmlFor="5b258c22-cdcb-429c-8e19-61d5944a3231-declineLabel">
                              Ne pas autoriser les expériences personnalisées
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div
                    className="nds-box css-foe94v e161jrzw0"
                    data-testid="separator"
                  ></div>
                  <div
                    className="nds-box css-18bik8i e161jrzw0"
                    data-testid="radio-button-component"
                  >
                    <div className="nds-radio-set css-1c1dymp">
                      <fieldset
                        className="css-12y15ch e5ue6ze0 nds-fieldset custom-fieldset light"
                        aria-label="Publicités personnalisées"
                      >
                        <legend className="nds-selection-set-legend">
                          <h3>Publicités personnalisées</h3>
                        </legend>
                        <div className="nds-box css-vdup32 e161jrzw0">
                          <div className="nds-box css-1eth16k e161jrzw0">
                            <p className="nds-text css-gv2gi2 e1yhcai00 appearance-body3 color-secondary weight-regular">
                              Autorise le partage de données comportementales
                              avec des partenaires publicitaires. Ces données
                              servent à améliorer et à suivre l&apos;expérience
                              publicitaire personnalisée sur des sites
                              partenaires.
                            </p>
                          </div>
                          <div className="nds-box css-1eth16k e161jrzw0">
                            <button
                              aria-label="En savoir plus sur les publicités personnalisées"
                              className="nds-btn css-1i5be0d cta-primary-dark underline btn-responsive"
                              type="submit"
                              data-testid="learn-more-button"
                            >
                              <p className="nds-text css-gv2gi2 e1yhcai00 appearance-body3 color-secondary weight-regular">
                                En savoir plus sur les publicités personnalisées
                              </p>
                              <span className="ripple"></span>
                            </button>
                          </div>
                        </div>
                        <div className="nds-selection-children-container custom-children-container">
                          <div className="nds-radio custom-radio-field css-11laa0v">
                            <input
                              type="radio"
                              name="94469303-c7b1-40be-9acb-dbb32d42d1d7"
                              className=""
                              id="94469303-c7b1-40be-9acb-dbb32d42d1d7-acceptLabel"
                              value="true"
                              checked={false}
                            />
                            <span className="radio-circle"></span>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                              role="img"
                              width="24px"
                              height="24px"
                            >
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g transform="translate(2.000000, 2.000000)">
                                  <circle
                                    className="radio-outline"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    cx="10"
                                    cy="10"
                                    r="9.25"
                                  ></circle>
                                  <circle
                                    className="radio-fill"
                                    fill="currentColor"
                                    cx="10"
                                    cy="10"
                                    r="5"
                                  ></circle>
                                </g>
                              </g>
                            </svg>
                            <label htmlFor="94469303-c7b1-40be-9acb-dbb32d42d1d7-acceptLabel">
                              Autoriser le partage de données comportementales
                            </label>
                          </div>
                          <div className="nds-radio custom-radio-field css-11laa0v">
                            <input
                              type="radio"
                              name="94469303-c7b1-40be-9acb-dbb32d42d1d7"
                              className=""
                              id="94469303-c7b1-40be-9acb-dbb32d42d1d7-declineLabel"
                              value="false"
                            />
                            <span className="radio-circle"></span>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                              role="img"
                              width="24px"
                              height="24px"
                            >
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g transform="translate(2.000000, 2.000000)">
                                  <circle
                                    className="radio-outline"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    cx="10"
                                    cy="10"
                                    r="9.25"
                                  ></circle>
                                  <circle
                                    className="radio-fill"
                                    fill="currentColor"
                                    cx="10"
                                    cy="10"
                                    r="5"
                                  ></circle>
                                </g>
                              </g>
                            </svg>
                            <label htmlFor="94469303-c7b1-40be-9acb-dbb32d42d1d7-declineLabel">
                              Ne pas autoriser le partage de données
                              comportementales
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div
                    className="nds-box css-foe94v e161jrzw0"
                    data-testid="separator"
                  ></div>
                  <div className="css-uw46dw">
                    <button
                      aria-label="Confirmer"
                      className="nds-btn css-v6yc1w ex41m6f0 btn-secondary-dark btn-md"
                      type="button"
                      data-testid="confirm-choice-button"
                    >
                      Confirmer<span className="ripple"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              // px-[60px] pt-12 pb-[36px] bg-orange relative
              className="css-1ncut4k"
              data-testid="dialog-actions"
            >
              <div className="flex flex-row-reverse gap-x-3 bg-info">
                <Button aria-label="Tout accepter">
                  Tout accepter<span className="ripple"></span>
                </Button>
                <Button aria-label="Tout refuser">
                  Tout refuser<span className="ripple"></span>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis fugiat
        fuga vitae, laborum nam quis suscipit earum, quae distinctio, officia
        possimus deleniti saepe praesentium hic magnam cum necessitatibus
        aliquid. Nemo quis tempore accusantium, laboriosam vero rem? Dicta
        veniam recusandae, nisi unde quo delectus illo quaerat! Est mollitia
        soluta, maxime ea exercitationem vel quam incidunt, a quis, nulla
        dolorem delectus repellat reprehenderit. Vitae quae ipsa neque, eaque
        quis, numquam asperiores error maiores fugit atque labore, mollitia enim
        voluptate quaerat aliquam doloremque architecto consectetur quisquam ea
        itaque at sequi odit. Iste esse officiis iure id in. Dolor debitis
        provident iusto hic fuga! Optio, illo iste! Praesentium ea perferendis
        voluptatibus, minus nam, aliquid atque aperiam ab debitis id distinctio
        laboriosam enim fugiat rem! Iste corporis odit maiores debitis minus, ea
        accusamus inventore animi aliquid consequuntur. Accusamus natus animi
        distinctio nesciunt praesentium in laboriosam vero et cumque illum
        deserunt sit ipsam doloremque fuga eaque rerum commodi ducimus,
        inventore eius voluptatum eum deleniti! Corporis, voluptatem ullam et
        dicta officiis cupiditate a hic enim reprehenderit commodi explicabo
        suscipit repellendus doloremque maxime consequuntur ab error quisquam
        animi ex labore debitis maiores. Iusto vitae harum magni ratione autem
        quisquam minus pariatur architecto nisi. Praesentium, amet quaerat!
        Corporis saepe rerum nobis optio aspernatur, eius officiis hic impedit
        excepturi repellendus nisi minima ullam enim laborum incidunt inventore
        vel fugiat sint, temporibus, blanditiis dolore tempora error commodi.
        Autem ipsum consectetur deleniti? Est at similique eius ut ipsa laborum
        nobis neque quis modi officia. Aperiam, doloribus est assumenda
        explicabo expedita consequatur qui eligendi? Dignissimos adipisci animi
        itaque, soluta quia odit veritatis illo sapiente ullam at quod fugit
        optio deserunt! Porro mollitia modi aperiam, adipisci quasi unde optio
        molestiae impedit alias amet a enim. Eligendi cumque veniam eveniet
        dignissimos reiciendis natus, architecto cupiditate atque accusamus
        facilis tempore minima excepturi nobis praesentium soluta similique nemo
        blanditiis nulla amet consequuntur vel eos, quia veritatis beatae! Nisi,
        temporibus ipsam id, libero quaerat dignissimos quidem corrupti quae
        suscipit magnam atque? Dolores recusandae corporis ipsam voluptate.
        Incidunt, culpa maxime quisquam consequatur ullam tempora, natus
        explicabo quasi quod temporibus nostrum cumque minus! Soluta,
        consectetur aspernatur ipsum natus autem veniam quisquam, doloribus
        porro id odit vitae ratione ad nobis? Minus aut quaerat ducimus, facilis
        quo magnam commodi molestias nostrum cum, odio numquam id animi
        doloribus repudiandae pariatur! Dolorem recusandae rerum ducimus
        excepturi hic voluptatibus repellat eos? Repellat et nostrum provident
        minima eum. Voluptate architecto adipisci tempora saepe soluta ut dicta
        inventore itaque recusandae delectus tenetur iusto repudiandae, quae
        porro repellat dolore quibusdam magni praesentium aspernatur nisi odio
        optio commodi a maiores! Quidem nemo vel pariatur odit aliquid iure
        libero quam provident rerum sunt, mollitia optio repellendus corporis
        laborum dolorum velit animi minus ducimus aut voluptatem odio voluptate.
        Labore hic consequuntur corrupti omnis facere adipisci minus. Quae hic
        nostrum laboriosam recusandae. Aspernatur cum voluptate quam, maiores
        doloremque repudiandae dolorem fuga consectetur vero sequi culpa dolore
        mollitia quia quas accusantium non atque eligendi similique possimus in
        cumque reprehenderit eius hic ipsum? Laudantium minus odio vel
        aspernatur soluta et officia error porro beatae?
      </div>
    </>
  );
};

export default CookiesPage;

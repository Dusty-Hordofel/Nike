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
            <span>
              ©&nbsp; {new Date().getFullYear()} Nike, Inc. All Rights Reserved
            </span>
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
              Terms of Sale
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
              Terms of Use
            </p>
          </Link>
        </li>

        <li>
          <Link
            aria-label="nike privacy policy"
            className="css-1isz5ne"
            data-testid="link"
            href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&amp;uxId=com.nike.commerce.nikedotcom.web&amp;country=US&amp;language=en&amp;requestType=redirect"
          >
            <p
              className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
              style={{ paddingLeft: "0px" }}
            >
              Nike Privacy Policy
            </p>
          </Link>
        </li>

        <li>
          <Link
            aria-label="your privacy choices"
            className="flex items-center gap-x-1"
            data-testid="link"
            href="https://www.nike.com/guest/settings/do-not-share-my-data"
          >
            <img
              alt=""
              aria-hidden="true"
              src="https://static.nike.com/a/images/w_960,c_limit/3732c58b-d0ad-4c3c-898c-c4b90193312b/image.png"
              style={{ objectFit: "contain" }}
            />

            <p
              className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
              style={{ paddingLeft: "0px" }}
            >
              Your Privacy Choices
            </p>
          </Link>
        </li>

        <li>
          <Link
            aria-label="ca supply chains act"
            className="css-1isz5ne"
            data-testid="link"
            href="https://about.nike.com/en/impact-resources/statement-on-forced-labor"
          >
            <p
              className="nds-text css-170191f e1yhcai00 appearance-body2Strong color-primary weight-regular"
              style={{ paddingLeft: "0px" }}
            >
              CA Supply Chains Act
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NikeTerms;

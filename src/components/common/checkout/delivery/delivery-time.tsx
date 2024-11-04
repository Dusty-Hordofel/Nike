"use client";
import React from "react";

const DeliveryTime = ({ deliveryStep }: { deliveryStep: number | null }) => {
  return (
    <div className=" bg-orange  pt-2 px-5 mb-5">
      <div className={`flex mr-1 ${deliveryStep === 2 ? "mb-4" : ""} `}>
        <h3 className="text-black-200">
          {deliveryStep === 3
            ? "Délai de livraison"
            : deliveryStep === 2
            ? "Choisis ton délai de livraison"
            : ""}
        </h3>
        <span
          id="shippingMethodTooltipWrapper"
          className={`${deliveryStep === 2 ? "block" : "hidden"}`}
        >
          <button
            className="d-sm-ib css-9a7n2d"
            id="shippingMethodTooltip"
            aria-label="Détail des estimations d'expédition"
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
              data-attr="test-message-link"
              hidden={true}
            >
              <p className="mb2-sm">
                Les estimations d&apos;expédition tiennent compte des week-ends
                et des jours fériés.{" "}
                <a
                  href="http://help-en-us.nike.com/app/answer/article/shipping-delivery/a_id/19279/p/3897"
                  className="text-color-white css-r11el"
                  aria-label="En savoir plus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  En savoir plus
                </a>
              </p>
              <p className="">
                La livraison sous 24&nbsp;heures n&apos;est pas disponible pour
                les sites difficiles d&apos;accès.
              </p>
            </div>
          </button>
        </span>
      </div>
      <div
        data-attr="shippingContainer"
        className={`shippingContainer ${
          deliveryStep === 2
            ? "block border-2 rounded-lg border-black-200 text-black-200 p-4 "
            : deliveryStep === 3
            ? "text-gray-500 block"
            : "hidden"
        } `}
      >
        <p data-attr="shipping-preview-method">
          Gratuit
          <br />
          <span>Livraison d&apos;ici le&nbsp;mer. 26 juin</span>
        </p>
      </div>
    </div>
  );
};

export default DeliveryTime;

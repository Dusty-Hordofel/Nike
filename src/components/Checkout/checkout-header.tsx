import { Dispatch, SetStateAction } from "react";

const CheckoutHeader = ({
  title,
  done,
  // setShowAddressForm,
  // formStep,
  onDeliveryStep,
}: {
  title: string;
  // formStep: number;
  onDeliveryStep: Dispatch<SetStateAction<number>>;
  done: boolean;
  // setShowAddressForm: any;
}) => {
  return (
    <header className="flex bg-warning justify-between px-5 pt-3 pb-7">
      <h2 className="flex text-2xl font-medium ">
        {title}

        {done && (
          <span className="flex items-center ml-3">
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
              color="green"
            >
              <path
                stroke="currentColor"
                stroke-width="1.5"
                d="M5.03 11.69l4.753 4.754 9.186-9.188"
              ></path>
            </svg>
          </span>
        )}
      </h2>
      {done && (
        <button
          aria-label="Modifier,Options de livraison"
          className="underline"
          type="button"
          data-attr="editButton"
          onClick={() => onDeliveryStep(2)}
        >
          Modifier
        </button>
      )}
    </header>
  );
};

export default CheckoutHeader;

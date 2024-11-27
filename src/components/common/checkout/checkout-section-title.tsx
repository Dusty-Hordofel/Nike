import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const CheckoutSectionTitle = ({
  title,
  isComplete,
  showEditLink,
  onChangeStep,
}: {
  title: string;
  isComplete?: boolean;
  showEditLink?: boolean;
  onChangeStep?: () => void;
}) => {
  return (
    <header className="flex justify-between items-center px-5 pt-3 pb-7">
      <h2 className="flex text-2xl font-medium ">
        {title}

        {isComplete && (
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
      {isComplete && onChangeStep && (
        <button
          aria-label="Modify,Delivery options"
          className="underline text-sm"
          type="button"
          data-attr="editButton"
          onClick={onChangeStep}
        >
          Edit
        </button>
      )}

      {showEditLink && (
        <Link
          aria-label="Modify,Delivery options"
          className="underline text-sm"
          type="button"
          data-attr="editButton"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cart`}
        >
          Edit
        </Link>
      )}
    </header>
  );
};

export default CheckoutSectionTitle;

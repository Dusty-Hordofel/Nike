import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

interface SortButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  filters: any;
}

type SortFilter = "asc" | "desc" | "featured" | "newest";

const SortButton = forwardRef<HTMLButtonElement, SortButtonProps>(
  ({ filters, showDropdown, setShowDropdown, ...props }, ref) => {
    return (
      <button
        aria-controls="sort-options"
        aria-expanded={showDropdown}
        aria-label="Sort By"
        id="dropdown-btn"
        role="listbox"
        tabIndex={0}
        type="button"
        ref={ref}
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
        {...props}
      >
        <span className="flex">
          <span className="pr-2">
            Sort By{filters.price && ":"}{" "}
            <span className="text-gray-500">
              {{
                asc: "Price: Low-High",
                desc: "Price: High-Low",
                featured: "Featured",
                newest: "Newest",
              }[filters.price as SortFilter] || ""}
            </span>
          </span>
          {/* <span className="pr-2">
            Sort By{filters.price && ":"}{" "}
            <span className="text-gray-500">
              {filters.price === "asc"
                ? "Price: Low-High"
                : filters.price === "desc"
                  ? "Price: High-Low"
                  : filters.price === "featured"
                    ? "Featured"
                    : filters.price === "newest" && "Newest"}
            </span>
          </span> */}
          <span>
            <ChevronDown
              className={`transform transition-transform ${showDropdown ? "-rotate-180" : "rotate-0"} cursor-pointer`}
            />
          </span>
        </span>
      </button>
    );
  }
);

export default SortButton;

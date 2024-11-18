const ProductFilterButton = ({
  setShowSidebar,
  isLargeScreen,
  showSidebar,
}: any) => {
  return (
    <button
      // aria-controls="left-nav"
      // aria-describedby="Nike-Tech-Clothing"
      aria-expanded={showSidebar}
      aria-label={
        showSidebar && isLargeScreen
          ? "Hide Filters"
          : isLargeScreen
          ? "Show Filters"
          : "Filters"
      }
      className={`flex ${
        !isLargeScreen
          ? "border border-gray-400 rounded-full justify-center items-center py-[6px] px-5"
          : "pr-6"
      }`}
      type="button"
      onClick={() => setShowSidebar(!showSidebar)}
    >
      <span className={`pr-2`}>
        {showSidebar && isLargeScreen
          ? "Hide Filters"
          : isLargeScreen
          ? "Show Filters"
          : "Filters"}
      </span>
      <svg
        aria-hidden="true"
        className="icon-filter-ds"
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
          d="M21 8.25H10m-5.25 0H3"
        ></path>
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
          clip-rule="evenodd"
        ></path>
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M3 15.75h10.75m5 0H21"
        ></path>
        <path
          stroke="currentColor"
          stroke-width="1.5"
          d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default ProductFilterButton;

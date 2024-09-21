interface AddItemButtonProps {
  onClick: () => void;
  label: string;
}

const AddItemButton = ({ onClick, label }: AddItemButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full aspect-square bg-gray-200 flex justify-center items-center flex-col gap-y-4 group"
    >
      <svg
        className="group-hover:scale-125 transition-all"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        role="img"
        width="24px"
        height="24px"
        fill="none"
      >
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M12 6v12m6-6H6m15.75 0c0 5.39-4.36 9.75-9.75 9.75S2.25 17.39 2.25 12 6.61 2.25 12 2.25s9.75 4.36 9.75 9.75z"
        ></path>
      </svg>
      <span className="text-2xl font-medium group-hover:scale-125 transition-all">
        {label}
      </span>
    </button>
  );
};

export default AddItemButton;

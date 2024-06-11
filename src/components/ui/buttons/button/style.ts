export const ButtonStyle = {
  base: "flex items-center justify-center cursor-pointer transition-colors w-full relative rounded-[30px]",
  variants: {
    variant: {
      primary:
        " bg-black-200 text-white border-black-200 hover:bg-gray-500 hover:border-gray-500 text-white border-[1.5px]",
      secondary: "bg-white text-black-200  border-white hover:bg-gray-300",
      outline:
        "border border-gray-200 hover:border-black-200 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      small: "h-9 px-4 py-[6px] mr-[6px]",
      medium: "h-12 px-6 py-3",
      large: "h-[58px] px-6 py-[18px]",
    },
    fullWidth: {
      true: "w-full",
      false: "w-max",
    },
  },
  // compoundVariants: [
  //   {
  //     variant: "primary",
  //     size: "small",
  //     fullWidth: false,
  //   },
  //   {
  //     variant: "secondary",
  //     size: "small",
  //     fullWidth: false,
  //   },
  //   {
  //     variant: "primary",
  //     size: "medium",
  //     fullWidth: false,
  //   },
  //   {
  //     variant: "primary",
  //     size: "medium",
  //     fullWidth: false,
  //   },
  //   {
  //     variant: "secondary",
  //     size: "medium",
  //     fullWidth: false,
  //   },
  //   {
  //     variant: "primary",
  //     size: "large",
  //     fullWidth: true,
  //   },
  //   {
  //     variant: "secondary",
  //     size: "large",
  //     fullWidth: true,
  //   },
  // ],
  // defaultVariants: {
  //   variant: "secondary",
  //   size: "small",
  //   fullWidth: false,
  // },
};

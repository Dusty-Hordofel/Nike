// import  Loading  from "@/assets/icons/loading/loading";
import { Loading } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonStyle } from "./style";

export const buttonVariants = cva(ButtonStyle.base, {
  variants: {
    variant: ButtonStyle.variants.variant,
    size: ButtonStyle.variants.size,
    fullWidth: ButtonStyle.variants.fullWidth,
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "small",
      fullWidth: false,
    },
    { variant: "link", size: "small" },
    { variant: "ghost", size: "small" },
    {
      variant: "secondary",
      size: "small",
      fullWidth: false,
    },
    {
      variant: "primary",
      size: "medium",
      fullWidth: false,
    },
    {
      variant: "outline",
      size: "medium",
      fullWidth: false,
    },
    {
      variant: "secondary",
      size: "medium",
      fullWidth: false,
    },
    {
      variant: "primary",
      size: "large",
      fullWidth: true,
    },
    {
      variant: "secondary",
      size: "large",
      fullWidth: true,
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "medium",
    fullWidth: false,
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    isLoading?: boolean;
  };

export const Button = ({
  children,
  variant,
  size,
  fullWidth,
  disabled,
  isLoading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, fullWidth })}
      {...props}
      disabled={isLoading}
    >
      <span className={`${isLoading ? "invisible" : "visible"}`}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute inline-block -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
          <Loading />
          <span className="sr-only">Loading</span>
        </span>
      )}
    </button>
  );
};

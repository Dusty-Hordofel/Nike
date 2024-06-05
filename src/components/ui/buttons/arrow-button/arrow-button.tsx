import ChevronRight from "@/assets/icons/chevron-right/chevron-right";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowButtonStyle } from "./style";

export const iconButtonVariants = cva(ArrowButtonStyle.base, {
  defaultVariants: { direction: "right" },
  variants: {
    direction: {
      left: "rotate-180",
      right: "rotate-0",
    },
  },
});

export type ArrowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants> & {
    disabled?: boolean;
    // hover:ArrowButtonStyle.hover
  };

export const ArrowButton = ({
  direction,
  disabled,
  className,
  ...props
}: ArrowButtonProps) => {
  return (
    <button
      className={iconButtonVariants({ direction })}
      {...props}
      disabled={disabled}
    >
      <ChevronRight />
    </button>
  );
};

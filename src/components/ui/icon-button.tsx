import { cn } from "@/lib/utils";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={cn("rounded-full p-[6px] hover:bg-gray-200", className)}
      {...props}
    >
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default IconButton;

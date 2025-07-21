import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "danger" | "ghost";
  className?: string;
  disabled?: boolean;
  isSelected?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  disabled = false,
  isSelected = false,
  ...props
}) => {
  const baseStyles = ` ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } px-4 py-2 text-sm font-medium rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`;

  const hoverStyles = {
    default: "hover:bg-gray-800",
    outline: "hover:bg-black hover:text-white",
    danger: "hover:bg-red-500 hover:text-white",
    ghost: "hover:bg-gray-100",
  };

  const baseVariants = {
    default: "bg-black text-white border border-black",
    outline: "bg-white text-black border border-black",
    danger: "bg-white text-black border border-black",
    ghost: "bg-transparent text-black border border-transparent",
  };

  const selectedStyles = isSelected ? "bg-zinc-800 text-white" : "";

  return (
    <button
      className={clsx(
        baseStyles,
        baseVariants[variant],
        !isSelected && hoverStyles[variant],
        selectedStyles,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

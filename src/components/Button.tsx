import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "danger" | "ghost";
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 text-sm font-medium rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black";

  const variants = {
    default: "bg-black text-white border border-black hover:bg-gray-800",
    outline:
      "bg-white text-black border border-black hover:bg-black hover:text-white",
    danger:
      "bg-white text-black border border-black hover:bg-red-500 hover:text-white",
    ghost:
      "bg-transparent text-black hover:bg-gray-100 border border-transparent",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

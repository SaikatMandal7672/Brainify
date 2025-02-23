import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  innerText: string;
  border?: string;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantClass = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-500",
};
const defaultStyle =
  "flex px-4 py-2 rounded-md justify-center items-center text-base hover:cursor-pointer";
export const Button = ({
  variant,
  innerText,
  startIcon,
  onClick,
  border,
}: ButtonProps) => {
  return (
    <button
      className={variantClass[variant] + " " + defaultStyle + " " + border}
      onClick={onClick}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {innerText}
    </button>
  );
};

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ForwardedRef, forwardRef, HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { ButtonProps } from "./types/Button.types";

function Button({ children, to, type, onClick, addClass = "", size, ...props }: ButtonProps) {
  const baseStyle =
    "inline-block rounded-[2rem] font-semibold uppercase tracking-wide transition-colors text-background  focus:outline-none focus:ring focus:ring-cyan-500 focus:ring-offset-2 active:translate-y-0.5 mt-8";

  if (to)
    return (
      <Link to={to} className={baseStyle}>
        {children}
      </Link>
    );

    const sizes = {
      xs: "text-quaternary px-4 py-4",
      sm: "text-tertiary px-6 py-6",
      md: "text-tertiary px-4 py-6 md:text-2xl md:px-6 md:py-8",
      lg: "text-secondary px-10 py-8",
      xl: "text-primary px-12 py-10 font-bold"
    }

  const styles = {
    primary: baseStyle + " bg-accentBright  dark:bg-accent hover:bg-accentBrightHover dark:hover:bg-accentHover shadow-xl dark:shadow-white ",
    secondary:
      "inline-block rounded ring ring-red-300 uppercase tracking-wide text-stone-800 transition-colors hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2 active:translate-y-0.5 hover:text-slate-200 hover:ring-transparent",
    error:
      baseStyle +
      " bg-error text-text hover:bg-edisma",
    outline: baseStyle + " !text-accent border-2 border-solid border-accent"
  };

  if (onClick)
    return (
      <button
        // ref={ref}
        onClick={onClick}
        {...props}
        className={`${styles[type]} ${sizes[size]} ${addClass ? addClass : ""}`}
      >
        {children}
      </button>
    );

  return (
    <button
      // ref={ref}
      {...props}
      className={`${styles[type]} ${sizes[size]} ${addClass ? addClass : ""} self-center`}
    >
      {children}
    </button>
  );
}

// Button = forwardRef(Button);

export default Button;

// export const MotionButton = motion(Button);

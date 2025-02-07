import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";


type ButtonSizes = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonTypes = "primary" | "secondary" | "error" | "outline";
export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode,
  to?: string,
  type: ButtonTypes;
  size: ButtonSizes;
  addClass?: string;
  handler?: () => void;
}
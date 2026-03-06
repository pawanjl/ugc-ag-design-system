import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps } from "framer-motion";
import { buttonVariants } from "./button.variants";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "size">, // Omit size from framer-motion props to use our custom size variant
  VariantProps<typeof buttonVariants> {
  /**
   * The content of the button
   */
  children?: ReactNode;
  /**
   * If true, the button will show a loading spinner and be disabled
   */
  loading?: boolean;
  /**
   * Icon to display before the children
   */
  leftIcon?: ReactNode;
  /**
   * Icon to display after the children
   */
  rightIcon?: ReactNode;
  /**
   * Screen reader text for icon-only buttons
   */
  ariaLabel?: string;
  /**
   * If true, disables the press down (scale) animation
   */
  disableScale?: boolean;
  /**
   * If true, disables the upward hover lift animation
   */
  disableHover?: boolean;
}

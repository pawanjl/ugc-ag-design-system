"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button.variants";
import { type ButtonProps } from "./button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      disableScale = false,
      disableHover = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        whileHover={(!isDisabled && !disableHover) ? { y: -1 } : undefined}
        whileTap={(!isDisabled && !disableScale) ? { scale: 0.96 } : undefined}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        {...props}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {loading && (
            <motion.span
              key="loader"
              initial={{ opacity: 0, width: 0, scale: 0 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0 }}
              className="mr-2 flex items-center justify-center"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </motion.span>
          )}

          {!loading && leftIcon && (
            <motion.span
              key="leftIcon"
              initial={{ opacity: 0, width: 0, scale: 0 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0 }}
              className="mr-2 flex items-center justify-center"
            >
              {leftIcon}
            </motion.span>
          )}
        </AnimatePresence>

        {children && (
          <motion.span
            layout="position"
            className="flex items-center justify-center"
          >
            {children}
          </motion.span>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          {!loading && rightIcon && (
            <motion.span
              key="rightIcon"
              initial={{ opacity: 0, width: 0, scale: 0 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0 }}
              className="ml-2 flex items-center justify-center"
            >
              {rightIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

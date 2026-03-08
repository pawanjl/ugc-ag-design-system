import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedFormGroupProps {
  children: ReactNode;
  label?: string;
  error?: string;
  description?: string;
  className?: string;
}

export function AnimatedFormGroup({
  children,
  label,
  error,
  description,
  className,
}: AnimatedFormGroupProps) {
  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {children}
      </div>

      <AnimatePresence mode="wait">
        {description && !error && (
          <motion.p
            key="description"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[0.8rem] text-muted-foreground mt-1"
          >
            {description}
          </motion.p>
        )}
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[0.8rem] text-destructive mt-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

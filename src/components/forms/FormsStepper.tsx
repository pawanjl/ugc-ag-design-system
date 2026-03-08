import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description?: string;
}

interface FormsStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export function FormsStepper({
  steps,
  currentStep,
  onStepClick,
  className,
}: FormsStepperProps) {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex justify-between items-start relative">
        {/* Progress Bar Background */}
        <div className="absolute top-[15px] left-0 w-full h-[2px] bg-muted -z-10 px-8">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(100 / (steps.length - 1)) * currentStep}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;
          const isPending = currentStep < index;

          return (
            <div 
              key={index}
              onClick={() => onStepClick && onStepClick(index)}
              className={cn(
                "flex flex-col items-center relative gap-2",
                onStepClick ? "cursor-pointer" : ""
              )}
            >
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? "hsl(var(--primary))" : isCurrent ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  borderColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "hsl(var(--border))",
                  color: isCompleted || isCurrent ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                  scale: isCurrent ? 1.1 : 1
                }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-colors z-10",
                  isCurrent ? "ring-4 ring-primary/20" : ""
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </motion.div>
              <div className="text-center mt-2">
                <p className={cn(
                  "text-[11px] sm:text-sm leading-tight sm:leading-normal font-medium transition-colors max-w-[70px] sm:max-w-none text-balance",
                  isPending ? "text-muted-foreground" : "text-foreground"
                )}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground hidden sm:block mt-0.5 max-w-[120px]">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

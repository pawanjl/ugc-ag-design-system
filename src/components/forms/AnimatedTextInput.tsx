import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AnimatedTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function AnimatedTextInput({
  label,
  error,
  description,
  wrapperClassName,
  className,
  leftIcon,
  rightIcon,
  ...props
}: AnimatedTextInputProps) {
  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-muted-foreground z-10">
            {leftIcon}
          </div>
        )}
        <Input
          className={cn(
            "transition-all duration-300 focus-visible:ring-primary focus-visible:ring-offset-2",
            error ? "border-destructive focus-visible:ring-destructive" : "",
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-muted-foreground z-10">
            {rightIcon}
          </div>
        )}
      </div>
    </AnimatedFormGroup>
  );
}

import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AnimatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
}

export function AnimatedTextarea({
  label,
  error,
  description,
  wrapperClassName,
  className,
  ...props
}: AnimatedTextareaProps) {
  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <Textarea
        className={cn(
          "transition-all duration-300 min-h-[100px] focus-visible:ring-primary focus-visible:ring-offset-2",
          error ? "border-destructive focus-visible:ring-destructive" : "",
          className
        )}
        {...props}
      />
    </AnimatedFormGroup>
  );
}

import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface AnimatedSelectProps {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export function AnimatedSelect({
  label,
  error,
  description,
  wrapperClassName,
  placeholder = "Select an option",
  options,
  value,
  onValueChange,
  disabled,
}: AnimatedSelectProps) {
  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className={error ? "border-destructive focus-visible:ring-destructive" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </AnimatedFormGroup>
  );
}

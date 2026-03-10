import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Option {
  id: string;
  label: string;
}

interface AnimatedRadioGroupProps {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export function AnimatedRadioGroup({
  label,
  error,
  description,
  wrapperClassName,
  options,
  value,
  onValueChange,
  disabled,
}: AnimatedRadioGroupProps) {
  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className="grid gap-4 mt-2"
      >
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={option.id} 
              id={option.id} 
              className={error ? "border-destructive text-destructive" : ""}
            />
            <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </AnimatedFormGroup>
  );
}

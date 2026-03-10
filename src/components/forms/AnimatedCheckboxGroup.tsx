import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Option {
  id: string;
  label: string;
}

interface AnimatedCheckboxGroupProps {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  options: Option[];
  selectedValues?: string[];
  onValuesChange?: (values: string[]) => void;
  disabled?: boolean;
}

export function AnimatedCheckboxGroup({
  label,
  error,
  description,
  wrapperClassName,
  options,
  selectedValues = [],
  onValuesChange,
  disabled,
}: AnimatedCheckboxGroupProps) {
  const handleCheckedChange = (id: string, checked: boolean | "indeterminate") => {
    if (!onValuesChange) return;
    if (checked) {
      onValuesChange([...selectedValues, id]);
    } else {
      onValuesChange(selectedValues.filter((v) => v !== id));
    }
  };

  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <div className="grid gap-4 mt-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selectedValues.includes(option.id)}
              onCheckedChange={(checked: boolean | "indeterminate") => handleCheckedChange(option.id, checked)}
              disabled={disabled}
              className={error ? "border-destructive text-destructive data-[state=checked]:bg-destructive" : ""}
            />
            <Label
              htmlFor={option.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </AnimatedFormGroup>
  );
}

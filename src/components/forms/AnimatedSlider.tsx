import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { Slider } from "@/components/ui/slider";

interface AnimatedSliderProps {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  value?: number[];
  onValueChange?: (value: number[]) => void;
  max?: number;
  min?: number;
  step?: number;
  disabled?: boolean;
}

export function AnimatedSlider({
  label,
  error,
  description,
  wrapperClassName,
  value,
  onValueChange,
  max = 100,
  min = 0,
  step = 1,
  disabled,
}: AnimatedSliderProps) {
  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <div className="pt-4 pb-2">
        <Slider
          value={value}
          onValueChange={onValueChange}
          max={max}
          min={min}
          step={step}
          disabled={disabled}
          className={error ? "[&_[role=slider]]:border-destructive" : ""}
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{min}</span>
          <span>{value ? value[0] : 0}</span>
          <span>{max}</span>
        </div>
      </div>
    </AnimatedFormGroup>
  );
}

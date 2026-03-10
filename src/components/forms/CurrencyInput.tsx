import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  currencySymbol?: string;
  value?: number | null;
  onChange?: (value: number | null) => void;
}

export function CurrencyInput({
  label,
  error,
  description,
  wrapperClassName,
  currencySymbol = "$",
  className,
  value,
  onChange,
  ...props
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = React.useState<string>("");

  React.useEffect(() => {
    if (value !== undefined && value !== null) {
      // Format number to local string automatically on external prop change
      setDisplayValue(value.toLocaleString("en-US"));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-digit chars except decimal
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");
    
    // Auto insert commas while typing
    const parts = rawValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formatted = parts.join(".");
    
    setDisplayValue(formatted);

    if (onChange) {
      const numericVal = parseFloat(rawValue);
      onChange(isNaN(numericVal) ? null : numericVal);
    }
  };

  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <div className="relative flex items-center mt-2 group">
        <div className={cn(
          "absolute left-3 font-medium transition-colors z-10",
          error ? "text-destructive" : "text-muted-foreground group-focus-within:text-foreground"
        )}>
          {currencySymbol}
        </div>
        <Input
          type="text"
          value={displayValue}
          onChange={handleChange}
          className={cn(
            "pl-8 font-mono text-lg transition-all duration-300 focus-visible:ring-primary focus-visible:ring-offset-2",
            error ? "border-destructive focus-visible:ring-destructive" : "",
            className
          )}
          placeholder="0.00"
          {...props}
        />
      </div>
    </AnimatedFormGroup>
  );
}

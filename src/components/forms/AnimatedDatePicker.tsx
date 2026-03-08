"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface AnimatedDatePickerProps {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  date?: Date;
  onDateChange?: (date?: Date) => void;
  disabled?: boolean;
}

export function AnimatedDatePicker({
  label,
  error,
  description,
  wrapperClassName,
  date,
  onDateChange,
  disabled,
}: AnimatedDatePickerProps) {
  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal mt-2 transition-all duration-300",
              !date && "text-muted-foreground",
              error ? "border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" : ""
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </AnimatedFormGroup>
  );
}

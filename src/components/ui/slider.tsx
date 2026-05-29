"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
  value: number[];
  max?: number;
  min?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export function Slider({
  value,
  max = 100,
  min = 0,
  step = 1,
  onValueChange,
  className,
  ...props
}: SliderProps) {
  const percentage = ((value[0] - min) / (max - min)) * 100;

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center h-5", className)}>
      <div className="relative w-full h-1.5 rounded-full bg-secondary overflow-hidden">
        {/* Active track fill */}
        <div
          className="absolute h-full bg-primary rounded-full transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange?.([Number(e.target.value)])}
        className="absolute w-full h-5 opacity-0 cursor-pointer z-10"
        {...props}
      />
      {/* Slider thumb representation */}
      <div
        className="absolute h-4 w-4 rounded-full border border-primary/50 bg-background shadow-md transition-all duration-75 pointer-events-none ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        style={{
          left: `calc(${percentage}% - 8px)`,
        }}
      />
    </div>
  );
}

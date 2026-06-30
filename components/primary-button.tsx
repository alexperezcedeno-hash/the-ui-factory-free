"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

export const PrimaryButton = ({ children, className, color = "#ccff00", ...props }: PrimaryButtonProps) => (
  <button 
    className={cn(
      "px-8 py-4 font-black uppercase tracking-widest text-black border-4 border-black rounded-xl",
      "shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] active:translate-y-1 active:shadow-[4px_4px_0px_#000] transition-all duration-200",
      className
    )}
    style={{ backgroundColor: color } as React.CSSProperties}
    {...props}
  >
    {children}
  </button>
);

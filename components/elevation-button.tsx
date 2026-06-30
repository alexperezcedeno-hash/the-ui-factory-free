"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ElevationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

export const ElevationButton = ({ children, className, color = "#00e5ff", ...props }: ElevationButtonProps) => (
  <button 
    className={cn(
      "px-8 py-4 font-black uppercase tracking-widest text-black border-4 border-black border-b-12 rounded-2xl",
      "hover:brightness-110 active:border-b-4 active:translate-y-2 transition-all duration-100",
      className
    )}
    style={{ backgroundColor: color } as React.CSSProperties}
    {...props}
  >
    {children}
  </button>
);

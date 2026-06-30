"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

export const RetroButton = ({ children, className, color = "#ff00ff", ...props }: RetroButtonProps) => (
  <button 
    className={cn(
      "px-12 py-6 font-black text-2xl uppercase tracking-[0.2em] text-black border-8 border-black rounded-xs",
      "shadow-[16px_16px_0px_#000] hover:shadow-[24px_24px_0px_#000] active:translate-x-2 active:translate-y-2 active:shadow-[8px_8px_0px_#000] transition-all duration-200",
      className
    )}
    style={{ backgroundColor: color } as React.CSSProperties}
    {...props}
  >
    {children}
  </button>
);

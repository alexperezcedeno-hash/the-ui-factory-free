"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface DangerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

export const DangerButton = ({ children, className, color = "#ff0000", ...props }: DangerButtonProps) => (
  <button 
    className={cn(
      "px-8 py-4 font-black uppercase tracking-widest text-white border-4 border-black rounded-none",
      "hover:brightness-90 hover:skew-x-[-5deg] active:scale-90 transition-all duration-200",
      className
    )}
    style={{ backgroundColor: color } as React.CSSProperties}
    {...props}
  >
    {children}
  </button>
);

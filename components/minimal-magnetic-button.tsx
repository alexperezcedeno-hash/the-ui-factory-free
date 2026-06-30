"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const MinimalMagneticButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    {...props}
    className={cn(
      "px-8 py-3.5 rounded-lg bg-white modern:bg-black text-black modern:text-white font-inter font-medium tracking-wide",
      "hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300 ease-out",
      "shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] modern:shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]",
      "hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] modern:hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]",
      className
    )}
  >
    {children}
  </button>
);

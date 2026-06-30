"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const GhostButton = ({ children, className, ...props }: GhostButtonProps) => (
  <button 
    className={cn(
      "px-8 py-4 font-bold uppercase tracking-widest bg-transparent text-black border-4 border-dashed border-black rounded-xl",
      "hover:bg-black hover:text-white hover:border-solid active:translate-y-0.5 transition-all duration-200",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

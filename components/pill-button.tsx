"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PillButton = ({ children, className, ...props }: PillButtonProps) => (
  <button 
    className={cn(
      "px-8 py-3 font-bold uppercase tracking-wide bg-white text-black border-4 border-black rounded-full",
      "hover:bg-black hover:text-white active:scale-95 transition-all duration-200",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

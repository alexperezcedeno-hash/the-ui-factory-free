"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const NeumorphicButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    {...props}
    className={cn(
      "px-8 py-3.5 rounded-xl bg-transparent text-white/90 modern:text-black/90 font-inter font-medium tracking-wide border border-white/10 modern:border-white/20",
      "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.5)] modern:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_10px_20px_rgba(0,0,0,0.15)]",
      "hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_24px_rgba(0,0,0,0.8)] modern:hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_15px_30px_rgba(0,0,0,0.2)]",
      "active:translate-y-1 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),0_0_0_rgba(0,0,0,0)] modern:active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.1),0_0_0_rgba(0,0,0,0)]",
      "transition-all duration-300",
      className
    )}
  >
    {children}
  </button>
);

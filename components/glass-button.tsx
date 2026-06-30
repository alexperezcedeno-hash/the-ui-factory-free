"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const GlassButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    {...props}
    className={cn(
      "relative overflow-hidden px-8 py-3.5 rounded-full bg-white/5 modern:bg-white/10 backdrop-blur-xl border border-white/20 modern:border-white/40",
      "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] modern:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)]",
      "hover:bg-white/10 modern:hover:bg-white/20 hover:scale-105 transition-all duration-300 font-inter font-medium tracking-wide text-white modern:text-black",
      "before:absolute before:inset-0 before:rounded-full before:border-t before:border-white/40 modern:before:border-white/80 before:opacity-50 before:pointer-events-none",
      className
    )}
  >
    {children}
  </button>
);

"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const SoftGlowButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    {...props}
    className={cn(
      "px-8 py-3.5 rounded-xl bg-zinc-900 modern:bg-white text-white modern:text-black border border-white/5 modern:border-black/5",
      "hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] modern:hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] transition-all duration-500 font-inter font-medium tracking-wide",
      className
    )}
  >
    {children}
  </button>
);

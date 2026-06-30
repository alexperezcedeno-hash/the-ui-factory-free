"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const OutlineShiftButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    {...props}
    className={cn("relative px-8 py-3.5 overflow-hidden rounded-full border border-white/30 modern:border-black/20 group transition-all duration-500", className)}
  >
    <span className="absolute inset-0 bg-white modern:bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full"></span>
    <span className="relative z-10 font-inter font-medium tracking-wide text-white modern:text-black group-hover:text-black modern:group-hover:text-white transition-colors duration-500">
      {children}
    </span>
  </button>
);

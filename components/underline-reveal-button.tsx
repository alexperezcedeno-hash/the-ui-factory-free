"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const UnderlineRevealButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    {...props}
    className={cn("relative px-6 py-3.5 font-inter font-medium tracking-wide group outline-hidden", className)}
  >
    <span className="relative z-10 text-white/60 modern:text-black/60 group-hover:text-white modern:group-hover:text-black transition-colors duration-300">
      {children}
    </span>
    <span className="absolute left-1/2 bottom-2.5 w-0 h-px bg-white modern:bg-black group-hover:w-[calc(100%-3rem)] group-hover:left-6 transition-all duration-500 ease-out"></span>
  </button>
);

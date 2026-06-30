"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface MagicBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  gradientClassName?: string;
}

export const MagicBorderButton = ({
  children,
  className,
  gradientClassName = "bg-[conic-gradient(from_90deg_at_50%_50%,rgba(204,255,0,0)_0%,#ccff00_25%,#ff00ff_50%,rgba(204,255,0,0)_75%)] modern:bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_25%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0)_75%)]",
  ...props
}: MagicBorderButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex p-[2px] rounded-2xl",
        "active:scale-95 transition-all duration-300",
        className
      )}
    >

      <div className="absolute inset-0 z-0 overflow-hidden rounded-[15px]">
        <span 
          className={cn(
            "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] group-hover:[animation-duration:1s]",
            gradientClassName
          )}
        />
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden rounded-[15px] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span 
          className={cn(
            "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] group-hover:[animation-duration:1s]",
            gradientClassName
          )}
        />
      </div>

      <span className={cn(
        "relative z-10 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-sm",
        "font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-3xl",
        "bg-zinc-950 text-white/60 group-hover:text-white group-hover:bg-zinc-950"
      )}>
        {children}
      </span>
    </button>
  );
};

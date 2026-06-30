"use client";

import React from "react";

import { cn } from "@/lib/utils";

export const AmbientGlowBg = ({
  className,
  glowColorClass = "bg-[#ccff00]/10 modern:bg-[#E26A4E]/10",
  blurSize = 120,
}: {
  className?: string;
  glowColorClass?: string;
  blurSize?: number;
}) => {
  return (
    <div className={cn("w-full h-full min-h-screen bg-black relative overflow-hidden flex items-center justify-center", className)}>
      <div 
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none", 
          glowColorClass
        )} 
        style={{ filter: `blur(${blurSize}px)` }}
      />
    </div>
  );
};

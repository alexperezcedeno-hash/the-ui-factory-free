"use client";
import React from "react";
import { cn } from "@/lib/utils";
export interface LoaderPulseProps extends React.HTMLAttributes<HTMLDivElement> {
  dotClassName?: string;
}
export const LoaderPulse = ({ className, dotClassName, ...props }: LoaderPulseProps) => {
  const defaultDot = "w-4 h-4 rounded-full bg-[#ccff00] modern:bg-white animate-bounce shadow-[0_0_15px_rgba(204,255,0,0.5)] modern:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-colors duration-500";
  return (
    <div className={cn("flex items-center justify-center p-12 gap-2", className)} {...props}>
      <div className={cn(defaultDot, "[animation-delay:-0.3s]", dotClassName)} />
      <div className={cn(defaultDot, "[animation-delay:-0.15s]", dotClassName)} />
      <div className={cn(defaultDot, dotClassName)} />
    </div>
  );
};
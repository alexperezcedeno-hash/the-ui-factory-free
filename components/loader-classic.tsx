"use client";
import React from "react";
import { cn } from "@/lib/utils";
export interface LoaderClassicProps extends React.HTMLAttributes<HTMLDivElement> {
  spinnerClassName?: string;
}
export const LoaderClassic = ({ className, spinnerClassName, ...props }: LoaderClassicProps) => {
  return (
    <div className={cn("flex items-center justify-center p-12", className)} {...props}>
      <div className={cn("w-16 h-16 rounded-full border-4 border-white/10 border-t-[#ccff00] modern:border-t-white animate-spin", spinnerClassName)} />
    </div>
  );
};
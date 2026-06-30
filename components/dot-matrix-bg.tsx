"use client";

import React from "react";

import { cn } from "@/lib/utils";

export const DotMatrixBg = ({
  className,
  dotColor = "#ffffff15",
  backgroundColor = "black",
  spacing = 24,
  dotSize = 1,
}: {
  className?: string;
  dotColor?: string;
  backgroundColor?: string;
  spacing?: number;
  dotSize?: number;
}) => {
  return (
    <div 
      className={cn("w-full h-full min-h-screen", className)}
      style={{
        backgroundColor,
        backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`
      }}
    />
  );
};

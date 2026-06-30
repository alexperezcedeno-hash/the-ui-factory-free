"use client";

import React from "react";

import { cn } from "@/lib/utils";

export const NoiseBg = ({
  className,
  noiseOpacity = 0.06,
  backgroundColor = "#111",
  baseFrequency = 0.85,
}: {
  className?: string;
  noiseOpacity?: number;
  backgroundColor?: string;
  baseFrequency?: number;
}) => {
  return (
    <div 
      className={cn("w-full h-full min-h-screen relative overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      <div 
        className="absolute inset-0 animate-noise pointer-events-none" 
        style={{ 
          opacity: noiseOpacity,
          backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22${baseFrequency}%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')` 
        }}
      />
    </div>
  );
};

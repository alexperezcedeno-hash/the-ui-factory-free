"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LoaderSquareProps {
  color?: string;
  size?: number;
  duration?: number;
  className?: string;
}

export const LoaderSquare = ({ 
  color = "#ccff00", 
  size = 64, 
  duration = 2, 
  className 
}: LoaderSquareProps) => {
  return (
    <div className={cn("flex items-center justify-center p-12", className)}>
      <div className="modern:opacity-100 relative" style={{ width: size, height: size }}>

        <div className="absolute top-2 left-2 bg-black" style={{ width: size, height: size }} />

        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{
            type: "keyframes",
            duration: duration,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
          }}
          className="relative z-10 border-4 border-black"
          style={{ 
            width: size, 
            height: size, 
            backgroundColor: color,
            backfaceVisibility: "hidden" 
          }}
        />
      </div>
    </div>
  );
};

"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export const OffsetDobleButton = ({
  children,
  className,
  offsetDistance = 16,
  rotateAngle = 6,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  offsetDistance?: number;
  rotateAngle?: number;
  onClick?: () => void;
}) => {
  return (
    <motion.div 
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      className={cn("relative w-full max-w-[200px] cursor-pointer", className)}
      onClick={onClick}
    >
      <motion.div 
        variants={{
          idle: { x: 0, y: 0, rotate: 0 },
          hover: { x: offsetDistance, y: offsetDistance, rotate: rotateAngle }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 bg-[#ff6b6b] border-4 border-black rounded-xl pointer-events-none" 
      />
      <motion.div 
        variants={{
          idle: { x: 0, y: 0, rotate: 0 },
          hover: { x: offsetDistance / 2, y: offsetDistance / 2, rotate: rotateAngle / 2 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 bg-[#0057ff] border-4 border-black rounded-xl pointer-events-none" 
      />
      <motion.div
        variants={{
          idle: { x: 0, y: 0 },
          tap: { x: offsetDistance / 4, y: offsetDistance / 4 }
        }}
        className="relative w-full px-8 py-4 font-black uppercase tracking-widest text-black bg-white border-4 border-black rounded-xl flex items-center justify-center pointer-events-none"
      >
        <span className="flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.div>
    </motion.div>
  );
};
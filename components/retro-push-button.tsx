"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export const RetroPushButton = ({
  children,
  className,
  depth = 10,
  color = "#ccff00",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  color?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      style={{ backgroundColor: color }}
      initial={{ boxShadow: `0px ${depth}px 0px #000`, y: 0 }}
      whileTap={{ boxShadow: `0px 0px 0px #000`, y: depth }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative px-8 py-4 font-black uppercase tracking-widest text-black border-4 border-black rounded-xl",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
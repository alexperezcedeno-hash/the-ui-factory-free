"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export const ToggleButton = ({
  defaultChecked = false,
  onChange,
  className,
  activeColor = "#ccff00",
  inactiveColor = "#f4f0ea",
  ...props
}: {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">) => {
  const [isOn, setIsOn] = useState(defaultChecked);
  const toggle = () => {
    setIsOn(!isOn);
    onChange?.(!isOn);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={toggle}
      className={cn(
        "relative flex items-center w-24 h-12 p-1.5 rounded-full border-4 border-black transition-colors duration-300",
        isOn ? "shadow-[4px_4px_0px_#000]" : "shadow-none",
        className
      )}
      style={{ backgroundColor: isOn ? activeColor : inactiveColor } as React.CSSProperties}
      {...props}
    >
      <motion.div
        animate={{ x: isOn ? 48 : 0 }} 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="modern:opacity-100 w-8 h-8 bg-black rounded-full shadow-inner flex items-center justify-center"
      >
        <motion.div 
          animate={{ scale: isOn ? 1 : 0 }}
          className="w-2 h-2 bg-white rounded-full"
        />
      </motion.div>
    </button>
  );
};
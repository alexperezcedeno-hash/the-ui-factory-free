"use client";
import React, { useState, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export interface InputBrutalistProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  focusColor?: string;
  bgColor?: string;
}
export const InputBrutalist = React.forwardRef<HTMLInputElement, InputBrutalistProps>(
  ({ className, icon, label, focusColor = "#ccff00", bgColor = "#f4f0ea", onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const generatedId = React.useId();
    const inputId = props.id || generatedId;
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={inputId} className="font-black uppercase tracking-widest text-[11px] text-black flex items-center gap-2">
            {icon && (
              <motion.div
                animate={{ 
                  rotate: isFocused ? -12 : 0,
                  scale: isFocused ? 1.2 : 1
                }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {icon}
              </motion.div>
            )}
            {label}
          </label>
        )}
        <motion.div
          animate={{
            y: isFocused ? -3 : 0,
            boxShadow: isFocused ? "6px 6px 0px #000" : "3px 3px 0px #000",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <input
            id={inputId}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              "--focus-color": focusColor,
              "--bg-color": bgColor,
            } as React.CSSProperties}
            className={cn(
              "w-full px-4 py-3.5 border-4 border-black rounded-xl font-bold text-black placeholder:text-black/25 outline-hidden transition-colors",
              isFocused ? "bg-(--focus-color)/10" : "bg-(--bg-color)",
              className
            )}
            {...props}
          />
        </motion.div>
      </div>
    );
  }
);
InputBrutalist.displayName = "InputBrutalist";
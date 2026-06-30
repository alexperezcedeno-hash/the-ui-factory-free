"use client";
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { PiMagnifyingGlass, PiXCircleFill } from "react-icons/pi";
import { cn } from "@/lib/utils";
const INTER_STYLE = { fontFamily: '"Inter", sans-serif' };
export interface SearchBarGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  onSearch?: (query: string) => void;
}
export const SearchBarGlass = ({ 
  placeholder = "Search the universe...",
  onSearch,
  className,
  ...props
}: SearchBarGlassProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 30, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 30, stiffness: 150 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  return (
    <div
      {...props}
      className={cn("relative w-full max-w-md perspective-[1000px]", className)}
      onMouseMove={(e) => {
        handleMouseMove(e);
        props.onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave();
        props.onMouseLeave?.(e);
      }}
    >
      <motion.div
        ref={containerRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isFocused ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative"
      >
        <div 
          className={cn(
            "relative flex items-center w-full rounded-full overflow-hidden transition-all duration-500",
            "bg-white/5 backdrop-blur-2xl border border-white/10",
            isFocused ? "shadow-[0_0_40px_rgba(255,255,255,0.3)] border-white/30" : "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)]"
          )}
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="pl-6 text-white/50">
            <PiMagnifyingGlass size={22} className={cn("transition-colors", isFocused && "text-white")} />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            style={INTER_STYLE}
            className="w-full bg-transparent border-none outline-hidden px-4 py-4 text-white placeholder:text-white/30 text-base font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onSearch) {
                onSearch(query);
              }
            }}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuery("")}
                className="pr-6 text-white/40 hover:text-white transition-colors outline-hidden"
              >
                <PiXCircleFill size={22} />
              </motion.button>
            )}
          </AnimatePresence>
          <motion.div 
            className="absolute bottom-0 left-0 h-px bg-linear-to-r from-transparent via-white to-transparent"
            initial={{ width: "0%", left: "50%" }}
            animate={{ 
              width: isFocused ? "100%" : "0%",
              left: isFocused ? "0%" : "50%"
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
      </motion.div>
    </div>
  );
};
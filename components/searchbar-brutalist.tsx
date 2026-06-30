"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
export interface SearchBarBrutalistProps {
  placeholder?: string;
  buttonText?: string;
  onSearch?: (query: string) => void;
  className?: string;
}
export const SearchBarBrutalist = ({ 
  placeholder = "SCAN NETWORK...",
  buttonText = "GO",
  onSearch,
  className 
}: SearchBarBrutalistProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <div className={cn("relative w-full max-w-2xl flex flex-col items-start gap-0 pr-4 pb-4", className)}>
      <motion.div 
        initial={false}
        animate={{ 
          y: isFocused ? -2 : 0,
          backgroundColor: isFocused ? "#ccff00" : "#000",
          color: isFocused ? "#000" : "#fff"
        }}
        className="modern:opacity-100 z-0 px-4 py-1 ml-4 border-4 border-b-0 border-black font-heading font-black tracking-widest text-xs uppercase rounded-t-lg transition-colors duration-200"
      >
        {isFocused ? "SYSTEM: ACTIVE" : "SYSTEM: IDLE"}
      </motion.div>
      <div className="relative z-10 w-full flex flex-col sm:flex-row gap-4 items-stretch">
        <motion.div
          layout
          animate={{
            boxShadow: isFocused ? "12px 12px 0px #ff00ff" : "6px 6px 0px #000",
            x: isFocused ? -6 : 0,
            y: isFocused ? -6 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="grow flex items-center bg-white border-4 border-black rounded-xl overflow-hidden h-14"
        >
          <div className="pl-4 text-black">
            <motion.div
              animate={{ rotate: isFocused ? 90 : 0, scale: isFocused ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <PiMagnifyingGlassBold size={24} />
            </motion.div>
          </div>
          <input
            type="text"
            placeholder={placeholder}
            className="w-full h-full bg-transparent border-none outline-hidden px-3 text-black placeholder:text-black/30 font-black font-heading text-lg md:text-xl uppercase tracking-wider"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.length > 0) {
                onSearch?.(query);
              }
            }}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuery("")}
                className="pr-4 outline-hidden cursor-pointer"
              >
                <div className="w-8 h-8 bg-black text-[#ccff00] border-2 border-black flex items-center justify-center rounded-lg hover:bg-[#ff00ff] hover:text-white transition-colors shadow-[2px_2px_0px_#000]">
                  <PiXBold size={16} className="stroke-[3px]" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.button
          layout
          onClick={() => {
            if (query.length > 0) {
              onSearch?.(query);
            }
          }}
          whileHover={{ 
            boxShadow: "3px 3px 0px #000",
            x: 3,
            y: 3,
          }}
          whileTap={{ 
            boxShadow: "0px 0px 0px #000",
            x: 6,
            y: 6,
            scale: 0.95
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            "w-full sm:w-24 h-14 shrink-0 flex items-center justify-center font-black font-heading text-xl uppercase tracking-widest border-4 border-black rounded-xl cursor-pointer outline-hidden transition-colors duration-300",
            query.length > 0 
              ? "bg-[#ccff00] text-black shadow-[6px_6px_0px_#000] hover:bg-black hover:text-[#ccff00]" 
              : "bg-zinc-200 text-zinc-400 shadow-[6px_6px_0px_#000] cursor-not-allowed"
          )}
        >
          {buttonText}
        </motion.button>
      </div>
    </div>
  );
};
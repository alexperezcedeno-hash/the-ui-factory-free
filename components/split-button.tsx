"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
export const SplitButton = ({
  options = ["Save", "Save as...", "Export PDF"],
  onSelect,
  className
}: {
  options?: string[];
  onSelect?: (option: string) => void;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className={cn("relative inline-flex shadow-[8px_8px_0px_#000] rounded-xl", className)}>
      {isOpen && <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />}
      <button 
        onClick={() => onSelect?.(selected)}
        className="relative z-40 px-8 py-4 font-black uppercase tracking-widest bg-white text-black border-4 border-black border-r-0 rounded-l-xl hover:bg-[#f4f0ea] active:bg-[#e0ddd7] transition-colors"
      >
        {selected}
      </button>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-40 px-4 py-4 bg-[#ccff00] border-4 border-black rounded-r-xl hover:bg-[#b3ff00] active:bg-[#99db00] transition-colors flex items-center justify-center"
      >
        <ChevronDown strokeWidth={4} className={cn("transition-transform duration-300 text-black", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-3 w-56 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_#000] z-50 flex flex-col overflow-hidden origin-top-right"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className="px-5 py-4 text-left font-bold uppercase tracking-wide text-black border-b-4 border-black last:border-b-0 hover:bg-[#f4f0ea] hover:pl-6 transition-all duration-200"
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
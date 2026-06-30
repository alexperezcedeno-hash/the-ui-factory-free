"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  PiMagnifyingGlassBold, 
  PiCommandBold, 
  PiArrowRightBold 
} from "react-icons/pi";
import { useRouter } from "next/navigation";
export type CommandPaletteItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  href: string;
  dimension?: "ink" | "modern" | "both";
};
export type CommandPaletteGroup = {
  group: string;
  items: CommandPaletteItem[];
};
export interface CommandPaletteBrutalistProps {
  commands?: CommandPaletteGroup[];
}
export const CommandPaletteBrutalist = ({ commands = [] }: CommandPaletteBrutalistProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const filteredItems = commands.flatMap(group => 
    group.items.filter(item => 
      item.dimension !== "modern" && item.label.toLowerCase().includes(query.toLowerCase())
    ).map(item => ({ ...item, group: group.group }))
  );
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleOpenEvent);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((open) => !open);
      }
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      }
      if (e.key === "Enter" && filteredItems.length > 0) {
        e.preventDefault();
        router.push(filteredItems[activeIndex].href);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, [isOpen, filteredItems, activeIndex, router]);
  useEffect(() => {
    if (isOpen) {
      const activeEl = document.getElementById(`brutalist-item-${activeIndex}`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex, isOpen]);
  const groupedResults = filteredItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof filteredItems>);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#f4f0ea] border-4 border-black rounded-xl shadow-[12px_12px_0px_#ccff00] overflow-hidden flex flex-col max-h-[60vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center border-b-4 border-black px-4 py-4 bg-white">
              <PiMagnifyingGlassBold size={28} className="text-black shrink-0" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none outline-hidden px-4 text-black placeholder:text-black/30 font-black font-heading text-xl md:text-2xl uppercase tracking-wider"
              />
              <div className="shrink-0 flex items-center justify-center gap-1 border-2 border-black rounded-md px-2 py-1 bg-black">
                <PiCommandBold size={14} className="text-[#ccff00]" />
                <span className="text-[#ccff00] font-black text-xs font-heading">K</span>
              </div>
            </div>
            <div className="overflow-y-auto p-4 space-y-6 grow bg-[#f4f0ea]">
              {Object.keys(groupedResults).length === 0 ? (
                <div className="text-center py-10">
                  <span className="text-black/30 font-black uppercase tracking-widest text-lg font-heading">No results found.</span>
                </div>
              ) : (
                Object.entries(groupedResults).map(([groupName, items]) => (
                  <div key={groupName} className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black/40 px-2">
                      {groupName}
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const currentIndex = filteredItems.findIndex(f => f.id === item.id);
                        const isSelected = currentIndex === activeIndex;
                        return (
                          <motion.div
                            key={item.id}
                            id={`brutalist-item-${currentIndex}`}
                            onMouseEnter={() => setActiveIndex(currentIndex)}
                            onClick={() => {
                              router.push(item.href);
                              setIsOpen(false);
                            }}
                            animate={{
                              x: isSelected ? 8 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={cn(
                              "flex items-center justify-between p-4 cursor-pointer rounded-xl border-4 transition-colors",
                              isSelected ? "border-black shadow-[4px_4px_0px_#000] bg-[#ccff00]" : "border-transparent bg-white"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-lg border-2",
                                isSelected ? "border-black bg-black text-[#ccff00]" : "border-black/10 text-black"
                              )}>
                                {item.icon}
                              </div>
                              <span className={cn(
                                "font-heading uppercase tracking-widest text-lg",
                                isSelected ? "font-black text-black" : "font-bold text-black/70"
                              )}>
                                {item.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {item.shortcut && (
                                <div className="flex items-center justify-center w-6 h-6 border-2 border-black/20 rounded-md text-xs font-black text-black/40">
                                  {item.shortcut}
                                </div>
                              )}
                              <AnimatePresence>
                                {isSelected && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                  >
                                    <PiArrowRightBold size={20} className="text-black" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t-4 border-black p-3 bg-white flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-black/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="border-2 border-black/20 rounded-xs px-1">↑</kbd><kbd className="border-2 border-black/20 rounded-xs px-1">↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="border-2 border-black/20 rounded-xs px-1">↵</kbd> to select</span>
              </div>
              <span className="flex items-center gap-1"><kbd className="border-2 border-black/20 rounded-xs px-1">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
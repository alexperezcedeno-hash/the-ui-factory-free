"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  PiSquaresFourBold,
  PiTerminalWindowBold,
  PiDatabaseBold,
  PiGraphBold,
  PiFadersBold,
} from "react-icons/pi";
import { cn } from "@/lib/utils";

export interface DockItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const InkAcidBox = ({ children }: { children: React.ReactNode }) => (
  <div className="modern:opacity-100 w-full h-full rounded-[14px] bg-zinc-900 border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_#000] text-[#ccff00] hover:bg-[#ccff00] hover:text-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all duration-200">
    {children}
  </div>
);

const defaultItems: DockItemData[] = [
  { id: "dashboard", label: "Dashboard", icon: <InkAcidBox><PiSquaresFourBold className="w-1/2 h-1/2" /></InkAcidBox> },
  { id: "terminal", label: "Terminal", icon: <InkAcidBox><PiTerminalWindowBold className="w-1/2 h-1/2" /></InkAcidBox> },
  { id: "database", label: "Database", icon: <InkAcidBox><PiDatabaseBold className="w-1/2 h-1/2" /></InkAcidBox> },
  { id: "network", label: "Network", icon: <InkAcidBox><PiGraphBold className="w-1/2 h-1/2" /></InkAcidBox> },
  { id: "settings", label: "Settings", icon: <InkAcidBox><PiFadersBold className="w-1/2 h-1/2" /></InkAcidBox> },
];

export interface MacDockBrutalistProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: DockItemData[];
  className?: string;
}

export const MacDockBrutalist = ({
  items = defaultItems,
  className,
  ...props
}: MacDockBrutalistProps) => {
  const mouseX = useMotionValue(Infinity);
  const [activeItem, setActiveItem] = useState<string>(items[0]?.id);

  return (
    <div
      {...props}
      className={cn("flex flex-col items-center justify-center", className)}
      style={{ fontFamily: '"Inter", sans-serif', ...props.style }}
    >
      <motion.nav
        role="navigation"
        aria-label="Dock Navigation"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-[76px] items-end gap-2 rounded-3xl bg-white/10 border-t border-white/20 px-4 pb-3 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
      >
        {items.map((item) => (
          <DockItem
            key={item.id}
            item={item}
            mouseX={mouseX}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </motion.nav>
    </div>
  );
};

function DockItem({
  item,
  mouseX,
  isActive,
  onClick,
}: {
  item: DockItemData;
  mouseX: import("framer-motion").MotionValue<number>;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - 25;
  });

  const widthSync = useTransform(distance, [-200, 0, 200], [50, 80, 50]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative flex flex-col items-center justify-end">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-16 rounded-md bg-zinc-900 border border-white/10 backdrop-blur-md px-3 py-1.5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.5)] whitespace-nowrap z-50 pointer-events-none"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
        style={{ width, height: width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.85 }}
        className="relative flex shrink-0 items-center justify-center outline-hidden focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <motion.div
          className={cn(
            "w-full h-full flex items-center justify-center transition-[filter] duration-300",
            isActive 
              ? "drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]" 
              : isHovered 
                ? "drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)]"
                : "drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
          )}
        >
          {item.icon}
        </motion.div>
      </motion.button>

      <motion.div
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute -bottom-2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />
    </div>
  );
}

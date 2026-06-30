"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, Check } from "lucide-react";

export interface SwipeButtonProps {
  onConfirm?: () => void;
  text?: string;
  confirmedText?: string;
  progressColor?: string;
  className?: string;
}

export const SwipeButton = ({
  onConfirm,
  text = "Slide to Pay",
  confirmedText = "Confirmado",
  progressColor = "#ccff00",
  className
}: SwipeButtonProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragDistance, setDragDistance] = useState(0);

  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    if (containerRef.current) {
      setDragDistance(containerRef.current.clientWidth - 56);
    }
  }, []);

  const textOpacity = useTransform(x, [0, dragDistance * 0.8 || 150], [1, 0]);
  const progressWidth = useTransform(x, [0, dragDistance || 1], [52, (dragDistance || 1) + 56]);

  const handleDragEnd = (event: unknown, info: PanInfo) => {
    if (info.offset.x > dragDistance * 0.7) {
      setIsConfirmed(true);
      controls.start({ x: dragDistance });
      onConfirm?.();
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center h-16 bg-white border-4 border-black rounded-xl p-1 overflow-hidden shadow-[8px_8px_0px_#000] w-full max-w-[320px]",
        className
      )}
    >

      <motion.div
        className="modern:opacity-100 absolute left-0 top-0 bottom-0 origin-left rounded-lg"
        style={{ width: progressWidth, backgroundColor: progressColor }}
      />

      <motion.span
        className="absolute w-full text-center font-black uppercase tracking-widest pointer-events-none z-0 text-black/40"
        style={{ opacity: isConfirmed ? 0 : textOpacity }}
      >
        {text}
      </motion.span>

      {isConfirmed && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute w-full text-center font-black uppercase tracking-widest pointer-events-none z-10 text-black"
        >
          {confirmedText}
        </motion.span>
      )}

      <motion.div
        drag={isConfirmed ? false : "x"}
        dragConstraints={{ left: 0, right: dragDistance }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        className="relative z-20 flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg cursor-grab active:cursor-grabbing border-2 border-black"
      >
        {isConfirmed ? <Check strokeWidth={3} size={20} /> : <ChevronRight strokeWidth={3} size={20} />}
      </motion.div>
    </div>
  );
};

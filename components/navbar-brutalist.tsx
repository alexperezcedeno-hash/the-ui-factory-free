"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavbarBrutalistProps {
  instanceId?: string;
  links?: string[];
  essentialLinks?: string[];
  logoInitials?: string;
  logoText?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

export const NavbarBrutalist = ({ 
  instanceId = "default",
  links = ["Home", "Products", "Lab", "Pricing"],
  essentialLinks = ["Home", "Pricing"],
  logoInitials = "F",
  logoText = "Factory",
  ctaText = "LOGIN",
  onCtaClick,
  className,
  scrollContainerRef
}: NavbarBrutalistProps) => {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll(scrollContainerRef ? { container: scrollContainerRef } : undefined);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <div className={cn("sticky top-6 z-50 flex justify-center w-full px-4 pointer-events-none @container", className)}>
      <nav
        aria-label="Main Navigation"
        className={cn(
          "pointer-events-auto flex items-center bg-[#ccff00] border-4 border-black rounded-full shadow-[8px_8px_0px_#000] overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled ? "p-[0.4rem] gap-1" : "py-2 px-4 gap-6"
        )}
      >
        <div className={cn(
          "hidden @xl:flex items-center whitespace-nowrap shrink-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
          isScrolled ? "max-w-0 opacity-0 border-r-0 pr-0 mr-0" : "max-w-[300px] opacity-100 border-r-4 border-black pr-6 mr-0"
        )}>
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shrink-0">
            <span className="text-[#ccff00] font-black font-heading text-xl mt-1">{logoInitials}</span>
          </div>
          <span className="ml-2 font-black uppercase tracking-widest text-black text-lg shrink-0">{logoText}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
            {links.map((link) => {
              const isActive = active === link;
              const isEssential = essentialLinks.includes(link);
              const isHidden = isScrolled && !isEssential;

              return (
                <button
                  key={link}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActive(link)}
                  style={{ WebkitFontSmoothing: "antialiased" }}
                  className={cn(
                    "relative rounded-xl font-bold text-sm outline-hidden whitespace-nowrap flex items-center justify-center z-10 shrink-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                    isActive ? "text-[#ccff00]" : "text-black/60 hover:text-black",
                    !isEssential && "hidden @xl:flex",
                    isHidden ? "max-w-0 opacity-0 px-0 mx-0" : "max-w-[150px] opacity-100 px-3 @xl:px-4 py-2.5 mx-0"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId={`brutalist-nav-active-solid-${instanceId}`}
                      className="absolute inset-0 bg-black rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 280, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 shrink-0">{link}</span>
                </button>
              );
            })}
        </div>

        <div className="pl-2 shrink-0">
            <button
              onClick={onCtaClick}
              className={cn(
                "bg-black text-[#ccff00] font-black text-sm tracking-widest uppercase rounded-full whitespace-nowrap flex items-center justify-center shrink-0 border-2 border-black overflow-hidden relative transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95",
                isScrolled ? "py-[10px] px-[16px]" : "py-[10px] px-[24px]"
              )}
            >
               <div className="relative flex items-center justify-center h-5">
                  <span className={cn(
                    "font-black text-lg flex items-center justify-center transition-all duration-600 absolute inset-0",
                    isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
                  )}>
                    ➔
                  </span>
                  <span className={cn(
                    "font-black uppercase tracking-widest flex items-center justify-center transition-all duration-600",
                    isScrolled ? "opacity-0 scale-50 max-w-0" : "opacity-100 scale-100 max-w-[100px]"
                  )}>
                    {ctaText}
                  </span>
               </div>
            </button>
        </div>
      </nav>
    </div>
  );
};
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
export interface AuroraProduct {
  id: string | number;
  name: string;
  category: string;
  price: string;
  desc: string;
  image: string;
}
const defaultProducts: AuroraProduct[] = [
  { id: 1, name: "Aurora Pro Max", category: "VR Headset", price: "2,499€", desc: "Next-level haptic immersion with spatial audio.", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Nova Watch Series X", category: "Smartwatch", price: "899€", desc: "Quantum monitoring and solid-state battery.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Zenith Studio Display", category: "Monitors", price: "1,299€", desc: "8K Micro-OLED panel for creative professionals.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Echo Soundbar", category: "Home Audio", price: "599€", desc: "11.1.4 surround sound with adaptive acoustics.", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Nexus Controller", category: "Gaming", price: "149€", desc: "Millimeter tactile feedback and zero latency.", image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=800&auto=format&fit=crop" },
];
export interface Aurora3DCarouselProps {
  products?: AuroraProduct[];
  dragText?: string;
  buyButtonText?: string;
  className?: string;
}
export function Aurora3DCarousel({
  products = defaultProducts,
  dragText = "Drag to explore",
  buyButtonText = "Buy",
  className
}: Aurora3DCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(2);
  const nextAurora = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevAurora = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  return (
    <div className={cn("w-full py-12 relative flex flex-col items-center justify-center border-white/10 overflow-hidden", className)} role="region" aria-roledescription="carousel" aria-label="Product 3D Carousel">
      <div className="relative w-full max-w-6xl h-[400px] flex items-center justify-center perspective-distant">
        <motion.div 
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-20"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x + velocity.x * 0.2;
            if (swipe < -50) nextAurora();
            else if (swipe > 50) prevAurora();
          }}
        >
          {products.map((product, i) => {
            const offset = i - currentIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const x = (offset * 260) - 160;
            const z = absOffset * -200; 
            const rotateY = offset * -15; 
            const scale = isCenter ? 1 : 0.85;
            const opacity = isCenter ? 1 : Math.max(0, 1 - absOffset * 0.5);
            const blur = isCenter ? 0 : absOffset * 4;
            const zIndex = 100 - absOffset;
            return (
              <motion.div
                key={product.id}
                role="group"
                aria-roledescription="slide"
                aria-hidden={!isCenter}
                className="absolute top-0 left-1/2 w-[320px] h-[400px] pointer-events-none"
                animate={{ x, z, rotateY, scale, opacity, filter: `blur(${blur}px)`, zIndex }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={cn(
                    "w-full h-full rounded-4xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 group pointer-events-auto",
                    isCenter ? "shadow-[0_20px_60px_rgba(255,255,255,0.05)] border border-white/20" : "border border-white/5",
                  )}
                >
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
                  <div className={cn("relative z-10 transition-opacity duration-300", isCenter ? "opacity-100" : "opacity-40")}>
                    <span className="text-white/80 text-xs font-bold tracking-wider uppercase mb-3 block" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {product.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex-1" />
                  <div className={cn("relative z-10 transition-opacity duration-300", isCenter ? "opacity-100" : "opacity-0")}>
                    <p className="text-white/60 text-sm font-medium mb-6 leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {product.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white" style={{ fontFamily: '"Inter", sans-serif' }}>{product.price}</span>
                      <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform cursor-pointer" style={{ fontFamily: '"Inter", sans-serif' }}>
                        {buyButtonText}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="mt-8 text-white/40 text-xs font-bold tracking-widest uppercase flex items-center gap-4 animate-pulse">
        <PiCaretLeftBold />
        {dragText}
        <PiCaretRightBold />
      </div>
    </div>
  );
}
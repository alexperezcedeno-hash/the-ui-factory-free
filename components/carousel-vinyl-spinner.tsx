'use client';
import Image from "next/image";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type PanInfo,
} from 'framer-motion';
import { cn } from "@/lib/utils";

interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { id: 1, title: 'Aurora Dashboard', subtitle: 'Analytics reimagined', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'Neon Commerce', subtitle: 'Shop the future', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'Stellar CMS', subtitle: 'Content at lightspeed', image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Prism Studio', subtitle: 'Design without limits', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop' },
  { id: 5, title: 'Void Engine', subtitle: 'Performance unleashed', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop' },
  { id: 6, title: 'Nebula Auth', subtitle: 'Security first', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop' },
  { id: 7, title: 'Flux Forms', subtitle: 'Data flows naturally', image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=600&auto=format&fit=crop' },
];

const INTER = { fontFamily: '"Inter", sans-serif' };
const CARD_W = 220;
const CARD_H = 300;
const RADIUS = 360;

const VinylCard = ({
  item,
  index,
  total,
  rotationValue,
}: {
  item: CarouselItem;
  index: number;
  total: number;
  rotationValue: ReturnType<typeof useSpring>;
}) => {
  const angleStep = 360 / total;
  const baseAngle = index * angleStep;

  const x = useTransform(rotationValue, (rot) => {
    const rad = ((rot + baseAngle) * Math.PI) / 180;
    return Math.sin(rad) * RADIUS;
  });

  const z = useTransform(rotationValue, (rot) => {
    const rad = ((rot + baseAngle) * Math.PI) / 180;
    return Math.cos(rad) * RADIUS;
  });

  const depth = useTransform(z, (zVal) => 1 - (zVal + RADIUS) / (2 * RADIUS));

  const cardScale = useTransform(depth, [0, 0.5, 1], [1.05, 0.85, 0.6]);
  const cardOpacity = useTransform(depth, [0, 0.4, 0.7, 1], [1, 0.7, 0.35, 0.1]);
  const zIndex = useTransform(z, (zVal) => Math.round(((zVal + RADIUS) / (2 * RADIUS)) * 20));

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: CARD_W,
        height: CARD_H,
        x,
        y: 0,
        scale: cardScale,
        opacity: cardOpacity,
        zIndex,
        left: '50%',
        top: '50%',
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
      }}
      whileHover={{ y: -12, scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
    >
      <div
        className="w-full h-full rounded-3xl overflow-hidden relative"
        style={{
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 50px -10px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3)',
        }}
      >
        <Image 
          src={item.image} 
          alt={item.title} 
          fill
          sizes="220px"
          className="object-cover pointer-events-none"
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        <div className="relative z-10 h-full flex flex-col justify-end p-6" style={INTER}>
          <div>
            <h4 className="text-lg font-bold text-white leading-tight">
              {item.title}
            </h4>
            <p className="text-sm text-white/80 mt-1">{item.subtitle}</p>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: '128px 128px',
          }}
        />
      </div>
    </motion.div>
  );
};

export interface CarouselVinylSpinnerProps {
  items?: CarouselItem[];
  featuredText?: string;
  className?: string;
}

export const CarouselVinylSpinner = ({
  items = DEFAULT_ITEMS,
  featuredText = "Featured Project",
  className,
}: CarouselVinylSpinnerProps) => {
  const count = items.length;
  const angleStep = 360 / count;

  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 50, damping: 18, mass: 1.5 });

  const [activeIndex, setActiveIndex] = useState(0);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const unsub = smoothRotation.on('change', (v) => {
      const norm = (((-v % 360) + 360) % 360);
      setActiveIndex(Math.round(norm / angleStep) % count);
    });
    return unsub;
  }, [smoothRotation, angleStep, count]);

  const handlePan = useCallback(
    (_: unknown, info: PanInfo) => {
      if (animRef.current) animRef.current.stop();
      rotation.set(rotation.get() + info.delta.x * 0.4);
    },
    [rotation]
  );

  const handlePanEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const velocity = info.velocity.x * 0.1;
      const target = rotation.get() + velocity;
      const snapped = Math.round(target / angleStep) * angleStep;
      animRef.current = animate(rotation, snapped, {
        type: 'spring',
        stiffness: 40,
        damping: 16,
      });
    },
    [rotation, angleStep]
  );

  const goTo = useCallback(
    (dir: 'prev' | 'next') => {
      if (animRef.current) animRef.current.stop();
      const delta = dir === 'next' ? -angleStep : angleStep;
      animRef.current = animate(rotation, rotation.get() + delta, {
        type: 'spring',
        stiffness: 60,
        damping: 18,
      });
    },
    [rotation, angleStep]
  );

  return (
    <div
      className={cn("relative w-full select-none overflow-hidden", className)}
      style={{ ...INTER, height: '540px' }}
    >

      <motion.div
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, i) => (
          <VinylCard
            key={item.id}
            item={item}
            index={i}
            total={count}
            rotationValue={smoothRotation}
          />
        ))}
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-10 bg-gradient-to-t from-black via-black/80 to-transparent modern:from-[#f7f5f0] modern:via-[#f7f5f0]/80"
      />
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[400px] h-12 rounded-full pointer-events-none opacity-40 modern:opacity-20 z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.4)_0%,transparent_70%)] modern:bg-[radial-gradient(ellipse_at_center,rgba(226,106,78,0.5)_0%,transparent_70%)]"
        style={{ filter: 'blur(20px)' }}
      />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 modern:text-black/30" style={INTER}>
          {featuredText}
        </p>
        <motion.h3
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-white/90 modern:text-black/80 mt-1 tracking-tight"
          style={INTER}
        >
          {items[activeIndex]?.title}
        </motion.h3>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={() => goTo('prev')}
          className="w-11 h-11 rounded-full bg-zinc-900 modern:bg-white border border-white/10 modern:border-black/8 shadow-[0_4px_20px_rgba(255,255,255,0.05)] modern:shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-center hover:scale-110 hover:shadow-[0_6px_24px_rgba(0,229,255,0.2)] modern:hover:shadow-[0_6px_24px_rgba(226,106,78,0.15)] active:scale-95 transition-all text-white modern:text-[#333]"
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <div
              key={i}
              className={cn("rounded-full transition-all duration-400", i === activeIndex ? "bg-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.4)] modern:bg-[#E26A4E] modern:shadow-[0_0_10px_rgba(226,106,78,0.4)]" : "bg-white/20 modern:bg-black/10")}
              style={{
                width: i === activeIndex ? 20 : 7,
                height: 7,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo('next')}
          className="w-11 h-11 rounded-full bg-zinc-900 modern:bg-white border border-white/10 modern:border-black/8 shadow-[0_4px_20px_rgba(255,255,255,0.05)] modern:shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-center hover:scale-110 hover:shadow-[0_6px_24px_rgba(0,229,255,0.2)] modern:hover:shadow-[0_6px_24px_rgba(226,106,78,0.15)] active:scale-95 transition-all text-white modern:text-[#333]"
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

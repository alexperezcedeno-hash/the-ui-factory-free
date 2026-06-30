"use client";

import React, { useEffect, useRef } from "react";

export const ModernBackground = ({ 
  isGlobal = true,
  particleDensity = 15000,
  particleColorRGBA = "rgba(0, 0, 0, 0.35)",
  lineColorRGB = "0, 0, 0",
}: { 
  isGlobal?: boolean;
  particleDensity?: number;
  particleColorRGBA?: string;
  lineColorRGB?: string;
} = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let numParticles = Math.floor((w * h) / particleDensity);
    numParticles = Math.min(Math.max(numParticles, 50), 200);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1,
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = particleColorRGBA;
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);

          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            const opacity = 0.2 * (1 - dist / 180);
            ctx.strokeStyle = `rgba(${lineColorRGB}, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      numParticles = Math.min(Math.max(Math.floor((w * h) / particleDensity), 50), 200);
      if (numParticles > particles.length) {
        for (let i = particles.length; i < numParticles; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2.5 + 1
          });
        }
      } else if (numParticles < particles.length) {
        particles.splice(numParticles);
      }
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [lineColorRGB, particleColorRGBA, particleDensity]);

  return (
    <div className={`${isGlobal ? "fixed inset-0 z-[-1]" : "absolute inset-0 z-0"} overflow-hidden pointer-events-none bg-[#F7F5F0]`}>

      <canvas ref={canvasRef} className="w-full h-full opacity-100" />

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
    </div>
  );
};

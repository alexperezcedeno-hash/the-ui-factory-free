"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CinematicStarfieldProps {
  className?: string;
}

export function CinematicStarfield({ className }: CinematicStarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const starCount = Math.floor((width * height) / 2500);
    const stars: {x: number, y: number, r: number, a: number, speed: number, maxA: number}[] = [];
    const shootingStars: {x: number, y: number, length: number, speed: number, angle: number, active: boolean, opacity: number}[] = [];

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    window.addEventListener("mousemove", (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    });

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5,
        maxA: 0.1 + Math.random() * 0.8,
        a: Math.random(),
        speed: 0.05 + Math.random() * 0.2
      });
    }

    for (let i = 0; i < 3; i++) {
      shootingStars.push({ x: 0, y: 0, length: 0, speed: 0, angle: 0, active: false, opacity: 0 });
    }

    type ShootingStar = {x: number, y: number, length: number, speed: number, angle: number, active: boolean, opacity: number};
    const spawnShootingStar = (star: ShootingStar) => {
      star.active = true;
      star.x = Math.random() * width;
      star.y = Math.random() * (height / 2);
      star.length = 80 + Math.random() * 150;
      star.speed = 10 + Math.random() * 20;
      star.angle = (Math.PI / 4) + (Math.random() * 0.2);
      star.opacity = 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX - width / 2) * 0.05;
      const parallaxY = (mouseY - height / 2) * 0.05;

      stars.forEach((star) => {

        star.y -= star.speed;

        star.a += (Math.random() - 0.5) * 0.05;
        if (star.a < 0.1) star.a = 0.1;
        if (star.a > star.maxA) star.a = star.maxA;

        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        const drawX = star.x - parallaxX * star.speed;
        const drawY = star.y - parallaxY * star.speed;

        const finalX = (drawX % width + width) % width;
        const finalY = (drawY % height + height) % height;

        ctx.beginPath();
        ctx.arc(finalX, finalY, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.a})`;
        ctx.fill();
      });

      if (Math.random() < 0.005) {
        const inactiveStar = shootingStars.find(s => !s.active);
        if (inactiveStar) spawnShootingStar(inactiveStar);
      }

      shootingStars.forEach((s) => {
        if (!s.active) return;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.02;

        if (s.opacity <= 0 || s.x > width || s.y > height) {
          s.active = false;
          return;
        }

        const grad = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const mouseMoveHandler = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 bg-black overflow-hidden pointer-events-none modern:bg-zinc-950", className)}>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,30,60,0.5)_0%,transparent_50%),radial-gradient(ellipse_at_top_right,rgba(40,10,50,0.4)_0%,transparent_50%)]"></div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block mix-blend-screen" />
    </div>
  );
}

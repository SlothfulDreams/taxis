"use client";

import {
  type MotionStyle,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "violet" | "gold" | "rose" | "emerald";
  enableTilt?: boolean;
  tiltAmount?: number;
}

const glowColors = {
  violet: "oklch(0.55 0.18 265 / 0.12)",
  gold: "oklch(0.72 0.12 75 / 0.12)",
  rose: "oklch(0.65 0.16 350 / 0.12)",
  emerald: "oklch(0.65 0.14 165 / 0.12)",
};

export function GlowCard({
  children,
  className,
  glowColor = "violet",
  enableTilt = true,
  tiltAmount = 4,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 35 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const glowStyle: MotionStyle = {
    background: useTransform(
      [springX, springY],
      ([x, y]) =>
        `radial-gradient(circle at ${50 + (x as number) * 80}% ${50 + (y as number) * 80}%, ${glowColors[glowColor]}, transparent 60%)`,
    ),
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        enableTilt
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }
          : undefined
      }
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-[oklch(0.1_0.015_265)]",
        "border border-white/[0.06]",
        "shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
        "transition-shadow duration-300",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "hover:border-white/[0.08]",
        className,
      )}
    >
      {/* Glow effect layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={glowStyle}
      />

      {/* Subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Simple version without tilt for performance
export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-[oklch(0.1_0.015_265)]",
        "border border-white/[0.06]",
        "shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      {children}
    </motion.div>
  );
}

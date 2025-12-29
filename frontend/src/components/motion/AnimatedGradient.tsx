"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  children?: ReactNode;
  className?: string;
  variant?: "mesh" | "radial" | "conic";
  speed?: number;
}

export function AnimatedGradient({
  children,
  className,
  variant = "mesh",
  speed = 1,
}: AnimatedGradientProps) {
  const time = useMotionValue(0);
  const smoothTime = useSpring(time, { damping: 100, stiffness: 10 });

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      time.set(time.get() + 0.01 * speed);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [time, speed]);

  const backgroundPosition = useTransform(
    smoothTime,
    (t) => `${Math.sin(t) * 50 + 50}% ${Math.cos(t) * 50 + 50}%`,
  );

  const meshGradient = `
    radial-gradient(at 40% 20%, oklch(0.12 0.03 265) 0px, transparent 50%),
    radial-gradient(at 80% 0%, oklch(0.1 0.025 285) 0px, transparent 50%),
    radial-gradient(at 0% 50%, oklch(0.11 0.02 75) 0px, transparent 50%),
    radial-gradient(at 80% 50%, oklch(0.09 0.025 265) 0px, transparent 50%),
    radial-gradient(at 0% 100%, oklch(0.1 0.03 265) 0px, transparent 50%),
    radial-gradient(at 80% 100%, oklch(0.08 0.02 285) 0px, transparent 50%),
    oklch(0.06 0.015 265)
  `;

  const radialGradient = `
    radial-gradient(ellipse at center, oklch(0.1 0.025 265) 0%, oklch(0.06 0.015 265) 70%)
  `;

  const conicGradient = `
    conic-gradient(from 0deg at 50% 50%,
      oklch(0.08 0.02 265),
      oklch(0.1 0.03 275),
      oklch(0.08 0.025 285),
      oklch(0.07 0.02 75),
      oklch(0.08 0.02 265)
    )
  `;

  const gradients = {
    mesh: meshGradient,
    radial: radialGradient,
    conic: conicGradient,
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: gradients[variant],
        backgroundSize: variant === "mesh" ? "200% 200%" : "100% 100%",
        backgroundPosition: variant === "mesh" ? backgroundPosition : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating orbs - subtle and refined
export function FloatingOrbs({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Primary orb - subtle violet */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.4 0.12 265 / 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "5%", left: "55%" }}
      />

      {/* Secondary orb - warm accent */}
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.5 0.1 75 / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "45%", left: "5%" }}
      />

      {/* Tertiary orb - subtle pink */}
      <motion.div
        className="absolute h-[350px] w-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.1 300 / 0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ bottom: "15%", right: "15%" }}
      />
    </div>
  );
}

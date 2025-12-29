"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  FloatingOrbs,
  GlowCard,
} from "@/components/motion";

const features = [
  {
    icon: (
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    title: "Smart Masking",
    description:
      "Paint over areas you want to change. Precise control over every edit.",
  },
  {
    icon: (
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    ),
    title: "Natural Language",
    description:
      'Describe changes in plain English. "Make the sofa blue" just works.',
  },
  {
    icon: (
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Dual AI Models",
    description:
      "GPT Image for precision. Gemini for speed. Best of both worlds.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.06_0.015_265)]">
      {/* Subtle gradient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.15_0.04_265),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_60%,oklch(0.1_0.02_280_/_0.4),transparent)]" />
      </div>

      {/* Floating orbs - subtle */}
      <FloatingOrbs />

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[oklch(0.08_0.015_265_/_0.8)] px-5 py-3 backdrop-blur-2xl"
          >
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.55_0.18_265)] to-[oklch(0.5_0.16_285)] shadow-[0_0_12px_oklch(0.55_0.18_265_/_0.3)]">
                <svg
                  className="size-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="font-display text-base font-semibold tracking-tight text-white">
                Interior AI
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="premium" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-32">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <FadeIn delay={0.05}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[oklch(0.65_0.16_155)] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[oklch(0.65_0.16_155)]" />
                </span>
                <span className="text-xs font-medium text-white/60">
                  AI-Powered Design Tools
                </span>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.1}>
              <h1 className="font-display text-4xl font-bold tracking-tighter text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Transform any space
                <br />
                <span className="gradient-text">with AI precision</span>
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.15}>
              <p className="mx-auto mt-6 max-w-xl text-base text-white/50 sm:text-lg">
                Upload a photo, describe your vision, and watch AI reimagine
                your interior in seconds. Professional results without the
                professional cost.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.2}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/sign-up">
                  <Button
                    variant="premium"
                    size="xl"
                    className="group min-w-[200px]"
                  >
                    Start for free
                    <motion.svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </Button>
                </Link>
                <Button variant="glass" size="xl" className="min-w-[160px]">
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                  Watch demo
                </Button>
              </div>
            </FadeIn>

            {/* Social proof */}
            <FadeIn delay={0.25}>
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/30">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="size-7 rounded-full border-2 border-[oklch(0.06_0.015_265)] bg-gradient-to-br from-white/20 to-white/5"
                      />
                    ))}
                  </div>
                  <span>2,000+ users</span>
                </div>
                <div className="hidden h-4 w-px bg-white/10 sm:block" />
                <div className="hidden items-center gap-1.5 sm:flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="size-4 text-[oklch(0.75_0.12_75)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1">4.9/5 rating</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Preview Card */}
          <FadeIn delay={0.3} className="mt-20 lg:mt-24">
            <motion.div
              className="relative mx-auto max-w-4xl"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -inset-4 rounded-3xl bg-[oklch(0.55_0.18_265_/_0.08)] blur-3xl" />

              {/* Main card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[oklch(0.08_0.015_265)] p-1.5 shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[oklch(0.07_0.015_265)]">
                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <svg
                          className="size-7 text-white/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                          />
                        </svg>
                      </motion.div>
                      <p className="text-sm text-white/30">Preview</p>
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>

        {/* Features Section */}
        <div className="relative border-t border-white/[0.04]">
          <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
            <FadeIn>
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Built for speed and precision
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-base text-white/40">
                  Professional-grade tools that make interior design accessible
                  to everyone
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="mt-16 grid gap-4 sm:grid-cols-3">
              {features.map((feature, index) => (
                <StaggerItem key={feature.title}>
                  <GlowCard
                    className="group h-full p-6"
                    glowColor={
                      index === 0 ? "violet" : index === 1 ? "gold" : "emerald"
                    }
                  >
                    <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-colors duration-300 group-hover:text-white">
                      {feature.icon}
                    </div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/40">
                      {feature.description}
                    </p>
                  </GlowCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative border-t border-white/[0.04]">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.55_0.18_265_/_0.06)] blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32 text-center">
            <FadeIn>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ready to transform your space?
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <p className="mx-auto mt-4 max-w-md text-base text-white/40">
                Join thousands of designers and homeowners using AI to visualize
                their dream interiors.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link href="/sign-up" className="mt-8 inline-block">
                <Button variant="premium" size="xl">
                  Get started free
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.04] py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-[oklch(0.55_0.18_265)] to-[oklch(0.5_0.16_285)]">
                <svg
                  className="size-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-sm text-white/40">Interior AI</span>
            </div>
            <p className="text-xs text-white/25">
              Powered by OpenAI GPT Image & Google Gemini
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

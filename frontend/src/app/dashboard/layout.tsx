"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthActions } from "@convex-dev/auth/react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const { signOut } = useAuthActions();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[oklch(0.06_0.015_265)]">
        <motion.div
          className="size-8 rounded-full border-2 border-white/10 border-t-white/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[oklch(0.06_0.015_265)]">
      {/* Subtle background gradient */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,oklch(0.12_0.03_265),transparent)]" />
        <div className="absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-[oklch(0.4_0.12_265_/_0.04)] blur-[100px]" />
        <div className="absolute -right-20 bottom-1/3 h-[300px] w-[300px] rounded-full bg-[oklch(0.5_0.1_75_/_0.03)] blur-[100px]" />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-[oklch(0.06_0.015_265_/_0.8)] backdrop-blur-2xl">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-14 items-center justify-between">
            <Link href="/dashboard" className="group flex items-center gap-2.5">
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-white/70 hover:text-white"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[oklch(0.55_0.18_265)] to-[oklch(0.5_0.16_285)] opacity-60" />
                    <div className="relative flex size-7 items-center justify-center overflow-hidden rounded-full bg-[oklch(0.12_0.015_265)] text-xs font-medium text-white">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="size-full object-cover"
                        />
                      ) : (
                        user?.name?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase() ||
                        "U"
                      )}
                    </div>
                  </div>
                  <span className="hidden text-sm sm:inline">
                    {user?.name || user?.email?.split("@")[0]}
                  </span>
                  <svg
                    className="size-3.5 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 overflow-hidden rounded-xl border border-white/[0.06] bg-[oklch(0.1_0.015_265_/_0.95)] p-1 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
              >
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="truncate text-xs text-white/40">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator className="bg-white/[0.04]" />
                <DropdownMenuItem className="cursor-pointer rounded-lg text-white/60 focus:bg-white/[0.04] focus:text-white">
                  <svg
                    className="mr-2 size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer rounded-lg text-red-400/80 focus:bg-red-500/10 focus:text-red-400"
                >
                  <svg
                    className="mr-2 size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}

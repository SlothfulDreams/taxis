"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import type { GenericId } from "convex/values";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  GlowCard,
} from "@/components/motion";

export default function DashboardPage() {
  const projects = useQuery(api.projects.listProjects);
  const createProject = useMutation(api.projects.createProject);
  const deleteProject = useMutation(api.projects.deleteProject);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<GenericId<"projects"> | null>(
    null,
  );

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    setIsCreating(true);
    try {
      await createProject({ name: newProjectName.trim() });
      toast.success("Project created");
      setIsCreateDialogOpen(false);
      setNewProjectName("");
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (
    projectId: GenericId<"projects">,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone.",
      )
    ) {
      return;
    }

    setDeletingId(projectId);
    try {
      await deleteProject({ projectId });
      toast.success("Project deleted");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Loading state
  if (projects === undefined) {
    return (
      <div className="flex items-center justify-center py-24">
        <motion.div
          className="size-8 rounded-full border-2 border-white/10 border-t-white/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <FadeIn>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              Your Projects
            </h1>
            <p className="mt-1 text-sm text-white/40">
              Create and manage your interior design projects
            </p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="premium" size="default">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="border-white/[0.06] bg-[oklch(0.1_0.015_265)] sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display text-lg font-semibold tracking-tight text-white">
                  Create new project
                </DialogTitle>
                <DialogDescription className="text-sm text-white/40">
                  Give your project a name to get started.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateProject();
                  }}
                  className="border-white/[0.08] bg-white/[0.03] text-white placeholder:text-white/30 focus:border-white/[0.12]"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="text-white/50"
                >
                  Cancel
                </Button>
                <Button
                  variant="premium"
                  onClick={handleCreateProject}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <motion.div
                        className="size-4 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </FadeIn>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center justify-center py-24">
            <motion.div
              className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="size-7 text-white/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </motion.div>
            <h3 className="mb-1 font-display text-base font-medium text-white">
              No projects yet
            </h3>
            <p className="mb-6 text-sm text-white/40">
              Create your first project to start designing
            </p>
            <Button
              variant="premium"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              Create your first project
            </Button>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(
            (project: {
              _id: GenericId<"projects">;
              name: string;
              description?: string;
              thumbnailUrl: string | null;
              updatedAt: number;
            }) => (
              <StaggerItem key={project._id}>
                <Link href={`/project/${project._id}`} className="group block">
                  <GlowCard
                    className="relative overflow-hidden"
                    glowColor="violet"
                  >
                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDeleteProject(project._id, e)}
                      disabled={deletingId === project._id}
                      className="absolute right-2 top-2 z-10 rounded-lg bg-[oklch(0.06_0.015_265_/_0.9)] p-1.5 text-white/40 opacity-0 backdrop-blur-sm transition-all hover:bg-[oklch(0.08_0.015_265)] hover:text-red-400 group-hover:opacity-100"
                      title="Delete project"
                    >
                      {deletingId === project._id ? (
                        <motion.div
                          className="size-4 rounded-full border-2 border-white/30 border-t-white/80"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <svg
                          className="size-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] bg-[oklch(0.08_0.015_265)]">
                      {project.thumbnailUrl ? (
                        <img
                          src={project.thumbnailUrl}
                          alt={project.name}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="size-10 text-white/10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[oklch(0.06_0.015_265)] via-[oklch(0.06_0.015_265_/_0.5)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Button variant="glass" size="sm">
                          Open
                          <svg
                            className="size-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-display text-sm font-medium tracking-tight text-white transition-colors group-hover:text-[oklch(0.75_0.12_265)]">
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="mt-1 line-clamp-1 text-xs text-white/40">
                          {project.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-white/30">
                        <svg
                          className="size-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {formatDate(project.updatedAt)}
                      </div>
                    </div>
                  </GlowCard>
                </Link>
              </StaggerItem>
            ),
          )}
        </StaggerContainer>
      )}
    </div>
  );
}

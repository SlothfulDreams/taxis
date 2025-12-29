# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered interior design image editor. Users upload room photos, use interactive mask editing on a canvas, and get AI-generated redesigns using OpenAI GPT Image or Google Gemini.

## Commands

### Frontend (Next.js + Convex)
```bash
cd frontend
bun install                    # Install dependencies
bun dev                        # Dev server on localhost:3000
bun run lint                   # Biome linter
bun run format                 # Biome formatter
bunx convex dev                # Convex dev server (required for backend)
bunx convex dev --once         # Push Convex changes without watching
bunx @convex-dev/auth           # Set up auth keys (JWT_PRIVATE_KEY, JWKS)
```

### Backend (FastAPI)
```bash
cd backend
uv sync                                    # Install dependencies
uv run uvicorn main:app --reload           # Dev server on localhost:8000
uv run pytest                              # Run tests
```

## Architecture

### Two-Server Architecture
- **Frontend + Convex**: Next.js app with Convex for real-time database, auth, and file storage
- **Backend**: FastAPI server handles AI image generation (keeps API keys server-side)

### Data Flow for Image Editing
1. User uploads image → stored in Convex Storage
2. User draws mask on Fabric.js canvas → exported as base64
3. Frontend sends image + mask + prompt to FastAPI `/api/edit`
4. FastAPI calls OpenAI/Gemini → returns generated image base64
5. Frontend stores result in Convex, displays to user

### Key Frontend Structure
- `src/app/` - Next.js App Router pages
- `src/components/editor/` - Canvas editor components
  - `EditorContext.tsx` - Central state for canvas, tools, masks, AI settings
  - `ImageCanvas.tsx` - Fabric.js canvas wrapper
  - `Toolbar.tsx` - Brush/eraser tools
  - `PromptPanel.tsx` - AI prompt input and model selection
- `src/components/motion/` - Framer Motion animation components
- `src/components/ui/` - shadcn/ui components (Button, Dialog, Input, etc.)
- `convex/` - Convex functions and schema

### Key Backend Structure
- `app/routers/edit.py` - `/api/edit` (mask-based) and `/api/edit/semantic` (Gemini-only)
- `app/services/openai_service.py` - OpenAI GPT Image 1.5 integration
- `app/services/gemini_service.py` - Google Gemini 2.5 Flash integration

### Convex Schema (convex/schema.ts)
- `users` - Auth users with `...authTables` spread
- `projects` - User's design projects
- `images` - Originals, generated results, masks (stored in Convex Storage)
- `edits` - Edit operation history with status tracking

### Authentication (Convex Auth)
- Configured in `convex/auth.ts` with Password, GitHub, Google providers
- Uses `@convex-dev/auth` package
- Requires environment variables: `JWT_PRIVATE_KEY`, `JWKS`, `SITE_URL` (set via `npx @convex-dev/auth`)
- Auth state provided via `useAuth()` hook from `src/components/providers/auth-provider.tsx`

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_CONVEX_URL=https://[deployment].convex.cloud
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Backend (.env)
```
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...
CORS_ORIGINS=http://localhost:3000
```

### Convex Dashboard (set automatically by npx @convex-dev/auth)
- `JWT_PRIVATE_KEY`, `JWKS`, `SITE_URL`
- OAuth: `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`

## Code Style

- **Linting**: Biome (configured in `biome.json`)
- **Formatting**: 2-space indentation
- **TypeScript**: Strict mode enabled
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS 4 with OKLCH color space, custom design tokens in `globals.css`

## React Compiler

This project uses **React Compiler** (`babel-plugin-react-compiler`) which automatically memoizes components and hooks. This means:

- **No manual `useMemo`/`useCallback`**: The compiler automatically optimizes re-renders
- **No `React.memo()` wrappers needed**: Components are memoized at compile time
- **Cleaner code**: Write straightforward React without performance boilerplate

The compiler is configured in Next.js and runs during build. Write components naturally and let the compiler handle optimization.

## AI Model Usage

| Model | Endpoint | Use Case |
|-------|----------|----------|
| OpenAI GPT Image 1.5 | `/api/edit` | Mask-based editing, high-quality renders (requires mask) |
| Google Gemini 2.5 Flash | `/api/edit/semantic` | Fast iterations, semantic editing without masks |

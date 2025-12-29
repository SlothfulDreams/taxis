# AI Interior Image Editor - Remaining Features

## High Priority

- [ ] **Backend API testing** - Test FastAPI endpoints with real API keys (OpenAI, Google)
- [ ] **Generate new image from text** - Wire up the "Generate" tab in PromptPanel to create images from scratch
- [ ] **Undo/Redo functionality** - Add buttons to navigate edit history

## Medium Priority

- [ ] **Project rename/edit** - Add edit dialog to update project name and description
- [ ] **Image gallery within project** - Show all images in a project with selection, not just the latest
- [ ] **Mask upload to Convex** - Persist mask images to Convex storage before sending to API
- [ ] **Edit status tracking UI** - Show processing/pending/failed states in the editor

## Polish & UX

- [ ] **Loading skeletons** - Replace spinners with skeleton loaders for better perceived performance
- [ ] **Error boundaries** - Add React error boundaries for graceful error handling
- [ ] **Keyboard shortcuts** - B for brush, E for eraser, S for select, Ctrl+Z for undo, etc.
- [ ] **Mobile responsive editor** - Adapt editor layout for mobile/tablet devices
- [ ] **User profile page** - View/edit profile info, see usage statistics

## Future / Nice-to-Have

- [ ] **Real-time collaboration** - Multiple users editing the same project
- [ ] **Template library** - Pre-made style presets and room templates
- [ ] **Batch processing** - Edit multiple images at once
- [ ] **API rate limiting** - Implement rate limits to prevent abuse
- [ ] **Usage/billing tracking** - Track API token usage per user for billing

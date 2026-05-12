# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build (outputs to /dist)
npm run preview   # Preview production build locally
```

## Dependencies

- `remark-breaks` — converts single newlines within MDX paragraphs into `<br>` tags, required for correct poetry line rendering. Configured in `astro.config.mjs` via `markdown.remarkPlugins`.

## Architecture

**LiraLatente** is a static Astro 5 site for a curated Spanish-language poetry collection. All routes are pre-rendered at build time — no server-side rendering.

### Key directories

- `src/content/poesias/` — MDX files, one per poem. Frontmatter is the source of truth for ordering, categories, and featured status.
- `src/data/categories.ts` — Single source of truth for all 8 category definitions (slug, name, color, icon, description). Both the content schema and UI derive from this file.
- `src/pages/poesia/[titulo].astro` — Dynamic poem detail pages (prev/next navigation, mood styling).
- `src/pages/categoria/[categoria].astro` — Category-filtered poem listings.
- `src/scripts/interactions.js` — All client-side effects (typewriter, parallax, intersection observer, reading progress bar). Loaded once, respects `prefers-reduced-motion`.

### Poem frontmatter schema

```typescript
{
  titulo: string        // Poem title (also used as URL slug)
  index: number         // Display/navigation order — curated, not automatic
  last?: boolean        // Marks poem as featured on homepage (overrides newest-by-index logic)
  categorias?: string[] // Subset of the 8 slugs defined in categories.ts
}
```

### Category system

Categories live in `src/data/categories.ts` and are enforced by the Zod schema in `src/content/config.ts`. To add or rename a category, update `categories.ts` first — the schema enum is derived from it automatically. The default category is `"existencial"`.

The 8 categories: `amor`, `melancolía`, `lucha`, `salud-mental`, `reflexión`, `sociedad`, `existencial`, `religión`.

### Mood styling

Poem detail pages apply a CSS mood class based on the poem's first category. The mapping is in `src/pages/poesia/[titulo].astro` and drives accent colors for the reading experience.

### Featured poem logic

The homepage shows a preview of the "latest" poem: first it checks for a poem with `last: true`, otherwise it picks the poem with the highest `index` value.

### Typography & design tokens

Defined in `src/Layouts/Layout.astro` (global styles). The entire site uses **Cormorant Garamond** (weights 300–700 with italics) — a Garamond-based serif classic in literary/poetry publishing. The dark background gradient and grain overlay are applied at layout level. Accent color is `#81b29a` (sage green).

# Red Chilly Cafe — Auroville

A fully functional React + TypeScript + Tailwind CSS website reproducing the supplied
reference designs: a single-page public website plus an Admin Panel.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Routes

| Route         | Page                                                   |
|---------------|--------------------------------------------------------|
| `/`           | Single-page landing: Home, Our Story, Menu, Experience, Contact |
| `/admin`      | Admin Panel (Menu & Reviews management)                |

## Data & persistence

Menu items and reviews live in `src/data/menuItems.ts` and `src/data/reviews.ts`
as the initial seed data. At runtime, all reads/writes go through
`src/context/DataContext.tsx`, which persists to `localStorage` under the keys
`rc_menu` and `rc_reviews`. This means:

- Adding, editing or deleting a menu item in `/admin` updates the public `/menu`
  page immediately.
- Approving, hiding or deleting a review in `/admin` updates the `/experience`
  page's visible review list (only `Approved` reviews are shown publicly).
- Submitting the review form on `/contact` adds a new review with `Pending`
  status, visible in the admin panel for moderation.

The `DataContext` is intentionally the single place that talks to storage, so it
can be swapped for real API calls (Firebase, Supabase, or a custom backend)
without touching any page or component.

## Notes on assets

- The reference screenshots were the design source of truth for layout, type,
  color, spacing and composition — this project reproduces them structurally
  in code (Tailwind design tokens for the espresso/cream/terracotta palette,
  Playfair Display + Cormorant Garamond for display type, Montserrat for UI
  text).
- No original photography or logo file was supplied, so food/interior photos
  use freely licensed stock images (Unsplash) as visual placeholders in the
  same aspect ratios and positions as the reference, and the circular badge
  logo has been rebuilt as an SVG component (`src/components/Logo.tsx`) in the
  same style. Swap the `src` URLs or the `Logo` component with your real
  photography/logo file whenever it's available — everything else has been
  built to make that a drop-in change.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v7
- lucide-react icons
"# Red-Chilly-Cafe" 

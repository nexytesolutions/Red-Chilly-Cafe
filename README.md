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

In the default frontend demo mode, menu items and reviews are read and written by
`src/context/DataContext.tsx` using the `rc_menu` and `rc_reviews` localStorage
keys. Existing saved menu items are preserved; the bundled review examples are
used only when `rc_reviews` has not been saved yet. Menu categories and diet
types are available locally so menu management works without a backend.

To opt in to the API backend, set `VITE_API_URL` in `.env.local` (for example,
`http://localhost:3000`) and restart Vite. When this variable is configured,
API errors are reported instead of silently switching to local data. This means:

- Adding, editing or deleting a menu item in `/admin` updates the public `/menu`
  page immediately.
- Approving, hiding or deleting a review in `/admin` updates the `/experience`
  page's visible review list (only `Approved` reviews are shown publicly).
- Submitting the review form on `/contact` adds a new review with `Pending`
  status, visible in the admin panel for moderation.

The `DataContext` is the shared source for menu and review state in both the
public site and Admin Panel.

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

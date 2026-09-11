# Portfolio 2026

Code implementation of the [Figma design](https://www.figma.com/design/xWDWzCApxAs27IpwTVDQbm/Portfolio-2026). Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css` under `@theme` and become real utility classes (see below)
- No component library / no CMS — content is plain typed data in `src/content`

## Structure

```
src/
  app/
    layout.tsx        root shell: sidebar + content frame
    page.tsx           "/" — Work grid
    about/page.tsx      "/about" — stub, no Figma design yet
    globals.css         design tokens (@theme)
  components/
    layout/Sidebar.tsx  nav header, menu, footer
    ui/PageHeader.tsx    big page title ("Work", "About me", ...)
    work/
      BentoGrid.tsx      6-column grid container
      WorkCard.tsx       one project card
      ProjectImage.tsx   image treatments (plain / framed)
      ProjectMeta.tsx     "Client | tags" line
  content/
    site.ts             name, bio, nav links, footer copy
    projects.ts          the array that drives the whole Work grid
  types/
    project.ts           Project / ProjectLayout types
public/
  images/projects/       project images
```

## Adding a new project

Open `src/content/projects.ts` and append an object:

```ts
{
  slug: "my-new-project",
  title: "My New Project",
  client: "Acme Inc",
  tags: ["Research", "UI Design"],
  description: "One or two sentences about the project.",
  image: { src: "/images/projects/my-new-project.png", alt: "..." },
  layout: { colStart: 1, colSpan: 3, rowStart: 5 },
}
```

Drop the image file in `public/images/projects/`. That's it — no new component to write.

### `layout` options (`src/types/project.ts`)

The grid is 6 columns wide. Each card declares where it sits:

- `colStart` (1–6) / `colSpan` (1–6) — horizontal position and width
- `rowStart` — which row; every card is top-aligned in its row, never stretched to match a taller neighbour
- `offsetTop: true` — nudge the card down by a fixed 88px (one rhythm unit), for a card that sits lower within its row. Fixed on purpose: it doesn't chase a neighbour's height, so it won't shift if that neighbour's image or copy changes later
- `imageOnly: true` — render just the image, no title/description/tags (useful for a decorative companion shot)

Whether the title/description sit side by side or stacked is **not** something you configure. `WorkCard` adapts on its own via a CSS container query based on the card's *rendered* width, so a 1-column card automatically stacks its text and a 4-column card automatically splits it — this is the same rule the original Figma layout follows. Title/body/meta font sizes, on the other hand, are fixed and identical on every card regardless of width.

### Image treatments (`src/types/project.ts` → `ProjectImage["treatment"]`)

Every card's image area is a fixed 280px tall and square-cornered, regardless of the card's width.

- `"plain"` (default) — a cropped image, fills the card
- `"framed"` — the browser-mockup look used for the first case study (gradient mat + drop shadow), for real product screenshots

## Design tokens

All values are defined once in `src/app/globals.css` (`@theme` block) and become Tailwind utilities automatically — change a value there and every component using it updates:

| Token | Utility example | Current value |
|---|---|---|
| `--color-ink` / `--color-muted` / `--color-canvas` / `--color-surface` | `text-ink`, `bg-canvas` | `#2e3031`, `#73787a`, `#d0d1d2`, `#ffffff` |
| `--color-placeholder*` | `bg-placeholder` | empty-image / gradient-mat colors |
| `--spacing-gutter` / `--spacing-rhythm` / `--spacing-nav` / `--spacing-content` | `gap-gutter`, `gap-y-rhythm` | `24px`, `88px`, `32px`, `56px` |
| `--shadow-card` | `shadow-card` | Figma "Drop Shadow/400" |
| `--text-display` / `--text-brand` / `--text-title` / `--text-nav` / `--text-body` / `--text-meta` | `text-display`, `text-title`, ... | size + line-height + tracking + weight bundled per role — the same on every card, regardless of width |

### Fonts

The Figma file uses **Helvetica Neue LT Std (85 Heavy)** for display type and **Braun Linear** (Regular/Medium/Bold) for everything else. Both are commercial and self-hosted from the licensed files in `src/fonts/`, loaded via `next/font/local` in `src/app/fonts.ts` and wired into `--font-display` / `--font-sans` in `globals.css`. Next.js self-hosts them at build time (no external requests, no layout shift) and each falls back to system Helvetica/Arial for the brief instant before it loads.

To swap or add a weight: drop the file in `src/fonts/`, add it to the relevant `localFont({ src: [...] })` array in `src/app/fonts.ts` with its `weight`/`style`, done — no changes needed in `globals.css` or components.

`src/fonts/*` is licensed, third-party content, committed here at the repo owner's discretion — if you fork this repo, swap in fonts you're licensed to redistribute (see [Fonts](#fonts) above).

## Development

```bash
npm run dev     # http://localhost:3000/portfolio
npm run build
npm run lint
```

`npm run dev`/`build` serve everything under `/portfolio` (see [Deployment](#deployment)) — that's expected, not a bug, and matches how the deployed site behaves.

## Deployment

Static export (`output: "export"` in `next.config.ts`), published to **GitHub Pages** as a project page at `https://clovescmj.github.io/portfolio/`. `.github/workflows/deploy.yml` builds and deploys automatically on every push to `main`.

One-time setup on GitHub: repo **Settings → Pages → Source → GitHub Actions**. After that, pushing to `main` is the entire deploy step.

Two things are wired specifically for this and would need to change if the repo is ever renamed or moved to a different host:

- `basePath`/`assetPrefix` in `next.config.ts` (`repoName`) — must match the actual repo name.
- `src/lib/asset-path.ts` — `<Link>` and page routes get `basePath` applied automatically by Next.js, but a plain string handed to `next/image`'s `src` doesn't (especially with `images.unoptimized`, required since there's no server to run the image optimizer). Any static asset referenced that way — see `ProjectImage.tsx` — goes through `assetPath()` instead of being used raw.

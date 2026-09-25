# Portfolio 2026

Next.js 16 (App Router, static export) + React 19 + TypeScript + Tailwind CSS v4. Built from the [Figma file](https://www.figma.com/design/xWDWzCApxAs27IpwTVDQbm/Portfolio-2026). No CMS and no component library: content is typed data in `src/content`.

```bash
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

## How the pages are built

```
src/
  app/                    routes: / (work), /about, /work/[slug]
  content/
    projects.ts           cards on the Work page (also the mobile order)
    case-studies/*.ts     one typed CaseStudy per case
    articles/*.ts         one typed Article per article
  types/                  the shape of all of the above
  components/
    ui/                   Heading, PageHeader
    layout/               Sidebar, ScrollArea, TransitionLink, page fade
    work/                 BentoGrid, WorkCard, MoreWork
    case-study/           Chapter, ColumnsSection, Subsection, Impact, ...
    article/              ArticleBody
```

### A case study is a tree

`CaseStudy` is a header (hero + intro) followed by `sections`. Each section becomes a `<section>` in the HTML, and a chapter's subsections nest inside it:

```
CaseStudy
  sections[]
    columns     Problem / Understanding: a title and two columns (+ optional subsections)
    chapter     Context, Solution, App Evolution...: a title and subsections[]
    spotlight   the dark Product Vision block
    impact      stats and numbered lists
```

A `Subsection` holds the content (`topics`, `miniGrid`, `flows`, `embed`, `quote`, `links`...) and one small `layout` object for where it sits on the grid (`labelWidth`, `contentStart`). To add a case, copy a file in `src/content/case-studies/`, edit it and register it in `index.ts`.

### Headings

`<Heading level={2} variant="h2">` separates two things:

| | Meaning | Values |
|---|---|---|
| `level` | the HTML tag, i.e. the document outline | 1 to 6, never skip a level |
| `variant` | the look, one type-scale token each | `h1` 48px, `h2` 32px, `h3` 24px, `h4` 18px, `h5` 16px |

The variants are named after the tag they normally sit on: the page title is `h1`, a section `h2`, a group or subsection title `h3`, and so on. Sizes, weights and line heights live in `src/app/globals.css`.

### Layout primitives

Defined once in `globals.css`, not copied into components:

- `page-grid`: 1 column on mobile, the 6-column grid from `md` up (add row gap and `md:pr-content` yourself)
- `gap-subsection`: 64px between subsections at 1440px, scaling down to 36px
- `bleed-content`: cancels the scroll area's inset so a block can reach the right edge

Spacing tokens (`--spacing-content`, `--spacing-gutter`, `--spacing-column`...) sit in the same file.

### Links

Every internal link uses `TransitionLink`, which runs the page fade. Modified clicks (Cmd, Ctrl, Shift, middle-click) fall through to the browser.

## Checking a refactor

`scripts/layout-snapshot.js` records the position and size of every heading, paragraph, image, divider and embed on all seven pages, then compares two recordings. Paste it into the browser console on the running dev server:

```js
await layoutSnapshot("before")        // 1440px
await layoutSnapshot("before375", 375)
// ...change code...
await layoutSnapshot("after")
layoutCompare("before", "after")      // "identical" per page, or the first differences
```

Also run `npx tsc --noEmit` and `npx eslint src`.

## Assets

`public/images/**` holds the images; `scripts/generate-image-variants.mjs` writes the `-720` and `-1440` copies and the manifest the custom image loader reads. Fonts are WOFF2 in `src/fonts`.

# JL Digital Works — Complete Technology Learning Plan

## Technologies Used in This Project

| Technology | Where It's Used | Priority |
|---|---|---|
| **React 18** | All components, hooks, state management | 🔴 Critical |
| **TypeScript** | Every `.tsx` / `.ts` file | 🔴 Critical |
| **Tailwind CSS** | Styling across all components | 🔴 Critical |
| **React Router DOM** | Page routing (`App.tsx`, `Index.tsx`, `NotFound.tsx`) | 🔴 Critical |
| **Shadcn/UI (Radix)** | UI primitives — Dialog, Button, Input, Accordion, etc. | 🔴 Critical |
| **Lucide React** | Icons everywhere — `Mail`, `Send`, `Menu`, `X`, `CheckCircle`, etc. | 🟡 High |
| **Zod** | Form validation schema (`ContactFormModal.tsx`) | 🟡 High |
| **Framer Motion** | Scroll animations (`useScrollAnimation.ts`) | 🟡 High |
| **Vite** | Build tool & dev server (`vite.config.ts`) | 🟢 Medium |
| **Cal.com Embed** | Scheduling widget (`useCalEmbed.ts`) | 🟢 Medium |
| **Netlify Forms** | Contact form backend (`ContactFormModal.tsx`, `index.html`) | 🟢 Medium |
| **GTM dataLayer** | Analytics event tracking (`ContactFormModal.tsx`) | 🟢 Medium |
| **Sonner** | Toast notifications (`App.tsx`, `sonner.tsx`) | 🔵 Low |
| **next-themes** | Dark/light mode toggle (`ThemeContext.tsx`, `sonner.tsx`) | 🔵 Low |
| **React Hook Form** | Form handling (installed, lightly used) | 🔵 Low |
| **Recharts** | Charting library (installed, not yet used) | 🔵 Low |
| **date-fns** | Date utilities (installed, available for use) | 🔵 Low |
| **class-variance-authority** | Component variant definitions (`button.tsx`, etc.) | 🔵 Low |
| **tailwind-merge / clsx** | Conditional class merging (`lib/utils.ts`) | 🔵 Low |

---

## Phase 1: Foundations (Days 1–3)

### Day 1 — HTML, CSS & JavaScript Basics
- HTML elements, attributes, semantic tags (`<header>`, `<main>`, `<section>`)
- CSS selectors, box model, flexbox, grid
- JavaScript variables, functions, arrays, objects, arrow functions

### Day 2 — TypeScript Essentials
- Types, interfaces, type aliases
- Generics basics (`Array<T>`, `Record<K, V>`)
- `as const`, union types, `z.infer<typeof schema>`
- Resource: https://www.typescriptlang.org/docs/handbook/

### Day 3 — React Core Concepts
- Components (functional), JSX, props, children
- `useState`, `useEffect`, `useRef`, `useCallback`
- Event handling, conditional rendering, lists & keys
- Resource: https://react.dev/learn

---

## Phase 2: Styling & UI Libraries (Days 4–6)

### Day 4 — Tailwind CSS
- Utility classes, responsive prefixes (`sm:`, `md:`, `lg:`)
- Custom theme tokens in `tailwind.config.ts` and `index.css`
- Semantic color system: `--primary`, `--background`, `--muted`, etc.
- Resource: https://tailwindcss.com/docs

### Day 5 — Shadcn/UI & Radix Primitives
- How Shadcn generates components into `src/components/ui/`
- Radix primitives: Dialog, Accordion, Tabs, etc.
- Customizing with `class-variance-authority` (CVA) variants
- Resource: https://ui.shadcn.com/docs

### Day 6 — Framer Motion & Animations
- `motion.div`, `initial`, `animate`, `transition`
- Scroll-triggered animations (see `useScrollAnimation.ts`)
- `whileHover`, `whileInView`, layout animations
- Resource: https://www.framer.com/motion/

---

## Phase 3: Project-Specific Tools (Days 7–11)

### Day 7 — React Router DOM
- `<BrowserRouter>`, `<Routes>`, `<Route>`
- `useNavigate`, `useParams`, `<Link>`
- Lazy loading routes with `React.lazy` + `Suspense`
- Resource: https://reactrouter.com/en/main

### Day 8 — Lucide React (Icons)
- Importing individual icons: `import { Camera } from 'lucide-react'`
- Props: `size`, `color`, `strokeWidth`, `absoluteStrokeWidth`
- All icons accept standard SVG attributes as props
- Tree-shaking: only imported icons are bundled
- Browse icons: https://lucide.dev/icons
- Resource: https://lucide.dev/guide/packages/lucide-react

**Practice:** Find an icon on lucide.dev, import it into any component, customize its size and color.

### Day 9 — Zod (Schema Validation)
- Defining schemas: `z.string()`, `z.number()`, `z.array()`, `z.object()`
- Chaining: `.min()`, `.max()`, `.email()`, `.regex()`, `.optional()`, `.trim()`
- Validating data: `schema.safeParse(data)` → returns `{ success, data, error }`
- Extracting types: `type MyType = z.infer<typeof mySchema>`
- See real usage: `contactSchema` in `ContactFormModal.tsx`
- Resource: https://zod.dev

**Practice:** Write a schema for a signup form (email, password 8+ chars, age 18+), validate test data with `.safeParse()`.

### Day 10 — Vite (Build Tool)
- What it does: dev server with HMR, production bundler, module resolution
- `vite.config.ts`: plugins, aliases (`@/` → `src/`), server settings
- Custom plugins in this project: `asyncCssPlugin`, `modulePreloadLazyChunksPlugin`
- Environment modes: `development` vs `production`
- Resource: https://vitejs.dev/guide/

### Day 11 — Utility Libraries
- **class-variance-authority (CVA):** defining component variants (see `button.tsx`)
- **clsx + tailwind-merge:** conditional class names (`cn()` in `lib/utils.ts`)
- **next-themes:** `useTheme()` for dark/light mode
- **date-fns:** date formatting and manipulation (available, not yet used)

---

## Phase 3.5: Third-Party Integrations (Days 12–14)

### Day 12 — Cal.com Embed
- Loading third-party scripts in React with `useEffect`
- The `getCalApi()` pattern and namespace configuration
- Deferred loading with `requestIdleCallback` to avoid blocking LCP
- See: `src/hooks/useCalEmbed.ts`
- Resource: https://cal.com/docs/core-features/embed

### Day 13 — Netlify Forms
- How HTML `data-netlify="true"` + `form-name` attribute works
- Honeypot spam protection (`netlify-honeypot="bot-field"`)
- Submitting via `fetch` POST with URL-encoded body
- Hidden form in `index.html` for Netlify to detect fields at build time
- The `encode()` helper function pattern
- See: `ContactFormModal.tsx` (lines 103–107, 136–148)
- Resource: https://docs.netlify.com/forms/setup/

### Day 14 — GTM dataLayer
- What `window.dataLayer` is and how GTM reads it
- Pushing events: `window.dataLayer.push({ event: 'eventName', ... })`
- Structuring data for Enhanced Conversions (`user_data` object)
- Adding fallbacks with `|| ''` for empty fields
- TypeScript: extending `Window` interface with `declare global`
- See: `ContactFormModal.tsx` (lines 152–167)
- Resource: https://developers.google.com/tag-manager/devguide

---

## Phase 4: Hands-On Practice (Days 15–17)

### Code Reading Exercises
Read and annotate these files in order:

1. **`src/lib/utils.ts`** — understand the `cn()` helper
2. **`src/components/ui/button.tsx`** — CVA variants + Radix Slot
3. **`src/components/Hero.tsx`** — layout, responsive design, Lucide icons
4. **`src/components/ContactFormModal.tsx`** — Zod validation + Netlify Forms + GTM dataLayer (all three patterns together)
5. **`src/hooks/useCalEmbed.ts`** — third-party script loading pattern
6. **`vite.config.ts`** — custom Vite plugins for performance

### Practice Tasks
1. ✏️ Change a Tailwind color token in `index.css` and see it propagate
2. ✏️ Add a new Shadcn component (`npx shadcn-ui add [component]`)
3. ✏️ Import a new Lucide icon and use it in any component
4. ✏️ Write a Zod schema for a new data type and validate test data
5. ✏️ Create a new page with React Router and link to it from the navbar
6. ✏️ Add a scroll-triggered animation using `useScrollAnimation`

---

## Quick Reference

| Pattern | Where to Find It | Key Concept |
|---|---|---|
| Component with props | Any file in `src/components/` | TypeScript interface + destructuring |
| Conditional rendering | `ContactFormModal.tsx` (status checks) | Ternary `? :` and `&&` |
| Form state management | `ContactFormModal.tsx` (useState) | Controlled inputs + onChange |
| Schema validation | `ContactFormModal.tsx` (contactSchema) | Zod `.safeParse()` + field errors |
| API call (fetch) | `ContactFormModal.tsx` (handleSubmit) | async/await + try/catch |
| Netlify form submission | `ContactFormModal.tsx` + `index.html` | URL-encoded POST + hidden form |
| GTM event tracking | `ContactFormModal.tsx` (dataLayer.push) | Window global + event object |
| Icon usage | Throughout all components | `import { Icon } from 'lucide-react'` |
| Dark mode | `ThemeContext.tsx` + `sonner.tsx` | `useTheme()` from next-themes |
| Custom hook | `useScrollAnimation.ts`, `useCalEmbed.ts` | `useEffect` + `useRef` |
| Design tokens | `index.css` + `tailwind.config.ts` | CSS variables → Tailwind classes |
| Route setup | `App.tsx` | `<Routes>` + lazy loading |
| Vite plugin | `vite.config.ts` | `transformIndexHtml` hook |
| Toast notification | `App.tsx` | `<Toaster />` from Sonner |

---

## Success Metrics

By the end of this plan, you should be able to:

- [ ] Read and understand every file in this project
- [ ] Create a new React component with TypeScript props
- [ ] Style it with Tailwind using the project's design tokens
- [ ] Import and customize a Lucide icon (size, color, strokeWidth)
- [ ] Write a Zod schema and validate data with `.safeParse()`
- [ ] Add a new route with React Router
- [ ] Use Shadcn/UI components and customize their variants
- [ ] Add scroll animations with Framer Motion
- [ ] Understand how Netlify Forms, Cal.com embed, and GTM work together
- [ ] Explain what Vite does and how the custom plugins optimize performance

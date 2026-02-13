

# Updated Learning Plan: Add Missing Technologies

## Overview
The current `plan.md` is missing several technologies actively used in this project. This update adds coverage for all of them so you have a complete learning roadmap.

## Technologies to Add

### Currently Missing from plan.md

| Technology | Where It's Used | Priority |
|---|---|---|
| Lucide React | Icons across all components (Mail, Send, Menu, X, etc.) | High -- used everywhere |
| Zod | Form validation schema in `ContactFormModal.tsx` | High -- already mentioned in Quick Reference but not taught |
| Vite | Build tool and dev server (`vite.config.ts`) | Medium -- you use it daily |
| Cal.com Embed | Scheduling integration (`useCalEmbed.ts`) | Medium -- third-party integration pattern |
| Sonner | Toast notifications (`App.tsx`) | Low -- simple API |
| Netlify Forms | Form submission backend (`ContactFormModal.tsx`) | Medium -- how the form actually submits |
| GTM dataLayer | Analytics tracking (`ContactFormModal.tsx`) | Medium -- recently added |
| React Hook Form | Installed dependency for form handling | Low -- installed but lightly used |
| Recharts | Installed charting library | Low -- available but not yet used in visible components |
| date-fns | Installed date utility library | Low -- available for use |

### What Changes in the Plan Structure

**Phase 3 (Project-Specific Tools)** will be expanded from 3 days to 4-5 days, adding:

- **Lucide React** -- how to import and use icons, available icon names, props (size, color, strokeWidth)
- **Zod** -- schema definition, validation with `.safeParse()`, error handling, how it connects to form validation
- **Vite** -- what it does (bundling, dev server, HMR), basic config understanding

**Phase 4 (Hands-On)** will add:

- Updated Quick Reference table with all technologies
- New code reading entry for `ContactFormModal.tsx` covering Zod + Netlify Forms + GTM dataLayer together
- New practice task: "Add a new icon from Lucide to any component"

**New section: Third-Party Integrations** covering:

- Cal.com embed pattern (loading third-party scripts in React)
- Netlify Forms (how HTML form attributes + fetch POST work together)
- GTM dataLayer (pushing events for analytics tracking)

## Technical Details

The file `.lovable/plan.md` will be rewritten with the following additions:

1. Add a "Technologies Used" summary table at the top listing every dependency and where it appears
2. In Phase 3, add a new day for "Lucide React, Zod, and Vite" with links:
   - Lucide: https://lucide.dev/guide/packages/lucide-react
   - Zod: https://zod.dev
   - Vite: https://vitejs.dev/guide/
3. Add Phase 3.5: "Third-Party Integrations" covering Cal.com, Netlify Forms, and GTM
4. Update the Quick Reference table to include all patterns
5. Update Success Metrics to include: "Import and use a Lucide icon" and "Write a basic Zod schema"
6. Keep all existing content intact -- only additions, no removals


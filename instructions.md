# Figma-to-Code Rules for JL Digital Works

This document defines architectural patterns, design system conventions, and validation requirements for converting Figma designs to code in the JL Digital Works codebase.

## 1. Technology Stack & Framework

### Core Stack
- **Framework**: React 18+ with TypeScript (strict mode not enforced)
- **Build Tool**: Vite (ES module driven, fast HMR)
- **Styling**: Tailwind CSS with design tokens (CSS variables in HSL format)
- **Component Library**: shadcn/ui (wrapper around Radix UI primitives)
- **Icons**: lucide-react (24px default size, customizable via Tailwind sizing)
- **Theme System**: React Context-based with light/dark mode
- **Form Handling**: react-hook-form + @hookform/resolvers for validation
- **Routing**: React Router v6

### Key Dependencies
```json
{
  "@radix-ui/react-*": "primitives for accessible components",
  "class-variance-authority": "variant management (CVA pattern)",
  "clsx + tailwind-merge": "className merging via cn() utility"
}
```

---

## 2. Design Tokens & Color System

### Color Token Structure
All colors use **HSL CSS variables** defined in [`src/index.css`](src/index.css):

#### Light Mode (Root)
```css
--primary: 252 100% 55%          /* #6A2EFF (Purple) */
--primary-foreground: 0 0% 100%  /* White */
--accent: 252 100% 65%           /* Brighter purple */
--secondary: 0 0% 96%            /* Near white */
--destructive: 0 84.2% 60.2%     /* Red */
--border: 0 0% 90%               /* Light gray */
--background: 0 0% 100%          /* White */
--foreground: 0 0% 10%           /* Near black */
```

#### Dark Mode (.dark class)
```css
--primary: 252 100% 65%          /* Brighter in dark */
--background: 0 0% 6%            /* Almost black */
--foreground: 0 0% 92%           /* Near white */
--border: 0 0% 20%               /* Darker gray border */
```

### Color Reference in Tailwind
- **Primary actions**: `text-primary`, `bg-primary`, `hover:bg-primary/90`
- **Semantic colors**: `destructive`, `success`, `muted`, `card`, `popover`
- **Avoid hardcoding**: Never use `text-[#6A2EFF]` or color hex values. Always use token classes.

**Related File**: [tailwind.config.ts](tailwind.config.ts) extends `theme.colors` with token-based color definitions.

---

## 3. Typography System

### Font Families
```typescript
// From tailwind.config.ts
fontFamily: {
  sans: ["Inter", "system-ui", "sans-serif"],      // Body text
  display: ["Space Grotesk", "system-ui", "sans-serif"], // Headlines
}
```

### Usage Convention
- **Headings**: Apply `font-display font-bold` (h1, h2, h3, h4, h5, h6 semantic elements)
- **Body**: Uses `font-sans` by default (applied globally in `src/index.css`)
- **Font sizes**: Use Tailwind scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-3xl`, etc.)

### Examples from Codebase
```tsx
// Hero heading
<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
  Websites, Automation, and Tracking Built to Convert
</h1>

// Section subheading
<span className="text-sm font-medium text-primary">Core Service</span>
```

**Avoid hardcoding**: Never use inline font-family declarations or custom font-sizes outside Tailwind's scale.

---

## 4. Reusable UI Components (shadcn/ui)

### Component Architecture
All UI components live in [`src/components/ui/`](src/components/ui/). They follow the shadcn pattern:
- Built on **Radix UI primitives** (headless, unstyled)
- Styled with **Tailwind classes** only
- **Exported for reuse** in page/section components

### Core Components (Must Reuse)
| Component | File | Purpose | Variants |
|-----------|------|---------|----------|
| **Button** | [button.tsx](src/components/ui/button.tsx) | All clickable actions | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`; sizes: `sm`, `default`, `lg`, `icon` |
| **Card** | [card.tsx](src/components/ui/card.tsx) | Content containers | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| **Input** | [input.tsx](src/components/ui/input.tsx) | Form inputs | Text, email, password, number types |
| **Label** | [label.tsx](src/components/ui/label.tsx) | Form labels | Accessible label wrapper |
| **Textarea** | [textarea.tsx](src/components/ui/textarea.tsx) | Multi-line input | |
| **Select** | [select.tsx](src/components/ui/select.tsx) | Dropdown selection | Radix Popover-based |
| **Dialog** | [dialog.tsx](src/components/ui/dialog.tsx) | Modal/popover dialogs | Radix-based, overlay with backdrop |
| **Accordion** | [accordion.tsx](src/components/ui/accordion.tsx) | Collapsible sections | Radix primitive |
| **Badge** | [badge.tsx](src/components/ui/badge.tsx) | Small labels/tags | Unstyled, Tailwind-only |
| **Avatar** | [avatar.tsx](src/components/ui/avatar.tsx) | User images | Fallback text support |

### Component Reuse Rules
1. **MUST** use shadcn components for standard UI elements (buttons, cards, inputs, selogs, etc.)
2. **NEVER** create custom Button or Card components—extend existing ones via className composition
3. **Compose** complex layouts from these primitives (e.g., a "feature card" = Card + Badge + group hover state)
4. **Forward refs** for compatibility: all UI components use `React.forwardRef<>`
5. **Variant management** via CVA (class-variance-authority):
   ```tsx
   const buttonVariants = cva("base styles", {
     variants: {
       variant: { default: "...", outline: "..." },
       size: { default: "...", sm: "..." }
     }
   });
   ```

### Example: Composing a Custom Component
```tsx
// ✅ CORRECT: Reuse Card + Button + Badge
export function FeatureCard({ title, description }) {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <Badge>New</Badge>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Learn More</Button>
      </CardContent>
    </Card>
  );
}

// ❌ AVOID: Custom styled div instead of shadcn components
export function FeatureCard({ title, description }) {
  return (
    <div className="custom-styling">
      {/* No structure, no accessibility guarantees */}
    </div>
  );
}
```

---

## 5. Section/Page Components

### Architecture
- **Page-level components**: [`src/pages/`](src/pages/) (e.g., `Index.tsx`)
- **Section components**: [`src/components/`](src/components/) (e.g., `Hero.tsx`, `Solution.tsx`, `Portfolio.tsx`)
- Each section is a standalone `<section>` with `id="section-name"` for scroll navigation

### Existing Sections
- [Hero.tsx](src/components/Hero.tsx) — Main hero with CTA
- [Problem.tsx](src/components/Problem.tsx) — Problem statement
- [Solution.tsx](src/components/Solution.tsx) — Services overview
- [Automation.tsx](src/components/Automation.tsx) — GHL automation details
- [Tracking.tsx](src/components/Tracking.tsx) — Analytics & tracking
- [Portfolio.tsx](src/components/Portfolio.tsx) — Case studies/work samples
- [Testimonials.tsx](src/components/Testimonials.tsx) — Client testimonials
- [FAQ.tsx](src/components/FAQ.tsx) — Frequent questions (Accordion)
- [ContactFormModal.tsx](src/components/ContactFormModal.tsx) — Contact form
- [FinalCTA.tsx](src/components/FinalCTA.tsx) — Bottom call-to-action

### Naming Convention
- Component files: PascalCase (e.g., `FeatureSection.tsx`)
- Section IDs: kebab-case (e.g., `id="feature-section"`)
- State hooks: camelCase (e.g., `const [isOpen, setIsOpen] = useState(false)`)

### Common Patterns

#### Section Container
```tsx
<section id="my-section" className="section-padding bg-background" aria-labelledby="section-heading">
  <div className="container-custom mx-auto">
    {/* Content */}
  </div>
</section>
```

#### Padding & Width
- **Vertical padding**: Use `section-padding` class = `py-20 md:py-28`
- **Horizontal container**: Use `container-custom` class = `max-w-6xl mx-auto`
- Always include `px-4 md:px-8` for mobile padding

#### Typography in Sections
```tsx
// Section header (all sections follow this pattern)
<div className="text-center max-w-3xl mx-auto mb-12">
  <span className="text-sm font-medium text-primary mb-4 inline-block">Label</span>
  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
    Heading <span className="gradient-text">with gradient</span>
  </h2>
  <p className="text-muted-foreground text-lg">{description}</p>
</div>
```

---

## 6. Styling Conventions

### Class Merging Utility
All components use the **`cn()` utility** ([src/lib/utils.ts](src/lib/utils.ts)):
```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This merges and deduplicates Tailwind classes intelligently. **Always use `cn()` when combining base and optional classes.**

```tsx
// ✅ CORRECT
<div className={cn("base-class p-4", className, "hover:bg-primary")}>
  Content
</div>

// ❌ AVOID
<div className="base-class p-4 {className} hover:bg-primary">
  Content
</div>
```

### Responsive Design
- **Mobile-first**: Base classes are mobile, use `md:`, `lg:`, `xl:` breakpoints
- **Breakpoints** (from Tailwind defaults):
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1400px (container default)

Example:
```tsx
<div className="w-full md:w-1/2 lg:w-1/3 text-sm md:text-base lg:text-lg">
  Content
</div>
```

### Spacing System
- Use Tailwind scale: `p-2`, `p-4`, `p-6`, `mb-8`, `gap-3`, `gap-6`, etc.
- **Never use** custom pixel values like `p-[13px]`
- Custom scale in tailwind.config only if not in default scale

### Dark Mode
- Applied via `.dark` class on `<html>` element (managed by ThemeContext)
- Always define color tokens that work in both light and dark
- Use semantic color tokens: `text-muted-foreground`, `bg-card`, etc.

---

## 7. Icons (lucide-react)

### Icon Usage
- **Library**: lucide-react at v0.462.0+
- **Default size**: 24px (w-6 h-6 in Tailwind)
- **Common sizes**:
  - Small icons: `w-4 h-4` (for inline text)
  - Default: `w-6 h-6` (buttons, navigation)
  - Large: `w-8 h-8` or `w-10 h-10` (hero sections)

### Import Pattern
```tsx
import { ArrowRight, Check, Code, Zap, BarChart3 } from 'lucide-react';

export function MyComponent() {
  return (
    <>
      <Button>
        Next Step
        <ArrowRight className="w-4 h-4" />
      </Button>
      
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
        <Code className="w-6 h-6 text-primary-foreground" />
      </div>
    </>
  );
}
```

### Available Icons (from codebase)
- Navigation: `ArrowRight`, `ChevronDown`, `Menu`, `X`
- UI: `Check`, `Star`, `Play`
- Services: `Code`, `Zap`, `BarChart3`, `Globe`, `BarChart3`
- Theme: `Sun`, `Moon`

**Never hardcode SVGs or use emoji.** Use lucide-react consistently.

---

## 8. Assets & Image Handling

### Asset Directory Structure
```
public/
  images/
    jla-profile.webp      (hero profile image)
    robots.txt
    sitemap.xml

src/
  assets/
    jl-digital-works-logo.webp
    floating-logo-banner.webp
    jla-profile.webp      (copy in src for bundling)
    portfolio/            (case study images)
```

### Image Loading Guidelines

#### Use `public/` for LCP Images (Critical Hero Images)
- **Reason**: Allows browser to preload via `<link rel="preload">` in index.html
- **Example**: Hero profile image in [Hero.tsx](src/components/Hero.tsx)
```tsx
// ✅ CORRECT: public path for preloading
const photo = '/images/jla-profile.webp';

// ❌ AVOID: Vite import (cannot be preloaded from HTML)
import photo from '@/assets/jla-profile.webp';
```

#### Use Vite Import for Non-Critical Assets
```tsx
import logo from '@/assets/jl-digital-works-logo.webp';
// Vite hashes and optimizes automatically
```

### Image Optimization Rules
1. **Format**: Use WebP exclusively (smaller, modern browser support)
2. **Aspect ratio**: Always define `aspect-ratio` via Tailwind or data attribute
3. **Loading state**: Provide skeleton/placeholder for images that load lazily
4. **Alt text**: Always include descriptive alt text
5. **Responsive sizes**: Define `srcSet` for multiple screen sizes when critical

Example with skeleton:
```tsx
const [imageLoaded, setImageLoaded] = useState(false);

return (
  <>
    {!imageLoaded && <HeroSkeleton />}
    <img
      src="/images/jla-profile.webp"
      alt="Jhun Lorenz profile"
      onLoad={() => setImageLoaded(true)}
      className={imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}
    />
  </>
);
```

---

## 9. Animations

### Defined Keyframes (tailwind.config.ts)
All animations are defined in Tailwind config. **Never use inline `@keyframes` styles.**

| Animation | Purpose | Duration |
|-----------|---------|----------|
| `fade-in-up` | Fade in with upward slide | 0.6s | 
| `fade-in` | Simple fade | 0.5s |
| `slide-in-right` | Slide in from right | 0.5s |
| `scale-in` | Scale up with fade | 0.4s |
| `accordion-down` / `accordion-up` | Accordion open/close | 0.2s |

### Usage Pattern
```tsx
<div className="animate-fade-in-up">
  {/* Fades in with upward motion */}
</div>

<button className="hover:scale-105 transition-transform duration-300">
  {/* Hover scale effect */}
</button>
```

### Transition Classes
- **Smooth transitions**: Add `transition-all` or `transition-colors`, `transition-transform`
- **Duration**: `duration-200`, `duration-300` (default 300ms)
- **Easing**: Use Tailwind defaults (ease, ease-in, ease-out)

Example (from Solution.tsx):
```tsx
<div className="hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
  Hover effect on border, shadow
</div>
```

---

## 10. Accessibility & Semantics

### Required Patterns
1. **Heading hierarchy**: Use proper `<h1>`, `<h2>`, `<h3>` (not just styled divs)
2. **Section landmarks**: Every major section should have `<section id="...">` with `aria-labelledby`
3. **Button semantics**: Use actual `<button>` or `<a>` elements; don't make divs clickable
4. **Label associations**: Form inputs paired with `<Label>` components
5. **ARIA attributes**: Use when needed:
   - `aria-labelledby="section-heading"` for section titles
   - `aria-label` for icon-only buttons
   - `role="group"` for related content

Example:
```tsx
<section id="hero" aria-labelledby="hero-heading">
  <h1 id="hero-heading">Main Heading</h1>
  <p>Description</p>
</section>

<Button aria-label="Close menu">
  <X className="w-6 h-6" />
</Button>
```

### Skip Navigation
Not currently in codebase, but if adding: provide a skip link to main content.

---

## 11. Form Handling

### Pattern: react-hook-form + Validation
```tsx
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', message: '' }
  });

  const onSubmit = async (data) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>
      <Button type="submit">Send</Button>
    </form>
  );
}
```

---

## 12. Theme Management

### Light/Dark Mode
Managed via [src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx):
- Theme state stored in localStorage
- `.dark` class applied to `<html>` element
- All color tokens auto-switch via CSS variables

### Usage in Components
```tsx
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}
```

**Do NOT**: Create custom theme logic. Use the existing provider.

---

## 13. Project Folder Organization

### Directory Structure & Conventions
```
src/
├─ pages/              # Full-page components (routed via React Router)
│  ├─ Index.tsx        # Main homepage
│  └─ NotFound.tsx
│
├─ components/         # Section & layout components
│  ├─ Hero.tsx         # Reusable section components
│  ├─ Solution.tsx
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ Portfolio.tsx
│  ├─ Testimonials.tsx
│  ├─ FAQ.tsx
│  ├─ ContactFormModal.tsx
│  └─ ui/              # shadcn/ui primitives (DO NOT EDIT)
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ input.tsx
│     └─ ... (50+ components)
│
├─ contexts/           # React Context providers
│  └─ ThemeContext.tsx
│
├─ hooks/              # Custom React hooks
│  ├─ useScrollAnimation.ts
│  ├─ useCalEmbed.ts
│  └─ use-toast.ts
│
├─ lib/                # Utilities & helpers
│  └─ utils.ts         # cn() utility for class merging
│
├─ assets/             # Static images, logos
│  └─ portfolio/       # Case study images
│
├─ App.tsx             # Root component with providers & routing
├─ main.tsx            # Entry point
└─ index.css           # Global styles & design tokens
```

### New Component Placement Rules
- **Section visible on homepage**: → `src/components/SectionName.tsx`
- **Reusable across sections**: → `src/components/SectionName.tsx` 
- **UI primitive (dialog, button variant, etc.)**: → `src/components/ui/...` (only if adding new to shadcn)
- **Page/route layout**: → `src/pages/PageName.tsx`
- **Custom hook**: → `src/hooks/useHookName.ts`
- **Context provider**: → `src/contexts/ContextName.tsx`

---

## 14. Code Patterns & Conventions

### Component Export Pattern
```tsx
// ✅ CORRECT
export const MyComponent = () => {
  return <div>{/* JSX */}</div>;
};

export default MyComponent;  // Optional for page components
```

### Using forwardRef for UI Components
```tsx
// ✅ CORRECT (all ui/ components must support refs)
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button className={cn("base", className)} ref={ref} {...props} />
  )
);
Button.displayName = "Button";
export { Button };
```

### useState Patterns
```tsx
// ✅ CORRECT
const [isOpen, setIsOpen] = useState(false);
const [activeTab, setActiveTab] = useState('products');
const [formData, setFormData] = useState({ name: '', email: '' });

// ❌ AVOID
const [open, setOpen] = useState(false);  // Ambiguous name
const isOpenState = useState(false);      // Non-standard naming
```

### Event Handlers
```tsx
// ✅ CORRECT naming
const handleClick = () => { /* ... */ };
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
const toggleMenu = () => { /* ... */ };

// ❌ AVOID
const doClick = () => { /* ... */ };
const changeInput = (e) => { /* ... */ };  // No type annotation
```

---

## 15. What Should NEVER Be Hardcoded

### 🚫 Hardcoded Values to Avoid

| Item | ❌ Avoid | ✅ Use Instead |
|------|----------|----------------|
| **Colors** | `bg-[#6A2EFF]`, `text-blue-600` | `bg-primary`, `text-destructive` |
| **Fonts** | Inline `font-family: "Arial"` | Tailwind `font-sans`, `font-display` |
| **Font sizes** | `<font size="14">` or `text-[14px]` | Tailwind scale `text-sm`, `text-lg` |
| **Spacing** | `padding: "13px"` or `p-[13px]` | Tailwind scale `p-4`, `p-6` |
| **Shadows** | Custom box-shadow rules | Tailwind `shadow-sm`, `shadow-lg`, or `shadow-primary/10` |
| **Border radius** | `border-radius: 12px` | Tailwind `rounded-lg`, `rounded-md` |
| **Z-index** | Arbitrary `z-[999]` | Tailwind scale `z-10`, `z-50` (if no token) |
| **SVGs** | Inline `<svg>` code | lucide-react icon component |
| **Animations** | `animation: "spin 1s linear infinite"` | Tailwind keyframes + `animate-` class |
| **Breakpoints** | Ad-hoc media queries | Tailwind responsive prefixes `md:`, `lg:`, `xl:` |

### Examples

#### ❌ WRONG
```tsx
<div style={{ color: '#6A2EFF', padding: '13px', fontSize: '14px' }}>
  <svg><!-- inline SVG --></svg>
</div>
```

#### ✅ CORRECT
```tsx
<div className="text-primary p-4 text-sm flex items-center gap-2">
  <Code className="w-4 h-4" />
</div>
```

---

## 16. Figma-to-Code Validation Checklist

Before marking a Figma design as "complete," verify:

### Component Structure
- [ ] All interactive elements use shadcn UI components or valid React elements
- [ ] No custom button, card, input, or form components created (reused existing)
- [ ] Icons from lucide-react (not hardcoded SVG or images)
- [ ] Proper semantic HTML: `<section>`, `<article>`, `<nav>`, `<button>`, `<label>`, etc.

### Styling & Design Tokens
- [ ] All colors use token classes (`text-primary`, `bg-secondary`, etc.) — no hex or rgb values
- [ ] All spacing uses Tailwind scale (`p-4`, `gap-6`, etc.) — no custom pixel values
- [ ] All text uses defined font families (`font-display`, `font-sans`)
- [ ] Font sizes from Tailwind scale (`text-sm`, `text-lg`, `text-3xl`)
- [ ] Dark mode CSS variables defined for all custom colors
- [ ] Opacity variations consistent: `opacity-50`, `hover:opacity-90`, `/80` for semantic grays

### Layout & Responsiveness
- [ ] Mobile-first: base classes are mobile sizes
- [ ] Responsive variants applied: `md:`, `lg:`, `xl:` breakpoints
- [ ] Container uses `container-custom` class (max-w-6xl) and `px-4 md:px-8`
- [ ] Sections use `section-padding` class for consistent vertical spacing
- [ ] Flexbox/Grid layout tested on mobile, tablet, desktop
- [ ] Images responsive with proper aspect ratios

### Accessibility
- [ ] All sections have `<h1>`, `<h2>`, etc. (not just styled divs)
- [ ] Buttons are `<button>` or `<a>` elements (not divs)
- [ ] Form inputs paired with `<Label>` components with `htmlFor` attribute
- [ ] Icon-only buttons have `aria-label`
- [ ] Images have descriptive `alt` text
- [ ] Section ids and `aria-labelledby` relationships validated
- [ ] Color contrast checked (WCAG AA minimum)

### Performance & Assets
- [ ] LCP images in `public/images/` with preload strategy
- [ ] Non-critical images imported from `src/assets/` or optimized
- [ ] All images in WebP format
- [ ] No unused imports or dead code
- [ ] Lazy-loading applied for Portal components (modals, toasts)

### Testing & Browser Support
- [ ] Tested light mode ✓ and dark mode ✓
- [ ] Tested on mobile (< 640px), tablet (768px), desktop (1024px+)
- [ ] Form validation works (error states visible)
- [ ] Hover and focus states visible
- [ ] Animations smooth (60fps, not janky)
- [ ] No console errors or warnings

### Code Quality
- [ ] No hardcoded colors, sizes, or fonts
- [ ] Component props properly typed (TypeScript)
- [ ] cn() utility used for className merging
- [ ] No inline styles except for dynamic data-driven values
- [ ] File follows naming conventions (PascalCase for components)
- [ ] No commented-out code left behind

### Documentation & Handoff
- [ ] Component comments explain complex logic
- [ ] Figma Code Connect mapping set up (if applicable)
- [ ] Any new design tokens documented in this file
- [ ] PR/commit message explains changes clearly

---

## 17. Common Patterns & Code Examples

### Pattern: Feature Card Component
```tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description,
  badges = []
}) {
  return (
    <Card className="group hover:shadow-lg hover:border-primary/40 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all">
            <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-display font-semibold text-foreground">{title}</h3>
              {badges.map((badge, i) => <Badge key={i}>{badge}</Badge>)}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button variant="ghost" className="text-primary">
          Learn more <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Pattern: Section with Header & Grid
```tsx
export function ServicesSection() {
  const services = [
    { title: 'Service 1', description: '...', icon: Code },
    { title: 'Service 2', description: '...', icon: Zap },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Description of services offered.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <FeatureCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Pattern: Responsive Navigation
```tsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-custom mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="font-display font-bold text-xl">Logo</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <a href="#home" className="text-foreground hover:text-primary transition">Home</a>
          <a href="#about" className="text-foreground hover:text-primary transition">About</a>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-2">
          <a href="#home" className="block text-foreground hover:text-primary">Home</a>
        </div>
      )}
    </nav>
  );
}
```

---

## 18. Performance Optimization Rules

### Lazy Loading Strategy
- Portal components (toast, modals) lazy-loaded in [App.tsx](src/App.tsx)
- Route-based code splitting via React Router (future)
- Image lazy loading with `loading="lazy"` for below-fold images

### CSS & Bundle Optimization
- Async CSS loading enabled (non-render-blocking stylesheets)
- Module preload for lazy chunks in Vite config
- Tailwind purges unused styles automatically

### LCP (Largest Contentful Paint)
- Hero image in `public/` with `<link rel="preload">` in HTML
- Placeholder skeleton shown until image loads (HeroSkeleton)
- Web fonts must be system fonts or preloaded

---

## 19. Figma-Specific Implementation Notes

### Code Connect Integration
When applicable, link Figma components to code:
1. Map Button variant in Figma to Button component in code
2. Map Card component to shadcn Card
3. Document in Figma file: "This maps to src/components/ui/button.tsx"

### Design-to-Dev Workflow
1. **Extract** spacing, colors, typography from Figma design tokens
2. **Map** to Tailwind classes (compare against tailwind.config.ts)
3. **Use existing** shadcn components; don't create new ones
4. **Test** light/dark mode in browser against Figma spec
5. **Validate** responsive layouts at all breakpoints
6. **Submit** for review with accessibility checklist

---

## 20. Quick Reference: File Locations

| Feature | File |
|---------|------|
| Design tokens (colors, spacing, fonts) | [src/index.css](src/index.css), [tailwind.config.ts](tailwind.config.ts) |
| UI components (button, card, input, etc.) | [src/components/ui/](src/components/ui/) |
| Section components | [src/components/](src/components/) |
| Global styles | [src/index.css](src/index.css) |
| Theme context | [src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx) |
| Utility functions | [src/lib/utils.ts](src/lib/utils.ts) |
| Page routes | [src/pages/](src/pages/) |
| Images & assets | [public/images/](public/images/), [src/assets/](src/assets/) |
| Vite config | [vite.config.ts](vite.config.ts) |
| TypeScript config | [tsconfig.json](tsconfig.json) |

---

## Version & Maintenance

**Last Updated**: March 11, 2026  
**Codebase Version**: React 18+ / Vite / Tailwind v3 / shadcn/ui (current)  
**Created for**: JL Digital Works portfolio & services site

### Future Additions to Document As Needed
- A/B testing strategy
- Analytics integration patterns
- API client setup (if adding backend)
- E-commerce patterns (if scaling)

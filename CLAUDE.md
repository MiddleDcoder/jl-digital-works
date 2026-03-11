# JL Digital Works - Figma-to-Code Integration Rules

**Purpose**: Comprehensive guide for AI-assisted Figma design-to-code conversion using Model Context Protocol (MCP).

---

## 1. DESIGN SYSTEM STRUCTURE

### 1.1 Token Definitions

#### Location & Format
All design tokens are defined as **HSL CSS variables** in [`src/index.css`](src/index.css) and referenced in [`tailwind.config.ts`](tailwind.config.ts).

#### Light Mode Tokens (`:root`)
```css
--background: 0 0% 100%;              /* White */
--foreground: 0 0% 10%;               /* Near black text */
--card: 0 0% 98%;                     /* Card backgrounds */
--primary: 252 100% 55%;              /* Purple #6A2EFF */
--primary-foreground: 0 0% 100%;      /* White on primary */
--secondary: 0 0% 96%;                /* Light gray */
--accent: 252 100% 65%;               /* Brighter purple */
--destructive: 0 84.2% 60.2%;         /* Red */
--border: 0 0% 90%;                   /* Border gray */
--input: 0 0% 90%;                    /* Input backgrounds */
--muted: 0 0% 96%;                    /* Muted text background */
--muted-foreground: 0 0% 38%;         /* Muted text color */
--ring: 252 100% 65%;                 /* Focus ring (accent) */
--radius: 0.75rem;                    /* Default border radius */
--section-alt: 0 0% 96%;              /* Section alternating bg */
```

#### Dark Mode Tokens (`.dark` class)
```css
.dark {
  --background: 0 0% 6%;              /* Almost black */
  --foreground: 0 0% 92%;             /* Near white text */
  --card: 0 0% 11%;                   /* Dark card background */
  --primary: 252 100% 65%;            /* Brighter purple in dark */
  --secondary: 0 0% 15%;              /* Dark gray */
  --border: 0 0% 20%;                 /* Dark border */
  --muted-foreground: 0 0% 60%;       /* Lighter muted text */
}
```

#### Token Transformation System
Tailwind automatically converts HSL variables to colors via [`tailwind.config.ts`](tailwind.config.ts):
```typescript
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... other token mappings
}
```

### 1.2 Token Usage Rules

**REQUIRED**: Always use semantic color tokens, NEVER hardcode hex/RGB values.

✅ **Correct**:
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click Me
</button>
<div className="text-destructive">Error message</div>
<input className="border border-input bg-background" />
```

❌ **Incorrect**:
```tsx
<button className="bg-[#6A2EFF] text-white hover:bg-purple-600">
  Click Me
</button>
<div className="text-[#E74C3C]">Error message</div>
```

### 1.3 Color Palette Reference

| Usage | Light | Dark | CSS Variable |
|-------|-------|------|--------------|
| **Primary Action** | HSL(252, 100%, 55%) #6A2EFF | HSL(252, 100%, 65%) | `--primary` |
| **Primary Text** | White | White | `--primary-foreground` |
| **Accent/Hover** | HSL(252, 100%, 65%) | HSL(252, 100%, 65%) | `--accent` |
| **Background** | White | HSL(0, 0%, 6%) | `--background` |
| **Foreground Text** | HSL(0, 0%, 10%) | HSL(0, 0%, 92%) | `--foreground` |
| **Card Background** | HSL(0, 0%, 98%) | HSL(0, 0%, 11%) | `--card` |
| **Border** | HSL(0, 0%, 90%) | HSL(0, 0%, 20%) | `--border` |
| **Destructive/Error** | HSL(0, 84.2%, 60.2%) | HSL(0, 62.8%, 30.6%) | `--destructive` |
| **Muted Text** | HSL(0, 0%, 38%) | HSL(0, 0%, 60%) | `--muted-foreground` |

---

## 2. COMPONENT LIBRARY

### 2.1 Component Architecture

**Location**: [`src/components/ui/`](src/components/ui/)

All UI components follow the **shadcn/ui pattern**:
- Built on **Radix UI primitives** (headless, unstyled)
- Styled with **Tailwind CSS only** (no inline styles)
- Exported as composable sub-components
- Use **CVA (class-variance-authority)** for variant management

### 2.2 Core Components & Variants

#### Button Component
**File**: [`src/components/ui/button.tsx`](src/components/ui/button.tsx)

```typescript
// Variants: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
// Sizes: "default" | "sm" | "lg" | "icon"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
  },
);
```

✅ **Usage Examples**:
```tsx
import { Button } from "@/components/ui/button";

<Button>Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="link">Link Style</Button>
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon"><Icon className="w-4 h-4" /></Button>
```

#### Card Component
**File**: [`src/components/ui/card.tsx`](src/components/ui/card.tsx)

Composite component with sub-parts:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Footer actions */}
  </CardFooter>
</Card>
```

**Styling**: Automatically inherits `bg-card text-card-foreground border rounded-lg shadow-sm`

#### Form Components

Available components:
- **Input** [`src/components/ui/input.tsx`](src/components/ui/input.tsx) - Text, email, password fields
- **Textarea** [`src/components/ui/textarea.tsx`](src/components/ui/textarea.tsx) - Multi-line text
- **Label** [`src/components/ui/label.tsx`](src/components/ui/label.tsx) - Form labels
- **Checkbox** [`src/components/ui/checkbox.tsx`](src/components/ui/checkbox.tsx) - Boolean inputs
- **Radio Group** [`src/components/ui/radio-group.tsx`](src/components/ui/radio-group.tsx) - Single selection
- **Select** [`src/components/ui/select.tsx`](src/components/ui/select.tsx) - Dropdown selection

**Validation Pattern**:
```tsx
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof formSchema>;

export function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

#### Dialog/Modal Component
**File**: [`src/components/ui/dialog.tsx`](src/components/ui/dialog.tsx)

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogDescription>Optional description</DialogDescription>
    </DialogHeader>
    {/* Modal content */}
  </DialogContent>
</Dialog>
```

#### Additional UI Components
- Accordion, Alert, Avatar, Badge, Breadcrumb, Calendar, Carousel, Checkbox, Collapsible, Command, ContextMenu, Drawer, DropdownMenu, HoverCard, Menubar, NavigationMenu, Pagination, Popover, Progress, ScrollArea, Separator, Sheet, Sidebar, Skeleton, Slider, Switch, Table, Tabs, Toggle, ToggleGroup, Tooltip

All located in [`src/components/ui/`](src/components/ui/)

### 2.3 Component Composition Rules

**Pattern**: Always compose from shadcn/ui base components. NEVER create custom Button, Card, or Input wrappers.

✅ **Correct**:
```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SearchForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Search..." />
        <Button>Search</Button>
      </CardContent>
    </Card>
  );
}
```

❌ **Incorrect** - Don't create wrapper components:
```tsx
// ❌ WRONG: Never create CustomButton
const CustomButton = ({ children }) => (
  <button className="bg-primary px-4 py-2">{children}</button>
);
```

---

## 3. FRAMEWORKS & LIBRARIES

### 3.1 Core Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **TypeScript** | 5.8.3 | Type safety |
| **Tailwind CSS** | 3.4.17 | Utility-first styling |
| **Vite** | 5.4.19 | Build tool & bundler |
| **shadcn/ui** | Latest | UI component library |
| **Radix UI** | Latest | Headless primitives |
| **lucide-react** | 0.462.0 | Icon library |
| **react-router-dom** | 7.12.0 | Client-side routing |
| **react-hook-form** | 7.61.1 | Form state management |
| **zod** | 3.25.76 | Schema validation |
| **next-themes** | 0.3.0 | Theme provider |
| **Class Variance Authority** | 0.7.1 | Component variant management |

### 3.2 Build & Development

#### Vite Configuration
**File**: [`vite.config.ts`](vite.config.ts)

Key features:
- **React SWC plugin** for fast compilation
- **Async CSS plugin** - converts render-blocking CSS to non-blocking using media="print" + onload
- **Module preload plugin** - injects `<link rel="modulepreload">` for lazy chunks

#### Development Server
```bash
bun run dev      # Start dev server (Vite HMR)
bun run build    # Production build
bun run preview  # Preview production build locally
```

#### JavaScript Module System
- **Type**: `"module"` (ESM only)
- All imports use ES6 syntax
- All components are tree-shakeable

### 3.3 Styling Architecture

#### Utility Function: `cn()`
**File**: [`src/lib/utils.ts`](src/lib/utils.ts)

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Purpose**: Intelligently merge Tailwind classes while avoiding conflicts.

✅ **Usage**:
```tsx
import { cn } from "@/lib/utils";

<div className={cn("px-4 py-2", isActive && "bg-primary", disabled && "opacity-50")}>
  Content
</div>

// In component variants:
<Card className={cn("border-2", variant === "highlight" && "border-primary")} />
```

#### Tailwind CSS Configuration
**File**: [`tailwind.config.ts`](tailwind.config.ts)

**Key Extensions**:
```typescript
{
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],      // Body text
        display: ["Space Grotesk", "system-ui", "sans-serif"], // Headings
      },
      colors: {
        // All colors mapped to CSS variables (see Design Tokens)
      },
      keyframes: {
        "accordion-down": { ... },
        "fade-in-up": { ... },
        "fade-in": { ... },
        "slide-in-right": { ... },
        "scale-in": { ... },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "slide-in-right": "slide-in-right 0.5s ease forwards",
        "scale-in": "scale-in 0.4s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 3.4 Dependency Highlights

#### Class Management
- **clsx** - Conditional class composition
- **tailwind-merge** - Intelligent Tailwind class merging

#### Form & Validation
- **react-hook-form** - Lightweight form state
- **@hookform/resolvers** - Bridge between form and schema validation
- **zod** - TypeScript-first schema validation

#### Component Primitives
- **@radix-ui/react-*** (20+ packages) - Unstyled, accessible primitives
- **class-variance-authority** - Type-safe component variants

#### Animation
- **tailwindcss-animate** - Pre-built Tailwind animations
- Custom keyframes in tailwind.config.ts

#### UI Enhancements
- **embla-carousel-react** - Carousel component
- **sonner** - Toast notifications
- **date-fns** - Date utilities
- **recharts** - Charting library

---

## 4. ASSET MANAGEMENT

### 4.1 Asset Storage & Organization

```
public/
  images/              ← LCP & critical images (preloadable)
    jla-profile.webp
    hero-bg.webp

src/
  assets/
    portfolio/         ← Non-critical portfolio images
      james-christian-preview.webp
      vampire-facelifts-preview.webp
      wizard-tower-preview.webp
      ...
```

### 4.2 Image & Asset Strategy

#### Critical Assets (Hero/LCP)
- **Location**: `public/images/`
- **Format**: WebP only
- **Strategy**: Preloaded via HTML `<link rel="preload">`
- **Loading**: `loading="eager"` + `onLoad` listener for skeleton placeholder

**Example**:
```tsx
const photo = '/images/jla-profile.webp';  // Public path for preloading

<img
  src={photo}
  alt="Description"
  width="400"
  height="460"
  loading="eager"
  onLoad={() => setImageLoaded(true)}
  className="rounded-3xl shadow-2xl"
/>
```

#### Non-Critical Assets (Portfolio, etc.)
- **Location**: `src/assets/portfolio/` (imported as modules)
- **Format**: WebP only
- **Strategy**: Lazy loading (imported once, loads when scrolled into view)
- **Hashing**: Vite automatically hashes filenames in production

**Example**:
```tsx
import projectImg from '@/assets/portfolio/project-preview.webp';

<img src={projectImg} alt="Project preview" className="rounded-lg" />
```

### 4.3 Asset Optimization

#### Vite Optimization
1. **Image hashing** - Filenames include content hash (cache busting)
2. **Code splitting** - CSS and JS split into separate chunks
3. **Async CSS** - Non-critical CSS made async via media="print"+onload
4. **Module preload** - Lazy chunks detected and preloaded

#### Image Guidelines
- **Format**: WebP for all images (best compression)
- **Dimensions**: Set explicit width/height to prevent CLS
- **Responsive**: Use `srcSet` for multiple densities if needed
- **Placeholders**: Show skeleton loaders while LCP images load

### 4.4 CDN Configuration
No CDN configuration in place. All assets served from origin with Vite's hashing and HTTP caching.

**Future**: Add Netlify CDN or similar if performance requires it.

---

## 5. ICON SYSTEM

### 5.1 Icon Library

**Library**: `lucide-react` (v0.462.0)

All icons automatically styled to 4rem (16px default size, configurable).

### 5.2 Icon Usage Pattern

```tsx
import { ArrowRight, Play, Star, Code, Zap, BarChart3, Mail, Send, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// Default size (24px via lucide-react internals, adjustable via className)
<Code className="w-4 h-4" />      // Small icon (16px)
<Code className="w-5 h-5" />      // Default (20px)
<Code className="w-6 h-6" />      // Medium (24px)
<Code className="w-8 h-8" />      // Large (32px)

// With text (common pattern in buttons/badges)
<div className="flex items-center gap-2">
  <Code className="w-4 h-4" />
  <span>Web Design & Dev</span>
</div>
```

### 5.3 Icon Naming & Conventions

**Pattern**: Use kebab-case import names from lucide-react.

✅ **Correct**:
```tsx
import { ArrowRight, ExternalLink, CheckCircle } from 'lucide-react';

<ArrowRight className="w-5 h-5" />
<ExternalLink className="w-4 h-4" />
```

❌ **Avoid**:
```tsx
// ❌ Never use custom SVG imports or hardcoded SVGs
import CustomIcon from './custom-icon.svg';

// ❌ Never create custom icon components
const MyIcon = () => <svg>...</svg>;
```

### 5.4 Common Icons Used

| Icon | Import | Use Case |
|------|--------|----------|
| ArrowRight | `ArrowRight` | CTA buttons, forward navigation |
| ExternalLink | `ExternalLink` | External links |
| Play | `Play` | Video/demo play button |
| Star | `Star` | Ratings, favorites |
| Code | `Code` | Web development badge |
| Zap | `Zap` | Speed/automation badge |
| BarChart3 | `BarChart3` | Analytics badge |
| Mail | `Mail` | Email/contact |
| Send | `Send` | Submit button |
| Check­Circle | `CheckCircle` | Success state |
| AlertCircle | `AlertCircle` | Error/warning |
| Loader2 | `Loader2` | Loading state |
| X | `X` | Close button |

### 5.5 Icon Color & Styling

Icons inherit Tailwind text color classes. Use flexbox alignment for icon+text combinations.

```tsx
// Icon inherits text color from parent
<div className="text-primary">
  <Code className="w-5 h-5" />  {/* Purple via parent */}
</div>

// Alternative: explicit color
<Code className="w-5 h-5 text-destructive" />
```

---

## 6. STYLING APPROACH

### 6.1 CSS Methodology

**Framework**: Tailwind CSS (utility-first)

**Key Features**:
- All styles applied via Tailwind utility classes
- NO custom CSS stylesheets for component-specific styles
- Global styles in [`src/index.css`](src/index.css) only for @layer directives and CSS variables

### 6.2 Global Styles

**File**: [`src/index.css`](src/index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Color tokens as CSS variables */
  }
  
  .dark {
    /* Dark mode token overrides */
  }
  
  * {
    @apply border-border;  /* Default border color */
  }
}
```

### 6.3 Custom Utility Classes

The codebase uses **minimal custom utilities**. All custom behavior comes from Tailwind's built-in utilities or shadcn/ui components.

**Common Tailwind Extensions** (from tailwind.config.ts):
```typescript
// Custom animations
animation: {
  "fade-in-up": "fade-in-up 0.6s ease forwards",
  "fade-in": "fade-in 0.5s ease forwards",
  "slide-in-right": "slide-in-right 0.5s ease forwards",
  "scale-in": "scale-in 0.4s ease forwards",
}

// Border radius token
borderRadius: {
  lg: "var(--radius)",              // 0.75rem
  md: "calc(var(--radius) - 2px)",  // 0.625rem
  sm: "calc(var(--radius) - 4px)",  // 0.5rem
}
```

### 6.4 Responsive Design

Tailwind breakpoints (configured in [`tailwind.config.ts`](tailwind.config.ts)):

```typescript
screens: {
  "2xl": "1400px",  // Desktop large
  // Defaults: sm (640px), md (768px), lg (1024px), xl (1280px)
}
```

**Mobile-first approach**: Start with mobile styles, add responsive prefixes.

✅ **Correct**:
```tsx
// Mobile by default, then larger screens
<h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
  Responsive Headline
</h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column mobile, 2 on tablet, 3 on desktop */}
</div>
```

### 6.5 Common Tailwind Patterns

#### Spacing
Uses Tailwind scale: `p-4`, `mb-6`, `gap-8`, `space-y-4`

**Scale**: 0px (0), 4px (1), 8px (2), 12px (3), 16px (4), 20px (5), 24px (6), 28px (7), 32px (8), ...

#### Flexbox & Grid
```tsx
{/* Flexbox */}
<div className="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>

{/* Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <div key={item.id}>{item}</div>)}
</div>
```

#### Shadows & Effects
```tsx
<div className="shadow-sm">Subtle shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-2xl shadow-primary/25">Color shadow</div>
```

#### Hover & State
```tsx
<button className="bg-primary hover:bg-primary/90 transition-all active:scale-95">
  Button
</button>

<div className="opacity-50 hover:opacity-100 transition-opacity">
  Hover effect
</div>
```

#### Animation
```tsx
<div className="animate-fade-in-up">Fade in when mounted</div>
<div className="animate-pulse">Pulsing animation</div>
<div className="animate-spin">Spinning loader</div>
```

### 6.6 Dark Mode Implementation

**Theme System**: React Context-based (stored in localStorage)

**File**: [`src/contexts/ThemeContext.tsx`](src/contexts/ThemeContext.tsx)

```tsx
// Toggle theme
const { theme, toggleTheme } = useTheme();

// Automatically applies .dark class to <html>
// Dark mode CSS variables override light mode via .dark selector
```

**In components**:
```tsx
// No need to check theme - styles automatically adapt
<div className="bg-background text-foreground">
  Content adapts to light/dark mode automatically
</div>
```

---

## 7. PROJECT STRUCTURE

### 7.1 Directory Organization

```
/src
  ├── App.tsx              # Main app component
  ├── main.tsx             # React root
  ├── index.css            # Global styles & CSS variables
  ├── vite-env.d.ts        # Vite env types
  │
  ├── components/
  │   ├── [Section].tsx    # Page sections (Hero, Portfolio, etc.)
  │   ├── [Feature].tsx    # Feature components (ContactFormModal, FAQ, etc.)
  │   └── ui/              # shadcn/ui base components (don't edit these)
  │       ├── button.tsx
  │       ├── card.tsx
  │       ├── input.tsx
  │       └── ... (20+ more)
  │
  ├── contexts/
  │   └── ThemeContext.tsx # Light/dark theme via React Context
  │
  ├── hooks/
  │   ├── useScrollAnimation.ts  # Intersection observer for fade-in effects
  │   ├── useCalEmbed.ts         # Cal.com embedding logic
  │   └── use-toast.ts           # Toast notification hook (from sonner)
  │
  ├── lib/
  │   └── utils.ts         # Utility functions (cn() for Tailwind merging)
  │
  ├── pages/
  │   ├── Index.tsx        # Main landing page (default route)
  │   └── NotFound.tsx     # 404 page
  │
  └── assets/
      ├── portfolio/       # Portfolio project images
      └── [other assets]
```

### 7.2 Page Structure (Single Page App)

**Route**: `/` → [`src/pages/Index.tsx`](src/pages/Index.tsx)

Single page divided into sections:
1. **Hero** - Main headline, CTA, profile image
2. **Problem** - Client pain points
3. **Solution** - What I offer
4. **Automation** - GoHighLevel systems
5. **Tracking** - Analytics & measurement
6. **Portfolio** - Case studies
7. **Testimonials** - Social proof
8. **FAQ** - Common questions
9. **Contact** - Final CTA modal
10. **Footer** - Links & info

Each section is a separate component in [`src/components/`](src/components/).

### 7.3 Component Organization Pattern

**Naming Convention**: 
- Page sections: PascalCase (e.g., `Hero.tsx`, `Portfolio.tsx`)
- Feature components: PascalCase (e.g., `ContactFormModal.tsx`, `FAQ.tsx`)
- UI primitives: lowercase with hyphens (e.g., `button.tsx`, `card.tsx`)

**Imports in sections**:
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
```

### 7.4 Routing (React Router v6)

**Config Ready** - React Router v6 is installed but currently using single-page scroll.

**Future**: Can add routes to additional pages (e.g., `/blog`, `/about`) using:
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 7.5 Feature Organization

**Data Organization**: Hardcoded data in components (portfolio projects, FAQ items)

✅ **Pattern**:
```tsx
// Project data at top of component
const projects = [
  {
    title: "Project Name",
    description: "...",
    url: "...",
    thumbnail: projectImg,
  },
];

// Component uses data
export function Portfolio() {
  return (
    <section>
      {projects.map(project => (
        // Render project
      ))}
    </section>
  );
}
```

### 7.6 Configuration Files

| File | Purpose |
|------|---------|
| [`vite.config.ts`](vite.config.ts) | Vite build configuration, async CSS & modulepreload plugins |
| [`tailwind.config.ts`](tailwind.config.ts) | Tailwind theme extension, animations, colors |
| [`components.json`](components.json) | shadcn/ui configuration (Tailwind path, aliases) |
| [`tsconfig.json`](tsconfig.json) | TypeScript compiler options |
| [`tsconfig.app.json`](tsconfig.app.json) | App-specific TS config |
| [`tsconfig.node.json`](tsconfig.node.json) | Build tool TS config |
| [`postcss.config.js`](postcss.config.js) | PostCSS + Tailwind CSS |
| [`eslint.config.js`](eslint.config.js) | Linting rules |
| [`index.html`](index.html) | HTML entry point (preload hints, preconnect) |

---

## 8. DESIGN-TO-CODE INTEGRATION RULES

### 8.1 Code Connect Mapping Strategy

When integrating Figma designs using Code Connect MCP:

1. **Component Identification**
   - Identify UI type (Button, Card, Form, Dialog, etc.)
   - Check if shadcn/ui equivalent exists
   - Map to existing component in [`src/components/ui/`](src/components/ui/)

2. **Token Mapping**
   - Extract colors from Figma → Map to CSS variables
   - Extract spacing → Map to Tailwind scale
   - Extract typography → Map to font-family + text utilities

3. **Variant Detection**
   - Button states (default, hover, active, disabled) → CVA variants
   - Card layouts → Existing Card + sub-components
   - Form inputs → Existing Input/Textarea/Select

4. **Code Generation**
   - Generate TSX using shadcn/ui components as base
   - Apply Tailwind classes for styling
   - Use `cn()` utility for conditional classes
   - Import icons from lucide-react only

### 8.2 Validation Checklist for Figma → Code

- [ ] All colors use token classes (not hex/rgb)
- [ ] All sizing uses Tailwind scale (not arbitrary px)
- [ ] All fonts apply font-display or font-sans
- [ ] All icons imported from lucide-react
- [ ] No inline styles (except dynamic data)
- [ ] No custom Button/Card/Input wrappers
- [ ] Responsive behavior uses Tailwind breakpoints
- [ ] Form validation uses zod + react-hook-form
- [ ] Animations use tailwind.config keyframes
- [ ] Accessibility: proper semantic HTML, ARIA labels

### 8.3 Responsive Design Rules for Figma

When translating Figma breakpoints:
- **Mobile** (< 640px) = default Tailwind classes
- **Tablet** (640px - 1024px) = `md:` and `lg:` prefixes
- **Desktop** (> 1024px) = `lg:` and `xl:` prefixes

Example mobile-first adaptation:
```tsx
// Mobile: 16px text, full width
// Tablet: 20px text, 2 columns
// Desktop: 24px text, 3 columns

<div className="text-base md:text-lg lg:text-2xl">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid adapts to screen size */}
</div>
```

---

## 9. PERFORMANCE GUIDELINES

### 9.1 Image Optimization
- **LCP images**: Place in `public/images/`, preload in HTML, show skeleton while loading
- **Non-critical images**: Store in `src/assets/`, lazy load
- **Format**: WebP only
- **Dimensions**: Set explicit width/height to prevent CLS

### 9.2 Code Splitting
- Vite automatically splits async chunks
- Use dynamic imports for route-based code splitting
- Module preload plugin auto-injects for lazy chunks

### 9.3 CSS Optimization
- Async CSS plugin converts render-blocking CSS to non-blocking
- Tailwind purges unused utilities in production build
- Critical above-the-fold CSS inlined in index.html

### 9.4 Accessibility (a11y)
- Use semantic HTML (h1-h6, section, article, main, etc.)
- Include `aria-labelledby`, `aria-describedby`, `role` attributes
- Form labels with proper `<label>` elements
- Icon buttons include accessible labels via `aria-label`
- Color not sole indicator of state/meaning

---

## 10. QUICK REFERENCE: DO's & DON'Ts

### DO ✅
- Use shadcn/ui components as base building blocks
- Apply Tailwind utility classes for styling
- Use CSS variable token names (e.g., `bg-primary`, `text-muted-foreground`)
- Import icons from lucide-react
- Use `cn()` utility for conditional class merging
- Organize components by feature/section
- Use React Context for global state (theme)
- Validate forms with zod + react-hook-form
- Add accessibility attributes (aria-*, semantic HTML)
- Store critical images in `public/images/`, others in `src/assets/`
- Use font-display for headings, font-sans for body
- Apply responsive classes: `md:`, `lg:`, `xl:` breakpoints
- Use animation keyframes from tailwind.config.ts

### DON'T ❌
- Hardcode colors (hex, rgb, named colors)
- Create custom Button, Card, Input wrappers
- Use inline `<style>` tags or CSS-in-JS
- Import SVGs instead of lucide-react icons
- Use arbitrary Tailwind values (`bg-[#6A2EFF]`)
- Create custom z-index values (use Tailwind scale)
- Use inline styles for CSS properties (only for dynamic data)
- Import images from `src/` for critical LCP images
- Use non-WebP image formats
- Override token colors without good reason
- Nest custom CSS in component files
- Extract utility classes into custom selectors

---

## 11. REFERENCES & KEY FILES

### Design System
- Colors & tokens: [`src/index.css`](src/index.css)
- Tailwind config: [`tailwind.config.ts`](tailwind.config.ts)
- Theme provider: [`src/contexts/ThemeContext.tsx`](src/contexts/ThemeContext.tsx)

### Components
- UI components: [`src/components/ui/`](src/components/ui/)
- Section components: [`src/components/`](src/components/) (Hero, Portfolio, etc.)
- Layout utilities: [`src/lib/utils.ts`](src/lib/utils.ts)

### Configuration
- Vite: [`vite.config.ts`](vite.config.ts)
- shadcn/ui: [`components.json`](components.json)
- ESLint: [`eslint.config.js`](eslint.config.js)

### Pages & Assets
- Landing page: [`src/pages/Index.tsx`](src/pages/Index.tsx)
- Assets: [`src/assets/`](src/assets/) and [`public/images/`](public/images/)

---

## 12. WORKFLOW FOR FIGMA → CODE CONVERSION

### Step 1: Analyze Figma Design
- Extract component type (Button, Card, Form, Dialog, etc.)
- Document color tokens used
- Note typography (heading vs. body)
- Identify responsive breakpoints
- List interactive states (hover, active, focus, disabled)

### Step 2: Map to Code
- Find matching shadcn/ui component
- Apply Tailwind classes from design
- Map Figma colors to CSS variables
- Set responsive breakpoints using Tailwind prefixes

### Step 3: Generate TSX
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Use component composition pattern
export function DesignComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">Description</p>
        <Button>
          Action
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Step 4: Validation
- [ ] All colors use token classes
- [ ] All sizing uses Tailwind scale
- [ ] Icons from lucide-react
- [ ] Responsive classes applied
- [ ] Accessibility attributes included
- [ ] No inline styles for static properties

### Step 5: Testing
- Test in light/dark mode
- Verify responsive behavior (mobile, tablet, desktop)
- Check accessibility (keyboard nav, screen readers)
- Ensure animations perform well

---

**Last Updated**: March 2025
**Framework**: React 18 + TypeScript + Tailwind CSS + shadcn/ui
**Build Tool**: Vite 5.4

# JL Digital Works

A modern, conversion-focused portfolio and service website for JL Digital Works. This project showcases expertise in web design, GoHighLevel automation, and analytics tracking, with a strong focus on helping businesses turn visitors into leads and measurable growth.

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white) ![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss&logoColor=white)

## Project Overview

JL Digital Works is a personal brand and freelance consulting website built to present a clear value proposition: high-converting websites, automation systems, and tracking infrastructure that help businesses operate more efficiently and make smarter marketing decisions.

The site is designed to communicate trust, expertise, and measurable outcomes through a polished single-page experience.

## Technology Stack

This project is built with:

- Vite for fast development and builds
- React 18 for the user interface
- TypeScript for safer component development
- Tailwind CSS for responsive styling
- shadcn/ui for reusable UI primitives
- Lucide React for icons
- React Router for client-side navigation
- ESLint and Vite build tooling for code quality and production validation

## Architecture

The application follows a modular, component-based architecture centered around a marketing landing page experience:

- A main entry page in [src/pages/Index.tsx](src/pages/Index.tsx)
- Reusable sections such as hero, services, automation, tracking, portfolio, testimonials, FAQ, and contact in [src/components](src/components)
- Shared state and theme logic in [src/contexts](src/contexts)
- Custom hooks in [src/hooks](src/hooks)
- Utility functions and styling helpers in [src/lib](src/lib)

The page uses lazy-loaded sections to improve initial load performance while keeping the experience smooth and modern.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone <your-repository-url>
cd jl-digital-works
npm install
```

### Development

```bash
npm run dev
```

The development server will start locally and provide a preview URL in the terminal.

### Production Build

```bash
npm run build
```

## Project Structure

```text
src/
  components/     # Page sections and reusable UI blocks
  contexts/       # Theme and app-level context providers
  hooks/          # Custom React hooks
  lib/            # Helper functions and shared utilities
  pages/          # Route-level page components
  assets/         # Images and local assets
public/           # Static files and site assets
```

## Key Features

- Conversion-focused landing page experience
- Clear presentation of web design, automation, and analytics services
- Portfolio section highlighting completed work
- FAQ and contact flow for lead generation
- Accessible, responsive UI designed for desktop and mobile
- Performance-conscious architecture with lazy-loaded content

## Development Workflow

The project is maintained as a front-end experience with a focus on iterative UI improvements and fast delivery. Typical workflow includes:

1. Implement or update sections in [src/components](src/components)
2. Run the local development server
3. Validate changes with linting and build checks
4. Review responsiveness and accessibility before deployment

## Coding Standards

The codebase favors:

- Clear, component-based structure
- TypeScript for stronger reliability
- Reusable UI components instead of duplicated markup
- Accessible markup and semantic section structure
- Responsive design patterns that work across screen sizes

## Testing

The current workflow emphasizes build validation and manual review rather than a dedicated automated test suite. The main verification steps are:

```bash
npm run lint
npm run build
```

## Contributing

Contributions are welcome when they improve the quality, clarity, or functionality of the site. If you plan to contribute, please:

- Keep changes focused and well-documented
- Preserve the existing component structure and styling approach
- Maintain responsive behavior and accessibility
- Validate the app with linting and builds before submitting changes

## License

No dedicated license file is currently included in the repository.

## Live Site

Visit: https://jldigitalworks.com


---
trigger: always_on
description: Rules for HeroUI, Tailwind CSS v4, Framer Motion, and design system consistency
---

---
name: UI & Styling Standards
description: Rules for HeroUI, Tailwind CSS v4, Framer Motion animations, and design consistency
---

# UI & Styling Standards

## Design System

### Colors
Colors are defined in `tailwind.config.ts` and used as Tailwind utility classes. Never hardcode hex values in components.

| Tailwind Class | Usage |
|---|---|
| `bg-background` | Page background |
| `bg-content1` | Cards, panels |
| `bg-primary` / `text-primary` | All interactive elements, CTAs, highlights |
| `bg-secondary` / `text-secondary` | Sparingly — small decorative moments only, never buttons |
| `text-foreground` | Primary text |
| `text-default-500` | Muted text, labels, hints |

**Rule:** Use `bg-primary` and `text-primary` for all interactive elements. Never hardcode `#7C6FF7` or any other color directly in a component.

### Spacing & Layout
- Use Tailwind's built-in spacing scale only — no arbitrary values like `w-[40px]` or `mt-[13px]`
- Standard content container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Section vertical spacing: `py-16 md:py-24`
- Card padding: `p-6`
- Gap between grid items: `gap-6`

---

## Component Rules

### HeroUI First
- Always check if HeroUI has a component before building one from scratch
- Use HeroUI for: Button, Input, Textarea, Modal, Drawer, Card, Badge, Tabs, Tooltip, Chip, Spinner, Skeleton
- Import always from `@heroui/react`

### Composite Components
- Live in `src/components/composite/`
- Are wrappers around HeroUI that receive only data or a function — no raw HeroUI imports in page-level components
- Name files in kebab-case: `score-input.tsx`, `move-card.tsx`

### Mobile First
- Design for mobile first. Use `md:` and `lg:` breakpoints for desktop adjustments
- Every layout must work at 375px width

---

## Framer Motion Rules

Use Framer Motion for all animations. Do not use CSS transitions on interactive or visible elements.

### Define variants once in `src/lib/animations.ts` and import them everywhere

```typescript
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
}

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 }
    }
}

export const pageTransition = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: 'easeOut' }
    }
}
```

### Animation Rules
- **Page entry:** wrap main content in `motion.div` with `pageTransition` variants
- **Scroll reveals:** use `whileInView` with `viewport={{ once: true }}` — never re-animate on scroll up
- **Card lists:** wrap in `staggerContainer`, each card uses `fadeInUp`
- **Card hover:** `whileHover={{ scale: 1.02 }}` on interactive cards
- **Result changes:** wrap with `AnimatePresence` so values animate in when they update
- **Never** define animation values inline on a component — always use variants from `animations.ts`

---

## Interactive UI Rules

- **Live updates:** results update in real-time as user types or changes inputs — no submit button needed to see results
- **Empty states:** every interactive area must have a clear empty state telling the user what to do first
- **Skeletons not spinners:** if async state exists, use HeroUI `Skeleton` — never a spinner
- **Inline errors:** form validation errors show inline below the field using React Hook Form, never as toasts
- **Winner highlight:** use `text-primary` and `border-primary` to highlight the winning result

---

## Static Example Components

Each move has a static example component:
- Never markdown — always a proper React component
- Hardcoded example data — no props, no store connection
- Lives in `src/modules/moves/<move-name>/components/` named `<move-name>-example.tsx`
- Must visually match the interactive version of the same move

---

## AdSense

- Wrap all ad units in `src/components/composite/ad-unit.tsx` — never inline script tags in pages
- Landing page: one ad unit below the hero, before the move cards
- Move pages: one ad unit between the how-it-works section and the interactive area
- Never place ads inside the interactive area or result panels

---

## Do Not
- Do not hardcode color hex values — use Tailwind color classes from the config
- Do not use arbitrary Tailwind values (`w-[40px]`, `mt-[13px]`)
- Do not use CSS transitions on elements the user interacts with — use Framer Motion
- Do not use `secondary` color for buttons or primary actions
- Do not render move examples as markdown — always build proper static components
- Do not import HeroUI components directly in page files — use composite wrappers